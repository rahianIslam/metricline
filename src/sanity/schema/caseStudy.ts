// ============================================================
// METRICLINE — Sanity Schema: Case Study
//
// Use this file when setting up the Sanity Studio.
// Install the Sanity Studio separately:
//   npm create sanity@latest
// Then import these schemas in your sanity.config.ts
// ============================================================

const caseStudySchema = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Fort Saskatchewan, AB",
    },
    {
      name: "year",
      title: "Year / Date Range",
      type: "string",
      description: "e.g. 2025–2026",
    },
    {
      name: "scopeType",
      title: "Scope of Work",
      type: "string",
      description: "e.g. Detailed Engineering & Procurement, Construction Support",
    },
    {
      name: "sector",
      title: "Sector",
      type: "string",
      description: "e.g. Oil & Gas / Sulphur Processing",
    },
    {
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: [
          { title: "Metricline Projects", value: "projects" },
          { title: "Metricline Rentals", value: "rentals" },
          { title: "Metricline Operations", value: "operations" },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "highlights",
      title: "Project Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Key outcomes and achievements — 3 to 5 bullet points",
    },
    {
      name: "photos",
      title: "Project Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "projectValue",
      title: "Project Value",
      type: "string",
      description: 'e.g. "Confidential" or "$2.4M" when permitted',
    },
    {
      name: "scopeDuration",
      title: "Scope Duration",
      type: "string",
      description: 'e.g. "14 months" or "Ongoing"',
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage and portfolio hero",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "photos.0",
    },
  },
};

export default caseStudySchema;
