import type { Metadata } from "next";
import RentalsHero from "@/components/sections/rentals/RentalsHero";
import EquipmentCatalog from "@/components/sections/rentals/EquipmentCatalog";
import QuoteForm from "@/components/sections/rentals/QuoteForm";
import ServiceArea from "@/components/sections/rentals/ServiceArea";

export const metadata: Metadata = {
  title: "Rentals | Metricline Group",
  description:
    "Metricline Rentals provides industrial equipment rental across Alberta, Saskatchewan, and BC — with operator support and on-site delivery for construction, energy, and industrial projects.",
  openGraph: {
    title: "Metricline Rentals | Industrial Equipment Western Canada",
    description:
      "Industrial equipment rental with operator support across Alberta, Saskatchewan, and BC.",
  },
};

export default function RentalsPage() {
  return (
    <div style={{ backgroundColor: "#0F0F0F" }}>
      <RentalsHero />
      <EquipmentCatalog />
      <QuoteForm />
      <ServiceArea />
    </div>
  );
}
