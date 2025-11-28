import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Copy,
  RefreshCw,
  Share,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
  variant?:
    | "copy"
    | "reset"
    | "share"
    | "download"
    | "upload"
    | "play"
    | "pause"
    | "stop"
    | "clear"
    | "custom";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  tooltip: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const variantConfig = {
  copy: {
    icon: Copy,
    text: "Copy",
    tooltip: "Copy to clipboard",
  },
  reset: {
    icon: RefreshCw,
    text: "Reset",
    tooltip: "Reset to default values",
  },
  share: {
    icon: Share,
    text: "Share",
    tooltip: "Copy shareable URL to clipboard",
  },
  download: {
    icon: Download,
    text: "Download",
    tooltip: "Download file",
  },
  upload: {
    icon: Upload,
    text: "Upload",
    tooltip: "Upload file",
  },
  play: {
    icon: Play,
    text: "Start",
    tooltip: "Start",
  },
  pause: {
    icon: Pause,
    text: "Pause",
    tooltip: "Pause",
  },
  stop: {
    icon: Square,
    text: "Stop",
    tooltip: "Stop",
  },
  clear: {
    icon: RotateCcw,
    text: "Clear",
    tooltip: "Clear all data",
  },
};

export function ToolButton({
  variant = "custom",
  onClick,
  disabled = false,
  className,
  children,
  icon,
  tooltip,
  size = "default",
}: ToolButtonProps) {
  const config = variant !== "custom" ? variantConfig[variant] : null;
  const IconComponent = config?.icon;
  const buttonText = config?.text;
  const defaultTooltip = config?.tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            disabled={disabled}
            size={size}
            className={cn(className)}
            data-testid={`button-${variant}`}
          >
            {icon ||
              (IconComponent && <IconComponent className="w-4 h-4 mr-2" />)}
            {children || buttonText}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip || defaultTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Specialized button variants for common use cases
export function CopyButton({
  onClick,
  disabled,
  text = "Copy",
  tooltip = "Copy to clipboard",
}: {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
  tooltip?: string;
}) {
  return (
    <ToolButton
      variant="copy"
      onClick={onClick}
      disabled={disabled}
      tooltip={tooltip}
    >
      {text}
    </ToolButton>
  );
}

export function ResetButton({
  onClick,
  disabled,
  tooltip = "Reset to default values",
  hasModifiedData = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  hasModifiedData?: boolean;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    if (hasModifiedData) {
      setShowDialog(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={disabled}
              data-testid="button-reset"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all inputs to their default values. Any changes
              you have made will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-reset-cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onClick}
              data-testid="button-reset-confirm"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ClearButton({
  onClick,
  disabled,
  tooltip = "Clear all inputs to start fresh",
  hasModifiedData = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  hasModifiedData?: boolean;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    if (hasModifiedData) {
      setShowDialog(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={disabled}
              data-testid="button-clear"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all inputs?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear all inputs so you can start fresh. Any data you
              have entered will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-clear-cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onClick}
              data-testid="button-clear-confirm"
            >
              Clear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ShareButton({
  onClick,
  disabled,
  tooltip = "Copy shareable URL to clipboard",
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
}) {
  return (
    <ToolButton
      variant="share"
      onClick={onClick}
      disabled={disabled}
      tooltip={tooltip}
    />
  );
}
