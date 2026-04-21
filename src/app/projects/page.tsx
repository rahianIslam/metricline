import type { Metadata } from "next";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import ServicesList from "@/components/sections/projects/ServicesList";
import CaseStudies from "@/components/sections/projects/CaseStudies";
import IndustriesTags from "@/components/sections/projects/IndustriesTags";
import ProjectsContactCta from "@/components/sections/projects/ProjectsContactCta";
import { getCaseStudies } from "@/lib/sanity";
import JsonLd from "@/components/ui/JsonLd";
import { projectsServiceSchema } from "@/lib/schema";
import { PROJECTS_SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-scope EPCM from concept through commissioning. Metricline Projects delivers integrated engineering, procurement, and construction services across the energy transition, oil & gas, petrochemical, and industrial sectors in Alberta, Saskatchewan, and BC.",
  openGraph: {
    title: "Metricline Projects | EPCM Engineering & Construction",
    description:
      "Full-discipline EPCM for the energy transition, oil & gas, petrochemical, and industrial sectors.",
  },
};

export default async function ProjectsPage() {
  const allStudies = await getCaseStudies();
  const caseStudies = allStudies.filter((s) => s.division === "projects");
  const serviceNames = PROJECTS_SERVICES.map((s) => s.name);

  return (
    <>
      <JsonLd data={projectsServiceSchema(serviceNames)} />
      <ProjectsHero />
      <ServicesList />
      <CaseStudies caseStudies={caseStudies} />
      <IndustriesTags />
      <ProjectsContactCta />
    </>
  );
}
