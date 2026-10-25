import { describe, expect, it } from "vitest";
import { findC2paDigitalSourceTypes } from "../../client/src/lib/c2pa-metadata";

describe("findC2paDigitalSourceTypes", () => {
  it("reads source types from nested C2PA action assertions", () => {
    expect(
      findC2paDigitalSourceTypes({
        manifests: {
          active: {
            assertions: [
              {
                label: "c2pa.actions",
                data: {
                  actions: [
                    {
                      digitalSourceType:
                        "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia",
                    },
                  ],
                },
              },
            ],
          },
        },
      })
    ).toEqual([
      "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia",
    ]);
  });

  it("returns no source types when the manifest has no source-type assertion", () => {
    expect(
      findC2paDigitalSourceTypes({
        manifests: { active: { assertions: [] } },
      })
    ).toEqual([]);
  });
});
