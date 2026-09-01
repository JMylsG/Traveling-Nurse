import { redirect } from "next/navigation";

// The old Market page became the GSA Stipend Maximum Calculator. Keep this path
// alive by redirecting anyone who lands on /market to the new tool.
export default function Market() {
  redirect("/calculator");
}
