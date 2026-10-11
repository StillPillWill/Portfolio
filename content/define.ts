import type { ProjectInput } from "./types.ts";

/** Identity helper: gives full type-checking (and autocomplete) to a project file. */
export function defineProject(p: ProjectInput): ProjectInput {
  return p;
}
