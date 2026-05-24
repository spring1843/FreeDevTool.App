/**
 * Maps the key segment of a shortcut string (e.g. the "1" in "Ctrl+Shift+1")
 * to a KeyboardEvent.code value for layout-independent matching.
 *
 * Only base (unshifted) key representations are included. Shifted-symbol
 * aliases (e.g. "!" → Digit1, "@" → Digit2, "~" → Backquote) are
 * intentionally omitted to prevent two different shortcut strings from
 * colliding on the same physical key.
 */
export function shortcutKeyToCode(key: string): string {
  if (key.length === 1) {
    const upper = key.toUpperCase();
    if (upper >= "A" && upper <= "Z") return `Key${upper}`;
    if (key >= "0" && key <= "9") return `Digit${key}`;
  }
  const map: Record<string, string> = {
    "`": "Backquote",
    "-": "Minus",
    "=": "Equal",
    "[": "BracketLeft",
    "]": "BracketRight",
    "\\": "Backslash",
    ";": "Semicolon",
    "'": "Quote",
    ",": "Comma",
    ".": "Period",
    "/": "Slash",
  };
  return map[key] ?? "";
}
