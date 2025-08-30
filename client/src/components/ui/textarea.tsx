import * as React from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import type { ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { yaml } from "@codemirror/lang-yaml";
import { markdown } from "@codemirror/lang-markdown";
import { Copy, Download } from "lucide-react";

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
}

const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
  ({ className, value, onChange, ...props }) => {
    const baseClassName = cn(
      "w-full rounded-md border border-input bg-background text-sm",
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
        case "html":
          return html();
        case "yaml":
          return yaml();
        case "markdown":
          return markdown();
        default:
          return javascript({ jsx: true }); // Default to JavaScript if lang is not provided or recognized
      }
    };

    // Create a minimal synthetic ChangeEvent compatible with e.target.value usage.
    const createSyntheticChangeEvent = (
      val: string
    ): React.ChangeEvent<HTMLTextAreaElement> =>
      ({
        // Consumers expect e.target.value; other fields are not used.
        target: { value: val } as unknown as EventTarget & HTMLTextAreaElement,
      }) as unknown as React.ChangeEvent<HTMLTextAreaElement>;
    const extensions = [getLanguageExtension(props.lang)];

    const handleCopy = () => {
      navigator.clipboard.writeText(value || "");
    };

    // Download handler
    const handleDownload = () => {
      const extension = props.fileExtension
        ? props.fileExtension.replace(/^\./, "")
        : "txt";
      const randomName = `file_${Math.random().toString(36).slice(2, 10)}.${extension}`;
      const blob = new Blob([value || ""], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = randomName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // State for cursor position and content size
    const [cursor, setCursor] = React.useState({ line: 1, ch: 1 });
    const [contentSize, setContentSize] = React.useState(0);

    // Format bytes to human readable string
    const formatBytes = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`;
      const units = ["kB", "MB", "GB", "TB"];
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

    // Handler for CodeMirror view updates
    const handleEditorUpdate = React.useCallback((view: ViewUpdate) => {
      const pos = view.state.selection.main.head;
      const line = view.state.doc.lineAt(pos);
      setCursor({
        line: line.number,
        ch: pos - line.from + 1,
      });
    }, []);

    return (
      <div className="relative">
        <div className="absolute top-1 right-1 z-10 flex gap-1">
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            title="Copy To clipboard"
            data-testid="copy-all-button"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleDownload}
            size="sm"
            variant="ghost"
            title="Download file"
            data-testid="download-button"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <CodeMirror
          className={baseClassName}
          value={value}
          extensions={extensions}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
          }}
          onChange={val => {
            if (onChange) onChange(createSyntheticChangeEvent(val));
          }}
          minHeight={props.minHeight}
          lang={props.lang}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          id={props.id}
          autoFocus={props.autoFocus}
          // Add onUpdate handler for cursor tracking
          onUpdate={handleEditorUpdate}
        />
        {/* Status bar below editor */}
        <div
          className="w-full flex justify-between items-center px-2 py-1 text-xs text-muted-foreground bg-muted rounded-b-md border-t"
          style={{ fontFamily: "monospace" }}
          data-testid="textarea-status-bar"
        >
          <span>
            Line {cursor.line}, Char {cursor.ch}
          </span>
          <span>Size: {formatBytes(contentSize)}</span>
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
