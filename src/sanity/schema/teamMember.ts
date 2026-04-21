// ============================================================
// METRICLINE — Sanity Schema: Team Member
// ============================================================

const teamMemberSchema = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      description: "Include credentials, e.g. Stewart Neuman, P.Eng.",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "title",
      title: "Job Title",
      type: "string",
      description: "e.g. Chief Executive Officer",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 6,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "photo",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. CEO = 1.",
      initialValue: 10,
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Uncheck to hide without deleting",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "photo",
    },
  },
};

export default teamMemberSchema;
