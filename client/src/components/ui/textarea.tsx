import * as React from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { yaml } from "@codemirror/lang-yaml";
import { markdown } from "@codemirror/lang-markdown";
import { Copy } from "lucide-react";

// Define props for the CodeMirror component
export interface TextAreaProps {
  className?: string;
  value?: string;
  lang?: string;
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

    return (
      <div className="relative">
        <div className="absolute top-1 right-1 z-10">
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            title="Copy To clipboard"
            data-testid="copy-all-button"
          >
            <Copy className="w-4 h-4" />
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
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
