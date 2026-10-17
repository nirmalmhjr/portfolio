const LESS_THAN = /</g;

interface JsonLdProps {
  readonly data: Record<string, unknown>;
}

/**
 * Renders a <script type="application/ld+json"> tag. Safe for RSC.
 * Pass a plain object; it is serialized with basic XSS escaping.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline; "<" is escaped so the data can't close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(LESS_THAN, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
