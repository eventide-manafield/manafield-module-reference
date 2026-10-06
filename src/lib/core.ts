import type { ModuleDescriptor } from "../types/manafield";

export async function fetchModules(): Promise<ModuleDescriptor[]> {
  const response = await fetch("/api/core/modules", {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Core returned HTTP ${response.status}`);
  }

  return response.json() as Promise<ModuleDescriptor[]>;
}
