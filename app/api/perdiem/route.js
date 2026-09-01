import { getCloudflareContext } from "@opennextjs/cloudflare";

// GSA Per Diem proxy for the Stipend Maximum Calculator.
// - Keeps GSA_API_KEY server-side (never shipped to the browser).
// - Caches each ZIP + fiscal year at the edge (GSA limits standard keys to
//   1,000 req/hr, and rates are static for a whole fiscal year).
// - Falls back to GSA's public DEMO_KEY when no key is configured.

function env() {
  try {
    return getCloudflareContext().env ?? process.env;
  } catch {
    return process.env;
  }
}

const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// GSA's ZIP endpoint returns an empty result for CONUS areas that fall under the
// STANDARD CONUS rate (no specific locality rate) rather than handing back the
// standard values. These are GSA's official standard CONUS lodging + M&IE per
// fiscal year. Add each new fiscal year here once GSA publishes it (Oct 1).
const STANDARD_CONUS = {
  2024: { lodging: 107, meals: 59 },
  2025: { lodging: 110, meals: 68 },
};

// ZIP ranges the GSA per diem (v2, CONUS) API does not properly cover: Alaska,
// Hawaii, and the US territories. We flag these instead of returning a
// misleading standard CONUS rate.
function isOconus(zip) {
  const p3 = zip.slice(0, 3);
  if (["006", "007", "008", "009", "967", "968", "969"].includes(p3)) return true; // PR/VI, HI, GU & Pacific
  if (Number(p3) >= 995 && Number(p3) <= 999) return true; // Alaska
  return false;
}

async function fetchYear(zip, year, key) {
  const url = `https://api.gsa.gov/travel/perdiem/v2/rates/zip/${zip}/year/${year}?api_key=${key}`;
  let res;
  try {
    res = await fetch(url, { cf: { cacheTtl: 86400, cacheEverything: true } });
  } catch {
    return { status: "unavailable" };
  }
  if (!res.ok) {
    // A 404 on a well-formed ZIP means GSA has no rate for that ZIP/year (a
    // future fiscal year that isn't published yet, or an unsupported area).
    return { status: res.status === 404 ? "no_data" : "unavailable" };
  }
  let json;
  try {
    json = await res.json();
  } catch {
    return { status: "unavailable" };
  }
  const top = json?.rates?.[0];
  const rate = top?.rate?.[0];
  if (!rate || !rate.months?.month?.length || !rate.meals) {
    // Empty result for a CONUS ZIP means it falls under the standard CONUS rate.
    // Use it only for a fiscal year we actually have (a published year); an
    // unpublished future year is left as no_data so it surfaces the right notice.
    const std = STANDARD_CONUS[Number(year)];
    if (std) {
      const months = {};
      for (let i = 1; i <= 12; i += 1) months[i] = std.lodging;
      return { status: "ok", meals: std.meals, months, location: "Standard CONUS rate" };
    }
    return { status: "no_data" };
  }

  const months = {};
  for (const m of rate.months.month) months[m.number] = m.value;
  const st = top?.state || rate.state || "";
  const city = rate.city || rate.county || "";
  const location = city ? `${city}, ${STATE_NAMES[st] || st}`.replace(/, $/, "") : STATE_NAMES[st] || st;

  return { status: "ok", meals: rate.meals, months, location };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const zip = (searchParams.get("zip") || "").trim();
  const yearsParam = (searchParams.get("years") || "").trim();

  if (!/^\d{5}$/.test(zip)) {
    return Response.json({ ok: false, code: "bad-zip" }, { status: 400 });
  }
  if (isOconus(zip)) {
    return Response.json({ ok: false, code: "unsupported" });
  }
  const years = [
    ...new Set(
      yearsParam
        .split(",")
        .map((y) => y.trim())
        .filter((y) => /^\d{4}$/.test(y))
    ),
  ];
  if (!years.length) {
    return Response.json({ ok: false, code: "bad-request" }, { status: 400 });
  }

  const key = env().GSA_API_KEY || "DEMO_KEY";
  const out = {};
  for (const y of years) out[y] = await fetchYear(zip, y, key);

  return Response.json({ ok: true, zip, years: out });
}
