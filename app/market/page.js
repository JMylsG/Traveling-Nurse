import { unstable_cache } from "next/cache";
import MarketClient from "./market-client";

export const metadata = { title: "Market · The Travel Nurse Guide" };

// Real market data, two federal sources, both refreshed automatically:
//  - BLS OEWS (occupation 29-1141, Registered Nurses): staff mean hourly wage
//    and employment, national + state + metro. New release annually.
//  - GSA per diem: the legal ceiling for tax-free lodging + M&IE stipends,
//    per locality, new rates every October 1.
// Optional env keys raise rate limits (see .dev.vars.example): BLS_API_KEY
// (v2 API, 500 req/day) and GSA_API_KEY (api.data.gov; DEMO_KEY fallback).

const FIPS = {
  Arizona: "04", California: "06", Colorado: "08", Florida: "12", Georgia: "13",
  Illinois: "17", Massachusetts: "25", Michigan: "26", Nevada: "32", "New Mexico": "35",
  "New York": "36", "North Carolina": "37", Ohio: "39", Oregon: "41", Pennsylvania: "42",
  Tennessee: "47", Texas: "48", Virginia: "51", Washington: "53",
};
const ABBR = {
  Arizona: "AZ", California: "CA", Colorado: "CO", Florida: "FL", Georgia: "GA",
  Illinois: "IL", Massachusetts: "MA", Michigan: "MI", Nevada: "NV", "New Mexico": "NM",
  "New York": "NY", "North Carolina": "NC", Ohio: "OH", Oregon: "OR", Pennsylvania: "PA",
  Tennessee: "TN", Texas: "TX", Virginia: "VA", Washington: "WA",
};

// CBSA codes for the metros on the page (BLS OEWS area codes)
const METROS = [
  { city: "Atlanta", state: "Georgia", cbsa: "12060" },
  { city: "Savannah", state: "Georgia", cbsa: "42340" },
  { city: "Augusta", state: "Georgia", cbsa: "12260" },
  { city: "Macon", state: "Georgia", cbsa: "31420" },
  { city: "Columbus", state: "Georgia", cbsa: "17980" },
  { city: "Houston", state: "Texas", cbsa: "26420" },
  { city: "Dallas", state: "Texas", cbsa: "19100" },
  { city: "Fort Worth", state: "Texas", cbsa: "23104" },
  { city: "San Antonio", state: "Texas", cbsa: "41700" },
  { city: "Austin", state: "Texas", cbsa: "12420" },
  { city: "El Paso", state: "Texas", cbsa: "21340" },
  { city: "Tampa", state: "Florida", cbsa: "45300" },
  { city: "Orlando", state: "Florida", cbsa: "36740" },
  { city: "Miami", state: "Florida", cbsa: "33100" },
  { city: "Jacksonville", state: "Florida", cbsa: "27260" },
  { city: "Sacramento", state: "California", cbsa: "40900" },
  { city: "Fresno", state: "California", cbsa: "23420" },
  { city: "Bakersfield", state: "California", cbsa: "12540" },
  { city: "San Diego", state: "California", cbsa: "41740" },
  { city: "Riverside", state: "California", cbsa: "40140" },
  { city: "Stockton", state: "California", cbsa: "44700" },
  { city: "Los Angeles", state: "California", cbsa: "31080" },
  { city: "Albany", state: "New York", cbsa: "10580" },
  { city: "Buffalo", state: "New York", cbsa: "15380" },
  { city: "Rochester", state: "New York", cbsa: "40380" },
  { city: "New York", state: "New York", cbsa: "35620" },
  { city: "Phoenix", state: "Arizona", cbsa: "38060" },
  { city: "Tucson", state: "Arizona", cbsa: "46060" },
  { city: "Spokane", state: "Washington", cbsa: "44060" },
  { city: "Seattle", state: "Washington", cbsa: "42660" },
  { city: "Charlotte", state: "North Carolina", cbsa: "16740" },
  { city: "Raleigh", state: "North Carolina", cbsa: "39580" },
  { city: "Nashville", state: "Tennessee", cbsa: "34980" },
  { city: "Memphis", state: "Tennessee", cbsa: "32820" },
  { city: "Knoxville", state: "Tennessee", cbsa: "28940" },
  { city: "Denver", state: "Colorado", cbsa: "19740" },
  { city: "Pittsburgh", state: "Pennsylvania", cbsa: "38300" },
  { city: "Philadelphia", state: "Pennsylvania", cbsa: "37980" },
  { city: "Boston", state: "Massachusetts", cbsa: "14460" },
  { city: "Las Vegas", state: "Nevada", cbsa: "29820" },
  { city: "Chicago", state: "Illinois", cbsa: "16980" },
  { city: "Albuquerque", state: "New Mexico", cbsa: "10740" },
  { city: "Cleveland", state: "Ohio", cbsa: "17460" },
  { city: "Portland", state: "Oregon", cbsa: "38900" },
  { city: "Richmond", state: "Virginia", cbsa: "40060" },
  { city: "Detroit", state: "Michigan", cbsa: "19820" },
];

const NATIONAL_ID = "OEUN000000000000029114103";
const stateId = (fips) => "OEUS" + fips + "0000000000029114103";
const metroId = (cbsa, dt) => `OEUM00${cbsa}000000291141${dt}`; // dt: 03 mean hourly, 01 employment

async function blsFetch(ids) {
  const key = process.env.BLS_API_KEY;
  const url = key
    ? "https://api.bls.gov/publicAPI/v2/timeseries/data/"
    : "https://api.bls.gov/publicAPI/v1/timeseries/data/";
  const chunkSize = key ? 50 : 25;
  const out = {};
  let year = "";
  for (let i = 0; i < ids.length; i += chunkSize) {
    const body = { seriesid: ids.slice(i, i + chunkSize), latest: "true" };
    if (key) body.registrationkey = key;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) continue;
    const json = await res.json();
    if (json.status !== "REQUEST_SUCCEEDED") continue;
    for (const s of json.Results.series) {
      if (s.data?.[0]?.value) { out[s.seriesID] = s.data[0].value; year = s.data[0].year; }
    }
  }
  return { out, year };
}

// GSA fiscal year: rates roll every October 1
function gsaFy() {
  const now = new Date();
  return now.getUTCMonth() >= 9 ? now.getUTCFullYear() + 1 : now.getUTCFullYear();
}

async function gsaCity(city, stateAbbr, fy) {
  try {
    const key = process.env.GSA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.gsa.gov/travel/perdiem/v2/rates/city/${encodeURIComponent(city)}/state/${stateAbbr}/year/${fy}?api_key=${key}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const rate = json?.rates?.[0]?.rate?.[0];
    if (!rate) return null;
    const month = new Date().getUTCMonth() + 1;
    const lodging = rate.months?.month?.find((m) => m.number === month)?.value;
    const meals = rate.meals;
    if (!lodging || !meals) return null;
    return { lodging, meals, weekly: 7 * (lodging + meals) };
  } catch {
    return null;
  }
}

async function fetchMarket() {
  try {
    const wageIds = METROS.map((m) => metroId(m.cbsa, "03"));
    const empIds = METROS.map((m) => metroId(m.cbsa, "01"));
    const { out: bls, year } = await blsFetch([NATIONAL_ID, ...Object.values(FIPS).map(stateId), ...wageIds, ...empIds]);
    if (!bls[NATIONAL_ID]) return null;

    const states = {};
    for (const [name, fips] of Object.entries(FIPS)) {
      if (bls[stateId(fips)]) states[name] = bls[stateId(fips)];
    }

    const fy = gsaFy();
    // limited concurrency keeps GSA happy on the keyless DEMO_KEY
    const gsa = [];
    for (let i = 0; i < METROS.length; i += 6) {
      gsa.push(...(await Promise.all(
        METROS.slice(i, i + 6).map((m) => gsaCity(m.city, ABBR[m.state], fy))
      )));
    }

    const rows = METROS.map((m, i) => {
      const wage = bls[metroId(m.cbsa, "03")];
      return {
        city: m.city,
        state: m.state,
        wage: wage || states[m.state] || null,
        wageScope: wage ? "metro" : "state",
        emp: bls[metroId(m.cbsa, "01")] || null,
        gsa: gsa[i],
      };
    }).filter((r) => r.wage);

    return { year, fy, national: bls[NATIONAL_ID], states, rows };
  } catch {
    return null;
  }
}

const getMarket = unstable_cache(fetchMarket, ["market-data-real-v2"], { revalidate: 86400 });

export default async function Market() {
  // Serve the cached feed when it's good. If the cache is holding an empty
  // result (a transient BLS/GSA hiccup during a refresh), fetch live so the
  // page self-heals on the next visit instead of showing the fallback all day.
  let data = await getMarket();
  if (!data) data = await fetchMarket();
  return <MarketClient data={data} />;
}
