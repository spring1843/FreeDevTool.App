import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** @deprecated No-op. The simplified Textarea no longer renders line numbers. */
  showLineNumbers?: boolean;
  /** @deprecated No-op. The simplified Textarea no longer shows stats. */
  showStats?: boolean;
  /** @deprecated No-op. Word wrap is always enabled. */
  enableWordWrap?: boolean;
  /** @deprecated No-op. The simplified Textarea has no control bar. */
  showControls?: boolean;
  /** @deprecated No-op. Copy button has been removed. */
  onCopy?: () => void;
  /** Whether the textarea can be resized vertically. Defaults to true. */
  resizable?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      // Deprecated props kept for backward compatibility (ignored)
      showLineNumbers: _showLineNumbers,
      showStats: _showStats,
      enableWordWrap: _enableWordWrap,
      showControls: _showControls,
      onCopy: _onCopy,
      resizable = true,
      ...props
    },
    ref
  ) => {
    const baseClassName = cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      resizable ? "resize-y" : "resize-none",
      "whitespace-pre-wrap",
      className
    );

    return <textarea ref={ref} className={baseClassName} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
