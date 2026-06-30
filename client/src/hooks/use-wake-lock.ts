import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A custom hook to manage a screen wake lock.
 *
 * @returns An object with an `isLocked` boolean and `request`/`release` functions.
 */
export const useWakeLock = () => {
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const shouldHoldLock = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

  const request = useCallback(async () => {
    if (!("wakeLock" in navigator)) {
      console.warn("Screen Wake Lock API not supported");
      return;
    }

    shouldHoldLock.current = true;

    if (wakeLock.current || requestInFlight.current) {
      return;
    }

    requestInFlight.current = true;

    try {
      const sentinel = await navigator.wakeLock.request("screen");
      wakeLock.current = sentinel;
      setIsLocked(true);
      requestInFlight.current = false;

      sentinel.addEventListener(
        "release",
        () => {
          if (wakeLock.current === sentinel) {
            wakeLock.current = null;
            setIsLocked(false);
          }
        },
        { once: true }
      );
    } catch (err) {
      requestInFlight.current = false;
      console.error("Wake Lock request failed:", err);
      setIsLocked(false);
    }
  }, []);

  const release = useCallback(async () => {
    shouldHoldLock.current = false;

    if (!wakeLock.current) {
      setIsLocked(false);
      return;
    }

    try {
      await wakeLock.current.release();
    } catch {
      // ignore (it may have already been released by the browser)
    } finally {
      wakeLock.current = null;
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        shouldHoldLock.current &&
        !isLocked &&
        document.visibilityState === "visible"
      ) {
        void request();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleVisibilityChange);
      release();
    };
  }, [request, release, isLocked]);

  return { isLocked, request, release };
};
