import { useShareTool } from "@/hooks/use-share-tool";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_MARKDOWN } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  convertMarkdownToHtml,
  extractTitle,
  slugifyFilename,
  wrapHtmlDocument,
} from "@/lib/markdown-to-html";
import { formatHTML } from "@/lib/formatters";

export default function MarkdownToHtml() {
  const { handleShare } = useShareTool();
  const { toast } = useToast();
  const tool = getToolByPath("/tools/markdown-to-html");
  const [input, setInput] = useState(DEFAULT_MARKDOWN);
  const [fullDocument, setFullDocument] = useState(true);
  const { theme } = useTheme();

  const { fragment, error } = useMemo(() => {
    try {
      return { fragment: convertMarkdownToHtml(input), error: null };
    } catch (err) {
      return {
        fragment: "",
        error: `Conversion error: ${err instanceof Error ? err.message : "Unknown error"}`,
      };
    }
  }, [input]);

  const title = useMemo(() => extractTitle(input), [input]);

  const rawOutput = useMemo(() => {
    if (!fragment) return "";
    return fullDocument ? wrapHtmlDocument(fragment, title) : fragment;
  }, [fragment, fullDocument, title]);

  // Pretty-print with the same Prettier-based formatter as the HTML Formatter
  // tool. Validation messages are ignored: they target hand-written HTML.
  const [formatted, setFormatted] = useState<{
    source: string;
    html: string;
  } | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!rawOutput) return undefined;
    // The shared formatter can drop the doctype, so format without it and
    // add it back to keep the downloaded file in standards mode.
    const doctype = rawOutput.match(/^<!doctype html>\s*/i)?.[0] ?? "";
    formatHTML(rawOutput.slice(doctype.length))
      .then(result => {
        if (!cancelled) {
          const html = doctype
            ? `<!doctype html>\n${result.formatted.trimStart()}`
            : result.formatted;
          setFormatted({ source: rawOutput, html });
        }
      })
      .catch(() => {
        // Keep showing the unformatted HTML if formatting fails.
      });
    return () => {
      cancelled = true;
    };
  }, [rawOutput]);
  const output = formatted?.source === rawOutput ? formatted.html : rawOutput;

  // Preview always renders as a full document, themed to match the app, with
  // links opening in a new tab so the preview frame is never navigated away.
  const previewDoc = useMemo(
    () =>
      wrapHtmlDocument(fragment, title, theme)
        .replace("<head>", '<head>\n<base target="_blank">')
        // The preview card already frames the content, so drop the reading-width
        // cap used by downloaded pages and keep only a small inset.
        .replace(
          "</head>",
          "<style>body { max-width: none; margin: 0; padding: 1rem 1.25rem; }</style>\n</head>"
        ),
    [fragment, title, theme]
  );

  // Grow the preview frame to fit its content so it never scrolls internally.
  const previewRef = useRef<HTMLIFrameElement>(null);
  const [previewHeight, setPreviewHeight] = useState(500);
  const resizePreview = useCallback(() => {
    const doc = previewRef.current?.contentDocument;
    if (doc?.documentElement) {
      // getBoundingClientRect reports content height; scrollHeight would never
      // shrink below the current frame height.
      setPreviewHeight(
        Math.ceil(doc.documentElement.getBoundingClientRect().height) + 2
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizePreview);
    return () => window.removeEventListener("resize", resizePreview);
  }, [resizePreview]);

  const handleDownload = () => {
    if (!output.trim()) {
      toast({
        title: "Nothing to download",
        description: "Enter some Markdown first.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }
    const filename = `${slugifyFilename(title)}.html`;
    try {
      const blob = new Blob([output], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Download started",
        description: `Saved as ${filename}`,
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

  const handleReset = () => setInput(DEFAULT_MARKDOWN);
  const handleClear = () => setInput("");

  const hasModifiedData = input !== DEFAULT_MARKDOWN && input.trim() !== "";
  const isAtDefault = input === DEFAULT_MARKDOWN;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Markdown to HTML
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Convert Markdown to HTML, preview the rendered result, and
              download it as an HTML file
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      {error ? (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="download"
            onClick={handleDownload}
            tooltip="Download the converted HTML file"
            disabled={!output.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Download HTML
          </ToolButton>
          <ToolButton
            variant="share"
            onClick={handleShare}
            tooltip="Copy link to this tool"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="markdown-full-document"
                    checked={fullDocument}
                    onCheckedChange={setFullDocument}
                    data-testid="full-document-switch"
                  />
                  <Label
                    htmlFor="markdown-full-document"
                    className="cursor-pointer"
                  >
                    Full HTML Document
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  On: standalone page with &lt;head&gt; and styles. Off: body
                  HTML only.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default example"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear all inputs"
            hasModifiedData={hasModifiedData}
            disabled={input.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Markdown Input</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste your Markdown here..."
              data-testid="markdown-input"
              className="min-h-[500px] font-mono text-sm"
              rows={25}
              autoFocus={true}
              lang="markdown"
              fileExtension="md"
              theme={theme}
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HTML Output</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={output}
              readOnly={true}
              placeholder="Converted HTML will appear here..."
              data-testid="html-output"
              className="min-h-[500px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              rows={25}
              lang="html"
              fileExtension="html"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rendered Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* allow-same-origin (without allow-scripts) lets the parent measure
              the content height; scripts in the Markdown still never run. */}
          <iframe
            ref={previewRef}
            title="Rendered Markdown preview"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            srcDoc={previewDoc}
            onLoad={resizePreview}
            data-testid="markdown-preview"
            style={{ height: previewHeight }}
            className="w-full min-h-[500px] rounded-md border border-input bg-white dark:bg-slate-900"
          />
        </CardContent>
      </Card>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
