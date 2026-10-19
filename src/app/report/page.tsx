import type { Metadata } from "next";
import ReportIncident from "@/components/sections/ReportIncident";

export const metadata: Metadata = {
  title: "Report a Cyber Incident - iRES",
  description:
    "Report a cyber incident to iRES. An incident handler will call you. For critical incidents, call the 24/7 hotline first.",
  openGraph: {
    title: "Report a Cyber Incident - iRES",
    description:
      "Tell iRES what is happening. For incidents stopping operations, call the hotline first.",
    url: "https://iresorg.com/report",
  },
};

export default function ReportPage() {
  return <ReportIncident />;
}
