import type { Metadata } from "next";
import PortfolioHeader from "@/components/sections/portfolio/PortfolioHeader";
import PortfolioGrid from "@/components/sections/portfolio/PortfolioGrid";
import { getCaseStudies } from "@/lib/sanity";
import JsonLd from "@/components/ui/JsonLd";
import { portfolioSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio | Metricline Group",
  description:
    "Explore Metricline Group's project portfolio across engineering, construction, and operations. Case studies spanning oil & gas, energy transition, petrochemical, and industrial sectors in Alberta, Saskatchewan, and BC.",
  openGraph: {
    title: "Portfolio | Metricline Group of Industries",
    description:
      "Case studies across all Metricline divisions — engineering, rentals, and operations.",
  },
};

export default async function PortfolioPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="bg-group-bg min-h-screen">
      <JsonLd data={portfolioSchema(caseStudies)} />
      <PortfolioHeader />
      <PortfolioGrid caseStudies={caseStudies} />
    </div>
  );
}
