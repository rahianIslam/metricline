// Server component — renders a JSON-LD <script> tag.
// Usage: <JsonLd data={organizationSchema()} />
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — no user-supplied data reaches this component.
      // All schema data is built from static content in lib/schema.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
