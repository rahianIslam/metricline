import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import CompanyStory from "@/components/sections/about/CompanyStory";
import MissionQuote from "@/components/sections/about/MissionQuote";
import Differentiators from "@/components/sections/about/Differentiators";
import CoreValues from "@/components/sections/about/CoreValues";
import HseSection from "@/components/sections/about/HseSection";
import LeadershipSection from "@/components/sections/about/LeadershipSection";
import { getTeamMembers } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About",
  description:
    "Metricline Projects was founded in 2022 to close the gap between engineering design and real-world execution. Learn about our story, mission, values, and team.",
};

export default async function AboutPage() {
  const members = await getTeamMembers();

  return (
    <>
      <AboutHero />
      <CompanyStory />
      <MissionQuote />
      <Differentiators />
      <CoreValues />
      <HseSection />
      <LeadershipSection members={members} />
    </>
  );
}
