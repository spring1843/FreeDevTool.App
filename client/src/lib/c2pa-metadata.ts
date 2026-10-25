import c2paWasmUrl from "@contentauth/c2pa-web/resources/c2pa.wasm?url";
import type { C2pa, ManifestStore } from "@contentauth/c2pa-web";

let c2paPromise: Promise<C2pa> | undefined;

async function getC2pa() {
  if (!c2paPromise) {
    c2paPromise = import("@contentauth/c2pa-web")
      .then(({ createC2pa }) => createC2pa({ wasmSrc: c2paWasmUrl }))
      .catch(error => {
        c2paPromise = undefined;
        throw error;
      });
  }
  return c2paPromise;
}

export async function readC2paManifest(
  file: File
): Promise<ManifestStore | null> {
  const [{ Context, Reader }, c2pa] = await Promise.all([
    import("@contentauth/c2pa-web"),
    getC2pa(),
  ]);
  const reader = await Reader.fromBlob(
    c2pa,
    file.type || undefined,
    file,
    new Context({
      verify: {
        remoteManifestFetch: false,
        ocspFetch: false,
      },
    })
  );

  if (!reader) return null;
  try {
    return await reader.manifestStore();
  } finally {
    await reader.free();
  }
}

export function findC2paDigitalSourceTypes(value: unknown): string[] {
  const sourceTypes = new Set<string>();
  const visited = new WeakSet<object>();

  const visit = (current: unknown): void => {
    if (!current || typeof current !== "object" || visited.has(current)) return;
    visited.add(current);

    if (Array.isArray(current)) {
      current.forEach(visit);
      return;
    }

    for (const [key, nestedValue] of Object.entries(current)) {
      if (
        /^(?:digital_source_type|digitalSourceType)$/i.test(key) &&
        typeof nestedValue === "string"
      ) {
        sourceTypes.add(nestedValue);
      } else {
        visit(nestedValue);
      }
    }
  };

  visit(value);
  return Array.from(sourceTypes);
}
