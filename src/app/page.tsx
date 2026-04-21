// Home page — Phase 2 complete, Phase 8: Sanity-connected.
// Sections: Hero → Stats → Divisions → Featured Projects → Client Logos → CTA

import Hero from "@/components/sections/home/Hero";
import StatsBar from "@/components/sections/home/StatsBar";
import CapabilitiesStrip from "@/components/sections/home/CapabilitiesStrip";
import DivisionsOverview from "@/components/sections/home/DivisionsOverview";
import ProcessSteps from "@/components/sections/home/ProcessSteps";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import ClientLogos from "@/components/sections/home/ClientLogos";
import CtaBanner from "@/components/sections/home/CtaBanner";
import SectorsCallout from "@/components/sections/home/SectorsCallout";
import { getCaseStudies } from "@/lib/sanity";

export default async function Home() {
  const caseStudies = await getCaseStudies();
  // Homepage shows only featured studies; falls back to all if none are marked featured
  const featured = caseStudies.filter((s) => s.featured);
  const displayed = featured.length > 0 ? featured : caseStudies;

  return (
    <>
      <Hero />
      <StatsBar />
      <CapabilitiesStrip />
      <SectorsCallout />
      <DivisionsOverview />
      <ProcessSteps />
      <FeaturedProjects caseStudies={displayed} />
      <ClientLogos />
      <CtaBanner />
    </>
  );
}
