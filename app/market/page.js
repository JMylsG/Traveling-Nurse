import MarketClient from "./market-client";
import { getMarketData } from "@/lib/market";

export const metadata = {
  title: "Market · The Travel Nurse Guide",
  description:
    "Real staff RN wages from the BLS and tax-free stipend ceilings from the GSA, metro by metro. The federal baselines every travel package builds on.",
};

export default async function Market() {
  const data = await getMarketData();
  return <MarketClient data={data} />;
}
