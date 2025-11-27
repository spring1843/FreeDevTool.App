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
import { Copy, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
  ({ className, value, onChange, theme = "light", ...props }) => {
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
      >
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
          {/* Only show upload if not readOnly */}
          {!props.readOnly && (
            <>
              <Button
                onClick={handleUploadClick}
                size="sm"
                variant="ghost"
                title="Upload file"
                data-testid="upload-button"
              >
                <Upload className="w-4 h-4" />
              </Button>
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

        <CodeMirror
          className={baseClassName}
          value={value}
          extensions={extensions}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
          }}
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
