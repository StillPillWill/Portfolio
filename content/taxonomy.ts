// Project categories. Add one here and it becomes a valid `categories` value
// everywhere (type-checked) and a filter chip on /projects.
export const CATEGORIES = [
  { id: "research", label: "Research" },
  { id: "ml", label: "Machine learning" },
  { id: "systems", label: "Systems & embedded" },
  { id: "robotics", label: "Robotics" },
  { id: "fabrication", label: "Fabrication" },
  { id: "leadership", label: "Leadership" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const CATEGORY_LABEL: Record<CategoryId, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label]),
) as Record<CategoryId, string>;
