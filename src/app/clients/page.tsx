import type { Metadata } from "next";
import ClientsHeader from "@/components/sections/clients/ClientsHeader";
import ClientLogosGrid from "@/components/sections/clients/ClientLogosGrid";
import IndustriesGrid from "@/components/sections/clients/IndustriesGrid";

export const metadata: Metadata = {
  title: "Clients | Metricline Group",
  description:
    "Metricline Group serves operators, owners, and developers across eight industrial sectors in Alberta, Saskatchewan, and BC — oil & gas, renewable energy, petrochemical, industrial, water & wastewater, rail & bulk handling, and more.",
  openGraph: {
    title: "Clients | Metricline Group of Industries",
    description:
      "The companies that trust Metricline across oil & gas, energy transition, petrochemical, and industrial sectors.",
  },
};

export default function ClientsPage() {
  return (
    <div className="bg-group-bg min-h-screen">
      <ClientsHeader />
      <ClientLogosGrid />
      <IndustriesGrid />
    </div>
  );
}
