import type { Metadata } from "next";
import DivisionPanels from "@/components/sections/divisions/DivisionPanels";

export const metadata: Metadata = {
  title: "Divisions | Metricline Group",
  description:
    "Metricline Group operates three purpose-built divisions: Projects (EPCM engineering & construction), Rentals (industrial equipment), and Operations (facility operations & maintenance). Serving Alberta, Saskatchewan, and BC.",
  openGraph: {
    title: "Our Divisions | Metricline Group of Industries",
    description:
      "Engineering, equipment, and operations — each division purpose-built for its market.",
  },
};

export default function DivisionsPage() {
  return (
    <div className="bg-group-bg min-h-screen">
      <DivisionPanels />
    </div>
  );
}
