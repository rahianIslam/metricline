import type { Metadata } from "next";
import OperationsHero from "@/components/sections/operations/OperationsHero";
import OperationsServices from "@/components/sections/operations/OperationsServices";
import OperationsCaseStudies from "@/components/sections/operations/OperationsCaseStudies";
import HseqSection from "@/components/sections/operations/HseqSection";

export const metadata: Metadata = {
  title: "Operations | Metricline Group",
  description:
    "Metricline Operations delivers reliable facility operations support, maintenance management, and HSEQ programs for industrial facilities across Alberta, Saskatchewan, and BC.",
  openGraph: {
    title: "Metricline Operations | Facility Operations & Maintenance",
    description:
      "Reliable operations support and HSEQ programs for industrial facilities in Western Canada.",
  },
};

export default function OperationsPage() {
  return (
    <div style={{ backgroundColor: "#091712" }}>
      <OperationsHero />
      <OperationsServices />
      <OperationsCaseStudies />
      <HseqSection />
    </div>
  );
}
