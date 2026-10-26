interface ImageAiIndicator {
  field: string;
  evidence: string;
}

const generatorPattern =
  /\b(?:stable diffusion|midjourney|dall[\s-]?e|adobe firefly|firefly image|generative fill|generative expand|comfyui|automatic1111|a1111|invokeai|fooocus|novelai|stability ai|dreamstudio|black forest labs|flux(?:\s*[-.:]\s*)?(?:dev|schnell|pro|1(?:\.\d+)?|redux)|ideogram|leonardo\.ai|imagen(?:\s*[\d.]*)|gemini image|canva magic media|playground ai|nightcafe|runway(?:\s*ml)?|generated with ai|ai[- ]generated|trainedalgorithmicmedia|compositewithtrainedalgorithmicmedia)\b/i;

const promptFieldPattern =
  /^(?:prompt|positive prompt|negative prompt|generation prompt|generation parameters|parameters)$/i;

const diffusionParametersPattern = /\bsteps\s*:\s*\d+.*\bsampler\s*:/i;

export function findImageAiIndicators(
  metadata: Record<string, unknown>
): ImageAiIndicator[] {
  const indicators: ImageAiIndicator[] = [];
  const visited = new WeakSet<object>();

  const visit = (value: unknown, field: string): void => {
    if (typeof value === "string") {
      const generatorMatch = value.match(generatorPattern);
      if (generatorMatch) {
        indicators.push({ field, evidence: generatorMatch[0] });
      } else if (value.trim()) {
        const fieldName = field.split(".").at(-1) ?? "";
        const hasPromptField = promptFieldPattern.test(fieldName);
        const hasDiffusionParameters = diffusionParametersPattern.test(value);
        if (!hasPromptField && !hasDiffusionParameters) return;

        indicators.push({
          field,
          evidence: hasDiffusionParameters
            ? "diffusion-style generation parameters"
            : "generation prompt/parameters field",
        });
      }
      return;
    }

    if (!value || typeof value !== "object" || visited.has(value)) return;
    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${field}[${index}]`));
      return;
    }

    Object.entries(value).forEach(([key, nestedValue]) =>
      visit(nestedValue, field ? `${field}.${key}` : key)
    );
  };

  Object.entries(metadata).forEach(([key, value]) => visit(value, key));
  return indicators;
}
