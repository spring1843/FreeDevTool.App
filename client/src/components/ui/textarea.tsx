import * as React from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, type ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { yaml } from "@codemirror/lang-yaml";
import { markdown } from "@codemirror/lang-markdown";
import { less } from "@codemirror/lang-less";
import { sql } from "@codemirror/lang-sql";
import { rust } from "@codemirror/lang-rust";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import {
  Copy,
  Download,
  Upload,
  WrapText,
  Expand,
  Minimize2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Detect mobile/touch devices for optimized CodeMirror configuration
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - msMaxTouchPoints is IE-specific
        navigator.msMaxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile((hasTouchScreen && isSmallScreen) || isMobileUA);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Mobile-optimized CodeMirror theme extension
// Adds touch-action: manipulation to prevent iOS touch delays and pointer capture issues
const mobileThemeExtension = EditorView.theme({
  "&": {
    touchAction: "manipulation",
  },
  ".cm-content": {
    touchAction: "manipulation",
  },
  ".cm-scroller": {
    touchAction: "pan-x pan-y",
    overscrollBehavior: "contain",
  },
});

// Extension to release pointer capture on touch end - prevents focus lock on iOS
const releasePointerCaptureExtension = EditorView.domEventHandlers({
  pointerup(event, _view) {
    const target = event.target as HTMLElement;
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
    return false;
  },
  touchend(event, _view) {
    if (document.activeElement instanceof HTMLElement) {
      const isOutsideEditor = !_view.dom.contains(event.target as Node);
      if (isOutsideEditor) {
        document.activeElement.blur();
      }
    }
    return false;
  },
});

// Define props for the CodeMirror component
export interface TextAreaProps {
  className?: string;
  value?: string;
  lang?: string;
  fileExtension?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  rows?: number;
  placeholder?: string;
  id?: string;
  minHeight?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  theme?: "light" | "dark";
  lineWrapping?: boolean;
  fixedHeight?: boolean; // when true, cap visible height by max lines; when false, allow full height
}

const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      className,
      value,
      onChange,
      theme = "light",
      lineWrapping = false,
      fixedHeight = true,
      ...props
    },
    _ref // The ref is not used, but forwardRef requires it.
  ) => {
    const isMobile = useIsMobile();

    const baseClassName = cn(
      // Make the editor visually attach to the top navbar: no top rounding
      // so the navbar's rounded-t-md forms the top corners; keep bottom round.
      "w-full rounded-b-md border border-input bg-background text-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    );

    // Map language prop to the correct CodeMirror extension
    const getLanguageExtension = (language: string | undefined) => {
      switch (language) {
        case "javascript":
          return javascript({ jsx: true });
        case "typescript":
          return javascript({ jsx: true, typescript: true });
        case "css":
          return css();
        case "less":
          return less();
        case "scss":
          // Approximate with CSS highlighting (no SCSS package installed)
          return css();
        case "html":
          return html();
        case "yaml":
          return yaml();
        case "markdown":
          return markdown();
        case "graphql":
          // Approximate with JavaScript highlighting to avoid adding heavy deps
          return javascript({ jsx: false });
        case "python":
          return python();
        case "php":
          return php();
        case "rust":
          return rust();
        case "sql":
          return sql();
        case "go":
          return go();
        case "java":
          return java();
        case "cpp":
        case "c++":
          return cpp();
        case "json":
          return json();
        case "text":
        case "plain":
        case "plaintext":
          // Minimal setup: no specific language extension
          return [];
        default:
          return javascript({ jsx: true }); // Default to JavaScript if lang is not provided or recognized
      }
    };

    // Canonical language values (identifiers) and display labels
    const LANGUAGES = {
      javascript: { value: "javascript", label: "JavaScript" },
      typescript: { value: "typescript", label: "TypeScript" },
      css: { value: "css", label: "CSS" },
      less: { value: "less", label: "LESS" },
      scss: { value: "scss", label: "SCSS" },
      html: { value: "html", label: "HTML" },
      yaml: { value: "yaml", label: "YAML" },
      markdown: { value: "markdown", label: "Markdown" },
      graphql: { value: "graphql", label: "GraphQL" },
      plaintext: { value: "plaintext", label: "Plain Text" },
      go: { value: "go", label: "Go" },
      java: { value: "java", label: "Java" },
      cpp: { value: "cpp", label: "C++" },
      json: { value: "json", label: "JSON" },
      php: { value: "php", label: "PHP" },
      python: { value: "python", label: "Python" },
      rust: { value: "rust", label: "Rust" },
      sql: { value: "sql", label: "SQL" },
    };

    const LANGUAGE_OPTIONS = [
      LANGUAGES.javascript,
      LANGUAGES.typescript,
      LANGUAGES.css,
      LANGUAGES.less,
      LANGUAGES.scss,
      LANGUAGES.html,
      LANGUAGES.yaml,
      LANGUAGES.markdown,
      LANGUAGES.graphql,
      LANGUAGES.plaintext,
      LANGUAGES.go,
      LANGUAGES.java,
      LANGUAGES.cpp,
      LANGUAGES.json,
      LANGUAGES.php,
      LANGUAGES.python,
      LANGUAGES.rust,
      LANGUAGES.sql,
    ].sort((a, b) => a.label.localeCompare(b.label));
    const [currentLang, setCurrentLang] = React.useState<string | undefined>(
      props.lang
    );
    React.useEffect(() => {
      setCurrentLang(props.lang);
    }, [props.lang]);

    // Create a minimal synthetic ChangeEvent compatible with e.target.value usage.
    const createSyntheticChangeEvent = (
      val: string
    ): React.ChangeEvent<HTMLTextAreaElement> =>
      ({
        // Consumers expect e.target.value; other fields are not used.
        target: { value: val } as unknown as EventTarget & HTMLTextAreaElement,
      }) as unknown as React.ChangeEvent<HTMLTextAreaElement>;
    // Local UI toggles for wrap and height, synced to props
    const [isWrapping, setIsWrapping] = React.useState<boolean>(lineWrapping);
    React.useEffect(() => {
      setIsWrapping(lineWrapping);
    }, [lineWrapping]);

    const [isFixedHeight, setIsFixedHeight] =
      React.useState<boolean>(fixedHeight);
    React.useEffect(() => {
      setIsFixedHeight(fixedHeight);
    }, [fixedHeight]);

    const langExt = getLanguageExtension(currentLang);

    // Dynamically cap the editor's visible height by number of lines.
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const [lineHeightPx, setLineHeightPx] = React.useState<number>(18);

    React.useEffect(() => {
      const measure = () => {
        if (!wrapperRef.current) return;
        const line = wrapperRef.current.querySelector(
          ".cm-editor .cm-line"
        ) as HTMLElement | null;
        if (line) {
          const cs = window.getComputedStyle(line);
          const lh = parseFloat(cs.lineHeight);
          if (!Number.isNaN(lh) && lh > 0) setLineHeightPx(lh);
        }
      };
      // initial measure and on next tick in case CodeMirror mounts after first paint
      measure();
      const id = window.setTimeout(measure, 50);
      return () => window.clearTimeout(id);
    }, [value, theme]);

    const DESKTOP_MAX_LINES = 300;
    const MOBILE_MAX_LINES = 100;
    const maxVisibleLines = isMobile ? MOBILE_MAX_LINES : DESKTOP_MAX_LINES;
    const maxHeightPx = Math.max(1, Math.round(lineHeightPx * maxVisibleLines));

    const heightLimitExtension = EditorView.theme({
      "&": { maxHeight: `${maxHeightPx}px`, overflow: "auto" },
    });

    const extensions = [
      ...(Array.isArray(langExt) ? langExt : [langExt]),
      ...(isWrapping ? [EditorView.lineWrapping] : []),
      ...(isFixedHeight ? [heightLimitExtension] : []),
    ];
    const { toast } = useToast();

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value || "");
        toast({
          title: "Copied to clipboard",
          description: `The content has been copied (${formatBytes(contentSize)}).`,
          duration: 2000,
        });
      } catch {
        // Provide a gentle failure notice without breaking flow
        toast({
          title: "Copy failed",
          description: "Unable to copy content to clipboard.",
          variant: "destructive",
          duration: 2500,
        });
      }
    };

    // Download handler
    const handleDownload = () => {
      const extension = props.fileExtension
        ? props.fileExtension.replace(/^\./, "")
        : "txt";
      const randomName = `file_${Math.random().toString(36).slice(2, 10)}.${extension}`;
      try {
        const blob = new Blob([value || ""], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = randomName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({
          title: "Download started",
          description: `Saved as ${randomName} (${formatBytes(contentSize)})`,
          duration: 2000,
        });
      } catch {
        toast({
          title: "Download failed",
          description: "Could not create or save the file.",
          variant: "destructive",
          duration: 2500,
        });
      }
    };

    // Ref for hidden file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Handler for upload button click
    const handleUploadClick = () => {
      try {
        fileInputRef.current?.click();
      } catch {
        toast({
          title: "Upload failed",
          description: "Could not open file picker.",
          variant: "destructive",
          duration: 2500,
        });
      }
    };

    // Handler for file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        // User canceled or no file selected; no toast needed
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (onChange) {
            onChange(createSyntheticChangeEvent(reader.result as string));
          }
          toast({
            title: "File uploaded",
            description: `Loaded ${file.name} (${formatBytes(file.size)})`,
            duration: 2000,
          });
        } catch {
          toast({
            title: "Upload failed",
            description: "Could not read the selected file.",
            variant: "destructive",
            duration: 2500,
          });
        }
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "An error occurred while reading the file.",
          variant: "destructive",
          duration: 2500,
        });
      };
      reader.readAsText(file);
      // Reset input value so same file can be uploaded again
      e.target.value = "";
    };

    // State for cursor position and content size
    const [cursor, setCursor] = React.useState({ line: 1, ch: 1 });
    const [contentSize, setContentSize] = React.useState(0);

    // Ref to track pending cursor update for debouncing
    const cursorUpdateRef = React.useRef<number | null>(null);
    const pendingCursorRef = React.useRef<{ line: number; ch: number } | null>(
      null
    );

    // Format bytes to human readable string
    const formatBytes = (bytes: number): string => {
      // Use full unit names for clarity
      if (bytes < 1024) return `${bytes} Bytes`;
      const units = [
        "Kilobytes",
        "Megabytes",
        "Gigabytes",
        "Terabytes",
      ] as const;
      let i = -1;
      let size = bytes;
      do {
        size /= 1024;
        i++;
      } while (size >= 1024 && i < units.length - 1);
      return `${size.toFixed(2)} ${units[i]}`;
    };

    // Update content size when value changes
    React.useEffect(() => {
      setContentSize(new Blob([value || ""]).size);
    }, [value]);

    // Cleanup pending animation frame on unmount
    React.useEffect(
      () => () => {
        if (cursorUpdateRef.current !== null) {
          cancelAnimationFrame(cursorUpdateRef.current);
        }
      },
      []
    );

    // Handler for CodeMirror view updates - debounced to prevent mobile performance issues
    const handleEditorUpdate = React.useCallback((view: ViewUpdate) => {
      const pos = view.state.selection.main.head;
      const line = view.state.doc.lineAt(pos);
      const newCursor = {
        line: line.number,
        ch: pos - line.from + 1,
      };

      // Store the latest cursor position
      pendingCursorRef.current = newCursor;

      // Only schedule an update if one isn't already pending
      if (cursorUpdateRef.current === null) {
        cursorUpdateRef.current = requestAnimationFrame(() => {
          cursorUpdateRef.current = null;
          if (pendingCursorRef.current) {
            setCursor(pendingCursorRef.current);
          }
        });
      }
    }, []);

    // Use theme prop for CodeMirror theme
    const codeMirrorTheme = theme === "dark" ? "dark" : "light";

    // Drag-and-drop state for visual feedback
    const [isDragOver, setIsDragOver] = React.useState(false);

    // Drag-and-drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      if (props.readOnly) return;
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (_e: React.DragEvent<HTMLDivElement>) => {
      if (props.readOnly) return;
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      if (props.readOnly) return;
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (onChange) {
          onChange(createSyntheticChangeEvent(reader.result as string));
        }
      };
      reader.readAsText(file);
    };

    return (
      <div
        className={cn(
          "relative",
          isDragOver && !props.readOnly ? "border-blue-500 border-2" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="textarea-drop-area"
        ref={wrapperRef}
      >
        {/* Toolbar / Navbar above the editor */}
        <div className="flex justify-end">
          <div
            className={cn(
              // Compact toolbar sized to its contents (no full-width stretch)
              "inline-flex items-center gap-2 text-xs text-muted-foreground",
              // Remove outer spacing so the toolbar borders align flush with editor borders
              "bg-muted rounded-t-md border px-1 py-0"
            )}
            data-testid="textarea-toolbar"
          >
            {/* Toggle word wrapping */}
            <div className="relative group">
              <Button
                onClick={() => {
                  setIsWrapping(v => !v);
                  toast({
                    title: isWrapping
                      ? "Word wrapping disabled"
                      : "Word wrapping enabled",
                    description: isWrapping
                      ? "Text will not wrap; long lines may require horizontal scroll."
                      : "Text will wrap, so you can read long lines without horizontal scrolling.",
                    duration: 2000,
                  });
                }}
                size="sm"
                variant="ghost"
                aria-label="Toggle word wrapping"
                title={
                  isWrapping ? "Disable word wrapping" : "Enable word wrapping"
                }
                data-testid="toggle-wrap-button"
                className="p-0 h-5 w-5"
              >
                <WrapText className="w-3.5 h-3.5" />
              </Button>
              <span
                className={cn(
                  "pointer-events-none absolute -top-7 right-0 hidden rounded bg-popover px-2 py-0.5 text-[10px] text-muted-foreground shadow group-hover:block",
                  "border"
                )}
              >
                {isWrapping ? "Unwrap" : "Wrap"}
              </span>
            </div>
            {/* Toggle fixed/full height */}
            <div className="relative group">
              <Button
                onClick={() => {
                  setIsFixedHeight(v => !v);
                  toast({
                    title: isFixedHeight
                      ? "Full height enabled"
                      : "Fixed height enabled",
                    description: isFixedHeight
                      ? "Editor will use full height; horizontal scrollbar goes away when combined with wrapping."
                      : "Editor height is capped to keep the layout compact; overflow will scroll vertically.",
                    duration: 2000,
                  });
                }}
                size="sm"
                variant="ghost"
                aria-label="Toggle fixed height"
                title={isFixedHeight ? "Use full height" : "Use fixed height"}
                data-testid="toggle-height-button"
                className="p-0 h-5 w-5"
              >
                {isFixedHeight ? (
                  <Expand className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </Button>
              <span
                className={cn(
                  "pointer-events-none absolute -top-7 right-0 hidden rounded bg-popover px-2 py-0.5 text-[10px] text-muted-foreground shadow group-hover:block",
                  "border"
                )}
              >
                {isFixedHeight ? "Full height" : "Fixed height"}
              </span>
            </div>
            <div className="relative group">
              <Button
                onClick={handleCopy}
                size="sm"
                variant="ghost"
                aria-label="Copy content to clipboard"
                title="Copy content to clipboard"
                data-testid="copy-all-button"
                className="p-0 h-5 w-5"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <span
                className={cn(
                  "pointer-events-none absolute -top-7 right-0 hidden rounded bg-popover px-2 py-0.5 text-[10px] text-muted-foreground shadow group-hover:block",
                  "border"
                )}
              >
                Copy
              </span>
            </div>
            <div className="relative group">
              <Button
                onClick={handleDownload}
                size="sm"
                variant="ghost"
                aria-label="Download content as a file"
                title="Download content as a file"
                data-testid="download-button"
                className="p-0 h-5 w-5"
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
              <span
                className={cn(
                  "pointer-events-none absolute -top-7 right-0 hidden rounded bg-popover px-2 py-0.5 text-[10px] text-muted-foreground shadow group-hover:block",
                  "border"
                )}
              >
                Download
              </span>
            </div>
            {/* Only show upload if not readOnly */}
            {!props.readOnly && (
              <>
                <div className="relative group">
                  <Button
                    onClick={handleUploadClick}
                    size="sm"
                    variant="ghost"
                    aria-label="Import from a file"
                    title="Import from a file"
                    data-testid="upload-button"
                    className="p-0 h-5 w-5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </Button>
                  <span
                    className={cn(
                      "pointer-events-none absolute -top-7 right-0 hidden rounded bg-popover px-2 py-0.5 text-[10px] text-muted-foreground shadow group-hover:block",
                      "border"
                    )}
                  >
                    Upload
                  </span>
                </div>
                {/* Hidden file input for upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={
                    props.fileExtension
                      ? `.${props.fileExtension.replace(/^\./, "")}`
                      : undefined
                  }
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  data-testid="upload-input"
                />
              </>
            )}
          </div>
        </div>

        <CodeMirror
          className={baseClassName}
          value={value}
          extensions={
            isMobile
              ? [
                  ...extensions,
                  mobileThemeExtension,
                  releasePointerCaptureExtension,
                ]
              : extensions
          }
          basicSetup={
            isMobile
              ? {
                  // Minimal setup for mobile - disable expensive features
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: false,
                  highlightSelectionMatches: false,
                  closeBrackets: false,
                  autocompletion: false,
                  rectangularSelection: false,
                  crosshairCursor: false,
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: false,
                  bracketMatching: false,
                  closeBracketsKeymap: false,
                  searchKeymap: false,
                  foldKeymap: false,
                  completionKeymap: false,
                  lintKeymap: false,
                }
              : {
                  lineNumbers: true,
                  foldGutter: true,
                }
          }
          theme={codeMirrorTheme}
          onChange={val => {
            if (onChange) onChange(createSyntheticChangeEvent(val));
          }}
          minHeight={props.minHeight}
          lang={props.lang}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          id={props.id}
          autoFocus={props.autoFocus}
          onUpdate={isMobile ? undefined : handleEditorUpdate}
        />
        {/* Status bar below editor with status on the left and language selector on the right */}
        <div
          className="w-full flex justify-between items-center px-2 py-1 text-xs text-muted-foreground bg-muted rounded-b-md border-t"
          style={{ fontFamily: "monospace" }}
          data-testid="textarea-status-bar"
        >
          <span>
            Line {cursor.line}, Char {cursor.ch}, Size{" "}
            {formatBytes(contentSize)}
          </span>
          <label className="flex items-center gap-1">
            <span className="sr-only">Select language</span>
            <select
              aria-label="Select language"
              title="Language"
              value={currentLang || LANGUAGES.javascript.value}
              onChange={e => setCurrentLang(e.target.value)}
              className={cn(
                "h-5 rounded border bg-background px-1 text-xs",
                "focus:outline-none"
              )}
              data-testid="language-select"
            >
              {LANGUAGE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
