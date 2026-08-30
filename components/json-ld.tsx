/**
 * Renders a <script type="application/ld+json"> tag. Safe for RSC.
 * Pass a plain object; it is serialized with basic XSS escaping.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
