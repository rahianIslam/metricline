// ============================================================
// METRICLINE — Sanity Schema: Open Role (Careers)
// ============================================================

const openRoleSchema = {
  name: "openRole",
  title: "Open Role",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Role Title",
      type: "string",
      description: "e.g. Senior Process Engineer",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
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
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Calgary, AB (Hybrid)",
      initialValue: "Calgary, AB",
    },
    {
      name: "description",
      title: "Role Description",
      type: "text",
      rows: 5,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "applyUrl",
      title: "Apply URL",
      type: "url",
      description: "Link to application form or email (mailto:)",
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Uncheck to hide the role without deleting it",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "division",
    },
  },
};

export default openRoleSchema;
