const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];

function readNullTerminatedText(
  bytes: Uint8Array,
  start: number,
  decoder: TextDecoder
): { text: string; next: number } | null {
  const end = bytes.indexOf(0, start);
  if (end < 0) return null;
  return { text: decoder.decode(bytes.subarray(start, end)), next: end + 1 };
}

async function inflateText(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("This browser cannot decompress embedded PNG text.");
  }

  const stream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream("deflate"));
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalLength += value.length;
    if (totalLength > 4 * 1024 * 1024) {
      await reader.cancel();
      throw new Error("Embedded PNG text is larger than 4 MB.");
    }
    chunks.push(value);
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

async function readTextChunk(
  type: string,
  bytes: Uint8Array
): Promise<{ keyword: string; text: string } | null> {
  const keyword = readNullTerminatedText(bytes, 0, new TextDecoder("latin1"));
  if (!keyword || !keyword.text) return null;

  if (type === "tEXt") {
    return {
      keyword: keyword.text,
      text: new TextDecoder("latin1").decode(bytes.subarray(keyword.next)),
    };
  }

  if (type === "zTXt") {
    if (bytes[keyword.next] !== 0) return null;
    const text = await inflateText(bytes.subarray(keyword.next + 1));
    return {
      keyword: keyword.text,
      text: new TextDecoder("latin1").decode(text),
    };
  }

  const compressionFlag = bytes[keyword.next];
  const compressionMethod = bytes[keyword.next + 1];
  if (compressionFlag !== 0 && compressionFlag !== 1) return null;
  if (compressionFlag === 1 && compressionMethod !== 0) return null;

  const language = readNullTerminatedText(
    bytes,
    keyword.next + 2,
    new TextDecoder("ascii")
  );
  if (!language) return null;
  const translatedKeyword = readNullTerminatedText(
    bytes,
    language.next,
    new TextDecoder("utf-8")
  );
  if (!translatedKeyword) return null;

  const textBytes = bytes.subarray(translatedKeyword.next);
  const decodedText =
    compressionFlag === 1 ? await inflateText(textBytes) : textBytes;

  return {
    keyword: keyword.text,
    text: new TextDecoder("utf-8").decode(decodedText),
  };
}

export async function extractPngTextMetadata(
  file: Blob
): Promise<Record<string, string>> {
  const signature = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (!pngSignature.every((byte, index) => signature[index] === byte)) {
    return {};
  }

  const metadata: Record<string, string> = {};
  let offset = 8;

  while (offset + 12 <= file.size) {
    const header = new DataView(
      await file.slice(offset, offset + 8).arrayBuffer()
    );
    const chunkLength = header.getUint32(0);
    const typeBytes = new Uint8Array(header.buffer, header.byteOffset + 4, 4);
    const type = new TextDecoder("ascii").decode(typeBytes);
    const dataStart = offset + 8;
    const nextChunk = dataStart + chunkLength + 4;

    if (nextChunk > file.size) {
      throw new Error("The PNG file contains an incomplete chunk.");
    }

    if (type === "tEXt" || type === "zTXt" || type === "iTXt") {
      const data = new Uint8Array(
        await file.slice(dataStart, dataStart + chunkLength).arrayBuffer()
      );
      const textChunk = await readTextChunk(type, data);
      if (textChunk) {
        const baseKey = `PNG Text.${textChunk.keyword}`;
        let key = baseKey;
        let duplicate = 2;
        while (Object.hasOwn(metadata, key)) {
          key = `${baseKey} (${duplicate})`;
          duplicate += 1;
        }
        metadata[key] = textChunk.text;
      }
    }

    offset = nextChunk;
    if (type === "IEND") return metadata;
  }

  throw new Error("The PNG file is missing a complete end chunk.");
}
