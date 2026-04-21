import type { Metadata } from "next";
import CareersHero from "@/components/sections/careers/CareersHero";
import OpenRoles from "@/components/sections/careers/OpenRoles";
import CoreValues from "@/components/sections/about/CoreValues";

export const metadata: Metadata = {
  title: "Careers | Metricline Group",
  description:
    "Join the Metricline team. We're engineers, builders, and problem solvers delivering industrial projects across Alberta, Saskatchewan, and BC. See open roles or send your resume.",
  openGraph: {
    title: "Careers | Metricline Group of Industries",
    description:
      "Build something that lasts. Join Metricline Group across engineering, construction, and operations.",
  },
};

export default function CareersPage() {
  return (
    <div className="bg-group-bg min-h-screen">
      <CareersHero />
      <OpenRoles />
      <CoreValues />
    </div>
  );
}
