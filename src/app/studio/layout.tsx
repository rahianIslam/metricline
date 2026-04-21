/**
 * Bare layout for the embedded Sanity Studio.
 * Omits Nav and Footer so the studio renders full-screen.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
