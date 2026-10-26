import { Blob } from "node:buffer";
import { describe, expect, it } from "vitest";
import { extractPngTextMetadata } from "../../client/src/lib/png-text-metadata";

function makeChunk(type: string, data: Uint8Array): Uint8Array {
  const chunk = new Uint8Array(data.length + 12);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  chunk.set(new TextEncoder().encode(type), 4);
  chunk.set(data, 8);
  return chunk;
}

function makePng(...chunks: Uint8Array[]): Blob {
  const signature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  return new Blob([signature, ...chunks, makeChunk("IEND", new Uint8Array())]);
}

describe("extractPngTextMetadata", () => {
  it("reads uncompressed PNG text chunks", async () => {
    const text = new TextEncoder().encode(
      "parameters\0Steps: 25, Sampler: Euler a"
    );
    const metadata = await extractPngTextMetadata(
      makePng(makeChunk("tEXt", text))
    );

    expect(metadata).toEqual({
      "PNG Text.parameters": "Steps: 25, Sampler: Euler a",
    });
  });

  it("reads uncompressed international PNG text chunks", async () => {
    const text = new TextEncoder().encode(
      "prompt\0\0\0en-US\0\0A snowy landscape"
    );
    const metadata = await extractPngTextMetadata(
      makePng(makeChunk("iTXt", text))
    );

    expect(metadata).toEqual({
      "PNG Text.prompt": "A snowy landscape",
    });
  });

  it("returns no PNG text metadata for other file types", async () => {
    expect(await extractPngTextMetadata(new Blob(["not a PNG image"]))).toEqual(
      {}
    );
  });
});
