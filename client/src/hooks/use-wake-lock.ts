import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A custom hook to manage a screen wake lock.
 *
 * @returns {Object} An object with a `wakeLockEnabled` boolean and a `toggleWakeLock` function.
 */
export const useWakeLock = () => {
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const request = useCallback(async () => {
    if (!("wakeLock" in navigator)) {
      console.warn("Screen Wake Lock API not supported");
      return;
    }
    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
      setIsLocked(true);
      wakeLock.current.addEventListener("release", () => {
        setIsLocked(false);
      });
    } catch (err) {
      console.error(`Wake Lock request failed: ${err}`);
      setIsLocked(false);
    }
  }, []);

  const release = useCallback(async () => {
    if (wakeLock.current) {
      await wakeLock.current.release();
      wakeLock.current = null;
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (wakeLock.current && document.visibilityState === "visible") {
        request();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleVisibilityChange);
      release();
    };
  }, [request, release]);

  return { isLocked, request, release };
};
