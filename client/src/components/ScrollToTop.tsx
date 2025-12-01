import { useEffect } from "react";
import { useLocation } from "wouter";

// Scroll to top on navigation unless the location contains a hash (lets browser handle anchor navigation).
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
