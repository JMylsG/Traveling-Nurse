import { unstable_cache } from "next/cache";
import MarketClient from "./market-client";

export const metadata = { title: "Market · The Travel Nurse Guide" };

// Live staff-RN wage benchmarks from the U.S. Bureau of Labor Statistics
// (Occupational Employment and Wage Statistics, occupation 29-1141).
// BLS publishes a new release annually; "latest" always returns the newest,
// so the site tracks it with no code changes. Cached for a day to stay far
// under the keyless API's daily request limit.
const FIPS = {
  Arizona: "04", California: "06", Colorado: "08", Florida: "12", Georgia: "13",
  Illinois: "17", Massachusetts: "25", Michigan: "26", Nevada: "32", "New Mexico": "35",
  "New York": "36", "North Carolina": "37", Ohio: "39", Oregon: "41", Pennsylvania: "42",
  Tennessee: "47", Texas: "48", Virginia: "51", Washington: "53",
};
// series = OEU + area + all-industries + occupation 291141 (RN) + datatype 03 (mean hourly)
const NATIONAL_ID = "OEUN000000000000029114103";
const stateId = (fips) => "OEUS" + fips + "0000000000029114103";

const getBls = unstable_cache(
  async () => {
    try {
      const ids = [NATIONAL_ID, ...Object.values(FIPS).map(stateId)];
      const res = await fetch("https://api.bls.gov/publicAPI/v1/timeseries/data/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seriesid: ids, latest: "true" }),
        cache: "no-store",
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.status !== "REQUEST_SUCCEEDED") return null;
      const byId = {};
      let year = "";
      for (const s of json.Results.series) {
        if (s.data?.[0]?.value) { byId[s.seriesID] = s.data[0].value; year = s.data[0].year; }
      }
      if (!byId[NATIONAL_ID]) return null;
      const states = {};
      for (const [name, fips] of Object.entries(FIPS)) {
        if (byId[stateId(fips)]) states[name] = byId[stateId(fips)];
      }
      return { year, national: byId[NATIONAL_ID], states };
    } catch {
      return null;
    }
  },
  ["bls-rn-wages"],
  { revalidate: 86400 }
);

export default async function Market() {
  const bls = await getBls();
  return <MarketClient bls={bls} />;
}
