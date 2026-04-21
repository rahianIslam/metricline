// ============================================================
// METRICLINE — Sanity Schema Index
//
// Import this in your sanity.config.ts:
//   import { schemaTypes } from "@/sanity/schema"
//
// Example sanity.config.ts:
//   import { defineConfig } from "sanity"
//   import { schemaTypes } from "./src/sanity/schema"
//   export default defineConfig({
//     projectId: "YOUR_PROJECT_ID",
//     dataset: "production",
//     schema: { types: schemaTypes },
//   })
// ============================================================

import caseStudySchema from "./caseStudy";
import teamMemberSchema from "./teamMember";
import equipmentSchema from "./equipment";
import openRoleSchema from "./openRole";

export const schemaTypes = [
  caseStudySchema,
  teamMemberSchema,
  equipmentSchema,
  openRoleSchema,
];

export { caseStudySchema, teamMemberSchema, equipmentSchema, openRoleSchema };
