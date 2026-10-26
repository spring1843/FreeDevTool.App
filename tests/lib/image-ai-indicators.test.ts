import { describe, expect, it } from "vitest";
import { findImageAiIndicators } from "../../client/src/lib/image-ai-indicators";

describe("findImageAiIndicators", () => {
  it("identifies known image generator names in metadata", () => {
    expect(
      findImageAiIndicators({
        Software: "Stable Diffusion WebUI",
        XMP: { CreatorTool: "Adobe Firefly" },
      })
    ).toEqual([
      { field: "Software", evidence: "Stable Diffusion" },
      { field: "XMP.CreatorTool", evidence: "Adobe Firefly" },
    ]);
  });

  it("identifies generation prompts and diffusion parameters", () => {
    expect(
      findImageAiIndicators({
        parameters: "Steps: 30, Sampler: Euler a, CFG scale: 7",
        prompt: "A scenic landscape",
      })
    ).toEqual([
      {
        field: "parameters",
        evidence: "diffusion-style generation parameters",
      },
      { field: "prompt", evidence: "generation prompt/parameters field" },
    ]);
  });

  it("does not mistake ordinary camera metadata for AI evidence", () => {
    expect(
      findImageAiIndicators({
        Make: "Canon",
        Model: "EOS R5",
        Software: "Adobe Photoshop 25.0",
      })
    ).toEqual([]);
  });
});
