// ============================================================
// METRICLINE — Sanity Studio Configuration
//
// Env vars required (add to .env.local):
//   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
//   NEXT_PUBLIC_SANITY_DATASET=production
//
// Studio is embedded at /studio in the Next.js app.
// Access it at http://localhost:3000/studio
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "metricline",
  title: "Metricline Group CMS",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Case Studies")
              .child(S.documentTypeList("caseStudy").title("Case Studies")),
            S.listItem()
              .title("Team Members")
              .child(S.documentTypeList("teamMember").title("Team Members")),
            S.listItem()
              .title("Equipment Catalog")
              .child(S.documentTypeList("equipment").title("Equipment")),
            S.listItem()
              .title("Open Roles")
              .child(S.documentTypeList("openRole").title("Open Roles")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
