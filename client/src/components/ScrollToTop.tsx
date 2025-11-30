import { useEffect } from "react";
import { useLocation } from "wouter";

// Scroll to top on pathname changes. Ignores hash-only changes.
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If navigating with a hash-only change, let browser handle anchor
    // Otherwise, scroll to top instantly to avoid landing mid-page
    if (typeof location === "string" && location.includes("#")) return;
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);

  return null;
}
