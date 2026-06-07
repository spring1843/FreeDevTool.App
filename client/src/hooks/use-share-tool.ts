import { useToast } from "@/hooks/use-toast";

/**
 * Returns a handleShare function that copies the current page URL to the
 * clipboard and shows a toast notification. Used by all tool pages.
 */
export function useShareTool() {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Tool URL copied to clipboard",
      });
    } catch {
      toast({
        title: "Share failed",
        description: "Could not copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  return { handleShare };
}
