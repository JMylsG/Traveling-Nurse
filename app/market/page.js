import MarketClient from "./market-client";
import { getMarketData } from "@/lib/market";

export const metadata = { title: "Market · The Travel Nurse Guide" };

export default async function Market() {
  const data = await getMarketData();
  return <MarketClient data={data} />;
}
