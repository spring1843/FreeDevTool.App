import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
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
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
function CopyButton({
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
  iconOnly = false,
  showToast = true,
  toastTitle = "Reset complete",
  toastDescription = "All inputs have been reset to defaults",
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  hasModifiedData?: boolean;
  iconOnly?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    if (hasModifiedData) {
      setShowDialog(true);
    } else {
      onClick();
      if (showToast) {
        toast({ title: toastTitle, description: toastDescription });
      }
    }
  };

  const handleConfirm = useCallback(() => {
    onClick();
    setShowDialog(false);
    if (showToast) {
      toast({ title: toastTitle, description: toastDescription });
    }
  }, [onClick, showToast, toast, toastTitle, toastDescription]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={disabled}
              aria-disabled={disabled ? "true" : undefined}
              data-testid="reset-button"
              variant="outline"
              size={iconOnly ? "icon" : "default"}
              className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-800 dark:hover:text-amber-300"
            >
              <RefreshCw className={iconOnly ? "w-4 h-4" : "w-4 h-4 mr-2"} />
              {!iconOnly && "Reset"}
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
            <Button
              onClick={handleConfirm}
              data-testid="button-reset-confirm"
              type="button"
            >
              Confirm
            </Button>
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
  iconOnly = false,
  showToast = true,
  toastTitle = "Cleared",
  toastDescription = "All inputs have been cleared",
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  hasModifiedData?: boolean;
  iconOnly?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    if (hasModifiedData) {
      setShowDialog(true);
    } else {
      onClick();
      if (showToast) {
        toast({ title: toastTitle, description: toastDescription });
      }
    }
  };

  const handleConfirm = useCallback(() => {
    onClick();
    setShowDialog(false);
    if (showToast) {
      toast({ title: toastTitle, description: toastDescription });
    }
  }, [onClick, showToast, toast, toastTitle, toastDescription]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={disabled}
              aria-disabled={disabled ? "true" : undefined}
              data-testid="clear-button"
              variant="outline"
              size={iconOnly ? "icon" : "default"}
              className="border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-800 dark:hover:text-rose-300"
            >
              <Trash2 className={iconOnly ? "w-4 h-4" : "w-4 h-4 mr-2"} />
              {!iconOnly && "Clear"}
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
            <Button
              onClick={handleConfirm}
              data-testid="button-clear-confirm"
              type="button"
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ShareButton({
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

export function NowButton({
  onClick,
  disabled,
  tooltip = "Set to current time",
  iconOnly = false,
  showToast = true,
  toastTitle = "Time updated",
  toastDescription = "Set to current time",
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  iconOnly?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
}) {
  const { toast } = useToast();

  const handleClick = () => {
    onClick();
    if (showToast) {
      toast({ title: toastTitle, description: toastDescription });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            disabled={disabled}
            data-testid="now-button"
            variant="outline"
            size={iconOnly ? "icon" : "default"}
            className="border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-800 dark:hover:text-sky-300"
          >
            <Clock className={iconOnly ? "w-4 h-4" : "w-4 h-4 mr-2"} />
            {!iconOnly && "Now"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ToolButtonGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ActionButtonGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  );
}

export function DataButtonGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  );
}
