export interface NavItem {
  /** Links to another site (the notes): opens with an ↗ and never lights up. */
  readonly external?: boolean;
  readonly href: string;
  readonly title: string;
}
