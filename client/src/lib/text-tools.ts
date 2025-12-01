import type { TextStats } from "@/types/tools";

export function countTextStats(text: string): TextStats {
  if (!text.trim()) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      bytes: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  // Count words (split by whitespace and filter empty strings)
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Count sentences (match sentence endings, handle trailing fragments)
  const trimmed = text.trimEnd();
  const matches = Array.from(trimmed.matchAll(/[.!?]+/g));
  let sentences = matches.length;
  if (
    trimmed.length > 0 &&
    (matches.length === 0 ||
      matches[matches.length - 1].index! +
        matches[matches.length - 1][0].length <
        trimmed.length)
  ) {
    sentences += 1;
  }
  // Count paragraphs (split by double newlines or more)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter(paragraph => paragraph.trim().length > 0).length;

  // Count lines
  const lines = text.split("\n").length;

  // Calculate bytes using UTF-8 encoding (proper Unicode character support)
  const bytes = new TextEncoder().encode(text).length;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    bytes,
  };
}
