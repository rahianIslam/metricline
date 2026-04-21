"use client";

import dynamic from "next/dynamic";

// Studio has browser-only deps — suppress SSR entirely.
const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#101112",
        color: "rgba(255,255,255,0.4)",
        fontFamily: "monospace",
        fontSize: "12px",
        letterSpacing: "0.12em",
      }}
    >
      LOADING STUDIO…
    </div>
  ),
});

export default function StudioLoader() {
  return <StudioClient />;
}
