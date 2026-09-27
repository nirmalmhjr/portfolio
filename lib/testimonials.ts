/**
 * Quotes from colleagues, managers or clients. The Testimonials section on
 * the homepage stays hidden until this list has at least one entry.
 *
 * Example:
 * { quote: "Nirmal shipped our landing page ahead of schedule.", name: "Jane Doe", role: "Product Manager", company: "Plex Bit" }
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export const testimonials: Testimonial[] = [];
