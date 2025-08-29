import * as React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { cn } from "@/lib/utils";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

// Define props for the CodeMirror component
export interface TextAreaProps {
  className?: string;
  value?: string;
  lang?: string;
  readOnly?: boolean;
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

    return (
      <CodeMirror
        className={baseClassName}
        value={value}
        theme={dracula}
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
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
