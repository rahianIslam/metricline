// ============================================================
// METRICLINE — Sanity Schema: Equipment (Rentals division)
// ============================================================

const equipmentSchema = {
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Equipment Name",
      type: "string",
      description: "e.g. Mobile Crane — 50T",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Lifting & Rigging", value: "Lifting & Rigging" },
          { title: "Material Handling", value: "Material Handling" },
          { title: "Power Generation", value: "Power Generation" },
          { title: "Compressors", value: "Compressors" },
          { title: "Site Support", value: "Site Support" },
          // TODO_CONTENT: confirm final category list with client
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "brand",
      title: "Brand / Manufacturer",
      type: "string",
    },
    {
      name: "model",
      title: "Model",
      type: "string",
    },
    {
      name: "spec",
      title: "Key Specification",
      type: "string",
      description: "One-line summary, e.g. 50T capacity · hydraulic boom",
    },
    {
      name: "specifications",
      title: "Detailed Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Specification", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: {
            select: { title: "key", subtitle: "value" },
          },
        },
      ],
    },
    {
      name: "photos",
      title: "Equipment Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
    },
    {
      name: "available",
      title: "Available for Rental",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show prominently in catalog",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Category A–Z",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "photos.0",
    },
  },
};

export default equipmentSchema;
