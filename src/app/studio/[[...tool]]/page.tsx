/**
 * Embedded Sanity Studio — accessible at /studio
 *
 * Studio is loaded through a client-side wrapper to avoid
 * server render issues with React 19 / Next.js 16.
 */
import StudioLoader from "./StudioLoader";

export const metadata = {
  title: "Metricline CMS",
  description: "Metricline Group content management studio",
};

export default function StudioPage() {
  return <StudioLoader />;
}
