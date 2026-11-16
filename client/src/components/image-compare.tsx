import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeftRight, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CHECKERBOARD =
  "bg-[length:16px_16px] bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0] dark:bg-[linear-gradient(45deg,#334155_25%,transparent_25%),linear-gradient(-45deg,#334155_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#334155_75%),linear-gradient(-45deg,transparent_75%,#334155_75%)]";

export interface CompareSource {
  id: string;
  label: string;
  /** Short secondary text, e.g. the file size. */
  detail?: string;
  /** Undefined while the source is still being produced. */
  url?: string;
}

type Zoom = "fit" | 1 | 2 | 4;

const ZOOM_OPTIONS: Array<{ value: Zoom; label: string }> = [
  { value: "fit", label: "Fit" },
  { value: 1, label: "100%" },
  { value: 2, label: "200%" },
  { value: 4, label: "400%" },
];

interface ImageCompareProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sources: CompareSource[];
  leftId: string;
  rightId: string;
  onLeftChange: (id: string) => void;
  onRightChange: (id: string) => void;
  /** Pixel dimensions every source is displayed at. */
  width: number;
  height: number;
  /** Shown under the toolbar, e.g. formats the browser can't display. */
  note?: string;
}

function ComparePane({
  side,
  paneRef,
  sources,
  selectedId,
  onSelect,
  zoom,
  displayWidth,
  displayHeight,
  onScroll,
}: {
  side: "left" | "right";
  paneRef: RefObject<HTMLDivElement | null>;
  sources: CompareSource[];
  selectedId: string;
  onSelect: (id: string) => void;
  zoom: Zoom;
  displayWidth: number;
  displayHeight: number;
  onScroll: () => void;
}) {
  const source = sources.find(candidate => candidate.id === selectedId);
  const drag = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pane = paneRef.current;
    if (!pane || zoom === "fit" || event.button !== 0) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      left: pane.scrollLeft,
      top: pane.scrollTop,
    };
    pane.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pane = paneRef.current;
    if (!pane || !drag.current) return;
    pane.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
    pane.scrollTop = drag.current.top - (event.clientY - drag.current.y);
  };

  const endDrag = () => {
    drag.current = null;
  };

  return (
    <div
      className="flex min-h-0 min-w-0 flex-1 flex-col"
      data-testid={`compare-pane-${side}`}
    >
      <div className="flex items-center gap-2 border-b bg-background px-3 py-2">
        <Select value={selectedId} onValueChange={onSelect}>
          <SelectTrigger
            className="h-8 w-44"
            aria-label={`${side === "left" ? "Left" : "Right"} image`}
            data-testid={`compare-select-${side}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sources.map(option => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {source?.detail ? (
          <span
            className="truncate font-mono text-sm text-slate-600 dark:text-slate-400"
            data-testid={`compare-detail-${side}`}
          >
            {source.detail}
          </span>
        ) : null}
      </div>
      <div
        ref={paneRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "relative min-h-0 flex-1 overflow-auto",
          CHECKERBOARD,
          zoom !== "fit" && "cursor-grab active:cursor-grabbing"
        )}
        data-testid={`compare-viewport-${side}`}
      >
        {source?.url ? (
          <div
            className={cn(
              zoom === "fit"
                ? "flex h-full w-full items-center justify-center p-2"
                : "flex min-h-full min-w-full w-max items-center justify-center"
            )}
          >
            <img
              src={source.url}
              alt={source.label}
              draggable={false}
              className={cn(
                "max-w-none select-none",
                zoom === "fit" && "max-h-full max-w-full object-contain"
              )}
              style={
                zoom === "fit"
                  ? { aspectRatio: `${displayWidth} / ${displayHeight}` }
                  : {
                      width: displayWidth,
                      height: displayHeight,
                      imageRendering: "pixelated",
                    }
              }
              data-testid={`compare-image-${side}`}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            Encoding…
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageCompare({
  open,
  onOpenChange,
  sources,
  leftId,
  rightId,
  onLeftChange,
  onRightChange,
  width,
  height,
  note,
}: ImageCompareProps) {
  const [zoom, setZoom] = useState<Zoom>(1);
  const [pixelRatio, setPixelRatio] = useState(1);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  useEffect(() => {
    if (open) setPixelRatio(window.devicePixelRatio || 1);
  }, [open]);

  // 100% means one image pixel per physical screen pixel.
  const scale = zoom === "fit" ? 1 : zoom / pixelRatio;
  const displayWidth = Math.max(1, Math.round(width * scale));
  const displayHeight = Math.max(1, Math.round(height * scale));

  const syncFrom = useCallback((from: "left" | "right") => {
    if (syncing.current) return;
    const source = (from === "left" ? leftRef : rightRef).current;
    const target = (from === "left" ? rightRef : leftRef).current;
    if (!source || !target) return;
    syncing.current = true;
    target.scrollLeft = source.scrollLeft;
    target.scrollTop = source.scrollTop;
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  }, []);

  // Start each zoom level centred on the image.
  useLayoutEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => {
      for (const pane of [leftRef.current, rightRef.current]) {
        if (!pane) continue;
        pane.scrollLeft = (pane.scrollWidth - pane.clientWidth) / 2;
        pane.scrollTop = (pane.scrollHeight - pane.clientHeight) / 2;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [open, zoom, displayWidth, displayHeight]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <DialogPrimitive.Content
          className="fixed inset-2 z-50 flex flex-col overflow-hidden rounded-lg border bg-background shadow-2xl sm:inset-4"
          data-testid="image-compare-dialog"
        >
          <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
            <DialogPrimitive.Title className="mr-auto text-lg font-semibold">
              Compare quality
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Two images shown side by side at the same size. Scrolling or
              dragging one pans both.
            </DialogPrimitive.Description>
            <div
              className="flex rounded-md border p-0.5"
              role="group"
              aria-label="Zoom"
            >
              {ZOOM_OPTIONS.map(option => (
                <Button
                  key={option.label}
                  size="sm"
                  variant={zoom === option.value ? "default" : "ghost"}
                  className="h-7 px-2.5"
                  onClick={() => setZoom(option.value)}
                  aria-pressed={zoom === option.value}
                  data-testid={`compare-zoom-${option.label}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                onLeftChange(rightId);
                onRightChange(leftId);
              }}
              data-testid="compare-swap"
            >
              <ArrowLeftRight className="mr-1.5 h-4 w-4" />
              Swap
            </Button>
            <DialogPrimitive.Close asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close comparison"
                data-testid="compare-close"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <p className="border-b px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400">
            {zoom === "fit"
              ? "Scaled to fit the window. Choose 100% to judge quality."
              : `${zoom * 100}%: each image pixel is ${zoom === 1 ? "one screen pixel" : `${zoom}×${zoom} screen pixels`}. Drag or scroll to pan both sides together.`}{" "}
            {width} × {height}px.
            {note ? ` ${note}` : ""}
          </p>
          <div className="flex min-h-0 flex-1 flex-col divide-y md:flex-row md:divide-x md:divide-y-0">
            <ComparePane
              side="left"
              paneRef={leftRef}
              sources={sources}
              selectedId={leftId}
              onSelect={onLeftChange}
              zoom={zoom}
              displayWidth={displayWidth}
              displayHeight={displayHeight}
              onScroll={() => syncFrom("left")}
            />
            <ComparePane
              side="right"
              paneRef={rightRef}
              sources={sources}
              selectedId={rightId}
              onSelect={onRightChange}
              zoom={zoom}
              displayWidth={displayWidth}
              displayHeight={displayHeight}
              onScroll={() => syncFrom("right")}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
