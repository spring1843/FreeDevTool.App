import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

// Scroll to top on pathname changes. Ignores hash-only changes.
export function ScrollToTop() {
  const [location] = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    const prevLocation = prevLocationRef.current;
    const currentPathname =
      typeof location === "string" ? location.split("?")[0] : "";
    const prevPathname =
      typeof prevLocation === "string" ? prevLocation.split("?")[0] : "";

    // Only scroll if the pathname changed (not just query params or hash)
    if (currentPathname !== prevPathname) {
      window.scrollTo({ top: 0, left: 0 });
    }

    prevLocationRef.current = location;
  }, [location]);

  return null;
}
