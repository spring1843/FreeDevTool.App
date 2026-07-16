import { useState, useEffect, useRef, useCallback } from "react";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  Square,
  Plus,
  X,
  Timer as TimerIcon,
  VolumeX,
  Expand,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/providers/theme-provider";
import { PieChart, Pie, Cell } from "recharts";
import {
  formatTimerTime,
  createTimerSound,
  playTimerBeep,
  playMilestoneBeep,
} from "@/lib/time-tools";
import { getParam, updateURL, copyShareableURL } from "@/lib/url-sharing";
import { useToast } from "@/hooks/use-toast";
import { useWakeLock } from "@/hooks/use-wake-lock";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

interface TimerInstance {
  id: string;
  name: string;
  duration: number; // in seconds
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  alarmCount: number; // 1, 2, 3, or -1 for manual stop
  currentAlarmPlays: number;
  overrunEnabled: boolean; // keep counting negative after timer ends
  leadTime: number; // seconds to count down before timer starts
  leadTimeRemaining: number; // current lead time countdown
  beepAtQuartiles: boolean; // beep at 25%, 50%, 75% milestones
  quartilesBeeped: number[]; // which % milestones have beeped [25, 50, 75]
}

export default function Timer() {
  const tool = getToolByPath("/tools/timer");
  // Default timer setup - 5 minutes as per STYLE.md requirement
  const [newTimerHours, setNewTimerHours] = useState(0);
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  const [newTimerSeconds, setNewTimerSeconds] = useState(0);
  const [newTimerName, setNewTimerName] = useState("");
  const [newTimerAlarmCount, setNewTimerAlarmCount] = useState(3);
  const [newTimerOverrunEnabled, setNewTimerOverrunEnabled] = useState(false);
  const [newTimerLeadTime, setNewTimerLeadTime] = useState(5);
  const [newTimerBeepAtQuartiles, setNewTimerBeepAtQuartiles] = useState(true);
  const [timers, setTimers] = useState<TimerInstance[]>([]);
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [fullscreenTimerId, setFullscreenTimerId] = useState<string | null>(
    null
  );
  // Track which timers were paused by the global pause so we can resume only those
  const [pausedByGlobal, setPausedByGlobal] = useState<Set<string>>(new Set());
  // Track which timers are currently flashing red (milestone or finish)
  const [flashingTimers, setFlashingTimers] = useState<Set<string>>(new Set());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const alarmIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const flashClearTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const prevTimerStateRef = useRef<
    Map<string, { quartileLength: number; isFinished: boolean }>
  >(new Map());
  const { toast } = useToast();
  const { theme } = useTheme();
  const {
    isLocked,
    request: requestWakeLock,
    release: releaseWakeLock,
  } = useWakeLock();

  const toggleFullscreen = (id: string) => {
    if (fullscreenTimerId === id) {
      setFullscreenTimerId(null);
      if (document.fullscreenElement) {
        void document.exitFullscreen();
      }
    } else {
      setFullscreenTimerId(id);
    }
  };

  useEffect(() => {
    if (fullscreenTimerId) {
      const element = document.getElementById(
        `timer-card-${fullscreenTimerId}`
      );
      if (element && !document.fullscreenElement) {
        void element.requestFullscreen().catch(err => {
          console.error("Fullscreen request failed:", err);
          setFullscreenTimerId(null); // Reset on failure
        });
      }
    } else if (document.fullscreenElement) {
      void document.exitFullscreen();
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenTimerId(null);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [fullscreenTimerId]);

  // Effect to manage the wake lock
  useEffect(() => {
    const hasRunningTimers = timers.some(timer => timer.isRunning);

    if (hasRunningTimers) {
      void requestWakeLock();
    } else {
      void releaseWakeLock();
    }
  }, [timers, isLocked, requestWakeLock, releaseWakeLock]);

  // Clear any alarm handle (interval or timeout) robustly
  const clearAlarmHandle = useCallback((handle: NodeJS.Timeout) => {
    // In browsers, both clearInterval and clearTimeout accept the same handle id
    // Use both to be safe across environments/typings
    clearInterval(handle as unknown as number);
    clearTimeout(handle as unknown as number);
  }, []);

  // Define functions first before using them in effects
  const startAlarm = useCallback(
    (timer: TimerInstance) => {
      if (timer.alarmCount === -1) {
        // Manual stop mode - keep playing until user stops
        const playAlarm = () => {
          if (audioContextRef.current) {
            playTimerBeep(audioContextRef.current);
          }
        };

        playAlarm(); // Play immediately
        const alarmInterval = setInterval(playAlarm, 2000); // Every 2 seconds
        alarmIntervalsRef.current.set(timer.id, alarmInterval);

        toast({
          title: "Timer Finished!",
          description: `${timer.name} - Click stop to silence alarm`,
        });
      } else {
        // Limited plays mode: play immediately, then repeat every 2s until the selected count is reached
        const countSelected = timer.alarmCount;

        // Ensure audio context exists
        if (!audioContextRef.current) {
          audioContextRef.current = createTimerSound();
        }

        const ctx = audioContextRef.current;
        if (!ctx) return;

        // Ensure audio context is active on browsers that require user interaction
        if (
          typeof (ctx as unknown as { resume?: () => Promise<void> }).resume ===
          "function"
        ) {
          (ctx as unknown as { resume?: () => Promise<void> })
            .resume?.()
            .catch(() => undefined);
        }

        // Play once immediately
        playTimerBeep(ctx);

        // Remaining plays
        let remaining = Math.max(0, countSelected - 1);

        if (remaining > 0) {
          const intervalHandle = setInterval(() => {
            // Each tick plays once and decrements remaining
            if (!audioContextRef.current) return;
            playTimerBeep(audioContextRef.current);
            remaining -= 1;

            if (remaining <= 0) {
              clearAlarmHandle(intervalHandle as unknown as NodeJS.Timeout);
              alarmIntervalsRef.current.delete(timer.id);
            }
          }, 2000) as unknown as NodeJS.Timeout;

          // Track the handle so Stop Alarm can cancel
          alarmIntervalsRef.current.set(timer.id, intervalHandle);
        }

        toast({
          title: "Timer Finished!",
          description: `${timer.name} - Playing alarm ${countSelected} times`,
        });
      }
    },
    [toast, clearAlarmHandle]
  );

  const addTimer = useCallback(() => {
    if (newTimerHours === 0 && newTimerMinutes === 0 && newTimerSeconds === 0) {
      toast({
        title: "Invalid Timer",
        description: "Please set a duration greater than 0",
        variant: "destructive",
      });
      return;
    }

    const duration =
      newTimerHours * 3600 + newTimerMinutes * 60 + newTimerSeconds;
    const timeDisplay =
      newTimerHours > 0
        ? `${newTimerHours}:${newTimerMinutes.toString().padStart(2, "0")}:${newTimerSeconds.toString().padStart(2, "0")}`
        : `${newTimerMinutes}:${newTimerSeconds.toString().padStart(2, "0")}`;
    const name = newTimerName.trim() || `Timer ${timeDisplay}`;

    const newTimer: TimerInstance = {
      id: `timer-${Date.now()}`,
      name,
      duration,
      timeLeft: duration,
      isRunning: false,
      isFinished: false,
      alarmCount: newTimerAlarmCount,
      currentAlarmPlays: 0,
      overrunEnabled: newTimerOverrunEnabled,
      leadTime: newTimerLeadTime,
      leadTimeRemaining: newTimerLeadTime,
      beepAtQuartiles: newTimerBeepAtQuartiles,
      quartilesBeeped: [],
    };

    setTimers(prev => [...prev, newTimer]);

    // Reset form
    setNewTimerName("");
    setNewTimerHours(0);
    setNewTimerMinutes(5);
    setNewTimerSeconds(0);
    setNewTimerAlarmCount(3);
    setNewTimerOverrunEnabled(false);
    setNewTimerLeadTime(5);
    setNewTimerBeepAtQuartiles(true);
    setShowAddTimer(false);

    // Update URL with latest timer settings
    updateURL({
      h: newTimerHours,
      m: newTimerMinutes,
      s: newTimerSeconds,
      name,
      alarm: newTimerAlarmCount,
      overrun: newTimerOverrunEnabled,
      lead: newTimerLeadTime,
      beep: newTimerBeepAtQuartiles,
    });

    toast({
      title: "Timer Added",
      description: `Added ${name}`,
    });
  }, [
    newTimerHours,
    newTimerMinutes,
    newTimerSeconds,
    newTimerName,
    newTimerAlarmCount,
    newTimerOverrunEnabled,
    newTimerLeadTime,
    newTimerBeepAtQuartiles,
    toast,
  ]);

  const toggleTimer = useCallback(
    (id: string) => {
      const target = timers.find(t => t.id === id);
      const wasRunning = target?.isRunning ?? false;
      const wasFinished = target?.isFinished ?? false;
      const hasOverrun = target?.overrunEnabled ?? false;

      if (wasFinished && !hasOverrun) {
        // Non-overrun finished timer: restart from the beginning
        const handle = alarmIntervalsRef.current.get(id);
        if (handle) {
          clearAlarmHandle(handle);
          alarmIntervalsRef.current.delete(id);
        }
        setTimers(prev =>
          prev.map(timer =>
            timer.id === id
              ? {
                  ...timer,
                  isRunning: true,
                  isFinished: false,
                  timeLeft: timer.duration,
                  leadTimeRemaining: timer.leadTime,
                  quartilesBeeped: [],
                  currentAlarmPlays: 0,
                }
              : timer
          )
        );
        toast({
          title: "Timer Restarted",
          description: `${target?.name ?? "Timer"} restarted.`,
        });
      } else {
        // Normal toggle (running ↔ paused), or overrun timer pause/continue
        setTimers(prev =>
          prev.map(timer =>
            timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
          )
        );
        if (wasRunning) {
          toast({
            title: "Timer Paused",
            description: `${target?.name ?? "Timer"} paused.`,
          });
        } else {
          toast({
            title: wasFinished ? "Timer Continued" : "Timer Started",
            description: `${target?.name ?? "Timer"} ${wasFinished ? "continued" : "started"}.`,
          });
        }
      }
    },
    [timers, toast, clearAlarmHandle]
  );

  const stopAllTimers = useCallback(() => {
    // Clear all alarms
    alarmIntervalsRef.current.forEach(handle => clearAlarmHandle(handle));
    alarmIntervalsRef.current.clear();

    setTimers(prev =>
      prev.map(timer => ({
        ...timer,
        isRunning: false,
        isFinished: false,
        // Reset negative time from overrun
        timeLeft: timer.timeLeft < 0 ? timer.duration : timer.timeLeft,
        currentAlarmPlays: 0,
        quartilesBeeped: [],
      }))
    );
    // Clear any global paused tracking
    setPausedByGlobal(new Set());
    toast({
      title: "All Timers Stopped",
      description: "All timers have been stopped.",
    });
  }, [clearAlarmHandle, toast]);

  const pauseAllTimers = useCallback(() => {
    const idsPaused: string[] = [];
    setTimers(prev =>
      prev.map(timer => {
        if (timer.isRunning) {
          idsPaused.push(timer.id);
          return { ...timer, isRunning: false };
        }
        return timer;
      })
    );
    setPausedByGlobal(new Set(idsPaused));
    const count = idsPaused.length;
    toast({
      title: "Timers Paused",
      description:
        count > 0
          ? `Paused ${count} timer${count === 1 ? "" : "s"}.`
          : "No running timers to pause.",
    });
  }, [toast]);

  const continueAllTimers = useCallback(() => {
    setTimers(prev =>
      prev.map(timer =>
        pausedByGlobal.has(timer.id) &&
        (!timer.isFinished || timer.overrunEnabled)
          ? { ...timer, isRunning: true }
          : timer
      )
    );
    // Reset tracking after resuming
    setPausedByGlobal(new Set());
    const count = pausedByGlobal.size;
    toast({
      title: "Timers Resumed",
      description:
        count > 0
          ? `Resumed ${count} timer${count === 1 ? "" : "s"}.`
          : "No paused timers to resume.",
    });
  }, [pausedByGlobal, toast]);

  const startAllTimers = useCallback(() => {
    // Start all timers that haven't finished and have time remaining
    setTimers(prev =>
      prev.map(timer =>
        !timer.isFinished && timer.timeLeft > 0
          ? { ...timer, isRunning: true }
          : timer
      )
    );
    // Clear any global paused tracking just in case
    setPausedByGlobal(new Set());
    const count = timers.filter(t => !t.isFinished && t.timeLeft > 0).length;
    toast({
      title: "Timers Started",
      description:
        count > 0
          ? `Started ${count} timer${count === 1 ? "" : "s"}.`
          : "No timers available to start.",
    });
  }, [timers, toast]);

  const resetAllTimers = useCallback(() => {
    // Clear any alarms first
    alarmIntervalsRef.current.forEach(handle => clearAlarmHandle(handle));
    alarmIntervalsRef.current.clear();

    // Reset all timers to their original duration and stopped state
    setTimers(prev =>
      prev.map(timer => ({
        ...timer,
        isRunning: false,
        isFinished: false,
        timeLeft: timer.duration,
        currentAlarmPlays: 0,
        leadTimeRemaining: timer.leadTime,
        quartilesBeeped: [],
      }))
    );

    // Clear global paused tracking
    setPausedByGlobal(new Set());
    toast({
      title: "All Timers Reset",
      description: "Timers have been reset to their original durations.",
    });
  }, [clearAlarmHandle, toast]);

  // Initialize audio context and default timer
  useEffect(() => {
    audioContextRef.current = createTimerSound();

    // Capture ref values at effect start
    const intervals = alarmIntervalsRef.current;
    const flashTimeouts = flashClearTimeoutsRef.current;

    // Load from URL parameters or create default timer
    const urlHours = getParam("h", 0);
    const urlMinutes = getParam("m", 5);
    const urlSeconds = getParam("s", 0);
    const urlName = getParam("name", "");
    const urlOverrun = getParam("overrun", false);
    const urlLead = getParam("lead", 5);
    const urlBeep = getParam("beep", true);
    const urlAlarm = getParam("alarm", 3);

    if (urlHours > 0 || urlMinutes > 0 || urlSeconds > 0) {
      const duration = urlHours * 3600 + urlMinutes * 60 + urlSeconds;
      const defaultTimer: TimerInstance = {
        id: `timer-${Date.now()}`,
        name:
          urlName ||
          `Timer ${urlHours > 0 ? `${urlHours}:` : ""}${urlMinutes}:${urlSeconds.toString().padStart(2, "0")}`,
        duration,
        timeLeft: duration,
        isRunning: false, // Don't auto-start per STYLE.md for tools that make sound
        isFinished: false,
        alarmCount: urlAlarm,
        currentAlarmPlays: 0,
        overrunEnabled: urlOverrun,
        leadTime: urlLead,
        leadTimeRemaining: urlLead,
        beepAtQuartiles: urlBeep,
        quartilesBeeped: [],
      };
      setTimers([defaultTimer]);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      // Clear all alarm intervals using captured ref value
      intervals.forEach(interval => clearAlarmHandle(interval));
      intervals.clear();
      // Clear all flash timeouts using captured ref value
      flashTimeouts.forEach(t => clearTimeout(t as unknown as number));
      flashTimeouts.clear();
    };
  }, [clearAlarmHandle]);

  // Detect milestone/finish transitions and trigger a 1-second red flash
  useEffect(() => {
    timers.forEach(timer => {
      const prev = prevTimerStateRef.current.get(timer.id);
      const prevLen = prev?.quartileLength ?? 0;
      const prevFinished = prev?.isFinished ?? false;

      const justHitMilestone = timer.quartilesBeeped.length > prevLen;
      const justFinished = !prevFinished && timer.isFinished;

      if (justHitMilestone || justFinished) {
        // Cancel any in-progress flash clear for this timer
        const existing = flashClearTimeoutsRef.current.get(timer.id);
        if (existing) {
          clearTimeout(existing as unknown as number);
          flashClearTimeoutsRef.current.delete(timer.id);
        }

        setFlashingTimers(prev => new Set(Array.from(prev).concat(timer.id)));

        // Milestones clear after 1s; finished state stays red permanently via isFinished
        if (!justFinished) {
          const t = setTimeout(() => {
            setFlashingTimers(prev => {
              const next = new Set(prev);
              next.delete(timer.id);
              return next;
            });
            flashClearTimeoutsRef.current.delete(timer.id);
          }, 1000) as unknown as NodeJS.Timeout;
          flashClearTimeoutsRef.current.set(timer.id, t);
        }
      }

      prevTimerStateRef.current.set(timer.id, {
        quartileLength: timer.quartilesBeeped.length,
        isFinished: timer.isFinished,
      });
    });
  }, [timers]);

  // Main timer update loop
  useEffect(() => {
    if (timers.some(timer => timer.isRunning)) {
      intervalRef.current = setInterval(() => {
        setTimers(prevTimers =>
          prevTimers.map(timer => {
            if (!timer.isRunning) return timer;

            // Lead time countdown: count down before the main timer starts
            if (timer.leadTimeRemaining > 0) {
              const newLeadTimeRemaining = timer.leadTimeRemaining - 1;
              if (newLeadTimeRemaining === 0 && audioContextRef.current) {
                // Signal that the timer is about to start
                playTimerBeep(audioContextRef.current);
              }
              return { ...timer, leadTimeRemaining: newLeadTimeRemaining };
            }

            // Overrun: keep counting negative after the timer has finished
            if (timer.isFinished && timer.overrunEnabled) {
              return { ...timer, timeLeft: timer.timeLeft - 1 };
            }

            // Normal timer: guard against already-expired timer
            if (timer.timeLeft <= 0) return timer;

            const newTimeLeft = timer.timeLeft - 1;

            // Check quartile milestones (only for timers long enough to matter)
            let updatedQuartilesBeeped = timer.quartilesBeeped;
            if (timer.beepAtQuartiles && timer.duration >= 4) {
              const milestones = [
                { pct: 25, threshold: Math.round(timer.duration * 0.75) },
                { pct: 50, threshold: Math.round(timer.duration * 0.5) },
                { pct: 75, threshold: Math.round(timer.duration * 0.25) },
              ];
              for (const { pct, threshold } of milestones) {
                if (
                  threshold > 0 &&
                  newTimeLeft <= threshold &&
                  !timer.quartilesBeeped.includes(pct)
                ) {
                  updatedQuartilesBeeped = [...updatedQuartilesBeeped, pct];
                  if (audioContextRef.current) {
                    playMilestoneBeep(audioContextRef.current);
                  }
                  break; // Only one milestone beep per tick
                }
              }
            }

            if (newTimeLeft <= 0) {
              // Timer finished
              startAlarm(timer);
              if (timer.overrunEnabled) {
                // Keep running, counting negative
                return {
                  ...timer,
                  timeLeft: 0,
                  isFinished: true,
                  isRunning: true,
                  quartilesBeeped: updatedQuartilesBeeped,
                };
              }
              return {
                ...timer,
                timeLeft: 0,
                isRunning: false,
                isFinished: true,
                quartilesBeeped: updatedQuartilesBeeped,
              };
            }

            return {
              ...timer,
              timeLeft: newTimeLeft,
              quartilesBeeped: updatedQuartilesBeeped,
            };
          })
        );
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timers, startAlarm]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (!showAddTimer) {
            addTimer();
          }
          break;
        case " ":
          event.preventDefault();
          // Toggle the first timer if any exists
          if (timers.length > 0) {
            toggleTimer(timers[0].id);
          }
          break;
        case "Escape":
          event.preventDefault();
          stopAllTimers();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [timers, showAddTimer, addTimer, toggleTimer, stopAllTimers]);

  // Additional timer functions
  const stopTimer = useCallback(
    (id: string) => {
      // Stop alarm if playing
      const alarmHandle = alarmIntervalsRef.current.get(id);
      if (alarmHandle) {
        clearAlarmHandle(alarmHandle);
        alarmIntervalsRef.current.delete(id);
      }

      setTimers(prev =>
        prev.map(timer =>
          timer.id === id
            ? {
                ...timer,
                isRunning: false,
                isFinished: false,
                timeLeft: timer.duration,
                currentAlarmPlays: 0,
                leadTimeRemaining: timer.leadTime,
                quartilesBeeped: [],
              }
            : timer
        )
      );
      const t = timers.find(x => x.id === id);
      toast({
        title: "Timer Reset",
        description: `${t?.name ?? "Timer"} reset to original duration.`,
      });
    },
    [clearAlarmHandle, timers, toast]
  );

  const removeTimer = useCallback(
    (id: string) => {
      // Stop alarm if playing
      const alarmHandle = alarmIntervalsRef.current.get(id);
      if (alarmHandle) {
        clearAlarmHandle(alarmHandle);
        alarmIntervalsRef.current.delete(id);
      }

      setTimers(prev => prev.filter(timer => timer.id !== id));
    },
    [clearAlarmHandle]
  );

  const copyShareURL = useCallback(() => {
    if (timers.length > 0) {
      const timer = timers[0];
      const hours = Math.floor(timer.duration / 3600);
      const minutes = Math.floor((timer.duration % 3600) / 60);
      const seconds = timer.duration % 60;
      copyShareableURL({
        h: hours,
        m: minutes,
        s: seconds,
        name: timer.name,
        alarm: timer.alarmCount,
        overrun: timer.overrunEnabled,
        lead: timer.leadTime,
        beep: timer.beepAtQuartiles,
      });
    } else {
      copyShareableURL({
        h: newTimerHours,
        m: newTimerMinutes,
        s: newTimerSeconds,
        alarm: newTimerAlarmCount,
        overrun: newTimerOverrunEnabled,
        lead: newTimerLeadTime,
        beep: newTimerBeepAtQuartiles,
      });
    }

    toast({
      title: "URL Copied",
      description: "Timer URL has been copied to clipboard",
    });
  }, [
    timers,
    newTimerHours,
    newTimerMinutes,
    newTimerSeconds,
    newTimerAlarmCount,
    newTimerOverrunEnabled,
    newTimerLeadTime,
    newTimerBeepAtQuartiles,
    toast,
  ]);

  const getTimerTextColor = (
    flashing: boolean,
    isFinished: boolean,
    isRunning: boolean,
    leadTimeRemaining: number
  ) => {
    if (flashing || (isFinished && !isRunning)) return "text-red-600";
    if (leadTimeRemaining > 0) return "text-slate-400 dark:text-slate-500";
    return "text-slate-900 dark:text-slate-100";
  };

  const getAlarmText = (count: number) => {
    switch (count) {
      case 1:
        return "1 time";
      case 2:
        return "2 times";
      case 3:
        return "3 times";
      case -1:
        return "Until stopped";
      default:
        return `${count} times`;
    }
  };

  // Timer presets for common use cases
  const timerPresets = [
    { name: "Coffee Break", hours: 0, minutes: 5, seconds: 0 },
    { name: "Meditation", hours: 0, minutes: 10, seconds: 0 },
    { name: "Study Block", hours: 0, minutes: 25, seconds: 0 },
    { name: "Short Break", hours: 0, minutes: 15, seconds: 0 },
    { name: "Workout", hours: 0, minutes: 30, seconds: 0 },
    { name: "Lunch Break", hours: 1, minutes: 0, seconds: 0 },
    { name: "Long Focus", hours: 1, minutes: 30, seconds: 0 },
    { name: "Power Nap", hours: 0, minutes: 20, seconds: 0 },
  ];

  const applyPreset = (preset: (typeof timerPresets)[0]) => {
    setNewTimerHours(preset.hours);
    setNewTimerMinutes(preset.minutes);
    setNewTimerSeconds(preset.seconds);
    setNewTimerName(preset.name);
    setShowAddTimer(true);
  };

  // Reset to default add-timer form values
  const handleReset = () => {
    setNewTimerHours(0);
    setNewTimerMinutes(5);
    setNewTimerSeconds(0);
    setNewTimerName("");
    setNewTimerAlarmCount(3);
    setNewTimerOverrunEnabled(false);
    setNewTimerLeadTime(5);
    setNewTimerBeepAtQuartiles(true);
    setShowAddTimer(false);
    toast({
      title: "Reset",
      description: "Timer form reset to defaults",
    });
  };

  // Clear all timers
  const handleClear = () => {
    stopAllTimers();
    setTimers([]);
    toast({
      title: "Cleared",
      description: "All timers have been removed",
    });
  };

  // Check if form is at default values
  const isAtDefault =
    newTimerHours === 0 &&
    newTimerMinutes === 5 &&
    newTimerSeconds === 0 &&
    newTimerName === "" &&
    newTimerAlarmCount === 3 &&
    newTimerLeadTime === 5 &&
    !newTimerOverrunEnabled &&
    newTimerBeepAtQuartiles &&
    !showAddTimer;

  // Check if there's modified data
  const hasModifiedData = timers.length > 0 || showAddTimer;

  const fullscreenTimer = timers.find(t => t.id === fullscreenTimerId);

  if (fullscreenTimer) {
    const fsPercent =
      fullscreenTimer.duration > 0 && fullscreenTimer.leadTimeRemaining === 0
        ? Math.min(
            100,
            Math.round(
              ((fullscreenTimer.duration -
                Math.max(0, fullscreenTimer.timeLeft)) /
                fullscreenTimer.duration) *
                100
            )
          )
        : 0;
    const fsIsFlashing = flashingTimers.has(fullscreenTimer.id);
    let fsProgressColor = theme === "dark" ? "#3b82f6" : "#2563eb";
    if (fullscreenTimer.isFinished || fsIsFlashing) fsProgressColor = "#ef4444";
    else if (fullscreenTimer.leadTimeRemaining > 0) fsProgressColor = "#f59e0b";
    const fsTrackColor = theme === "dark" ? "#334155" : "#e2e8f0";

    return (
      <div
        id={`timer-card-${fullscreenTimer.id}`}
        className="bg-white dark:bg-black w-screen h-screen flex flex-col items-center justify-center gap-10"
      >
        <div className="relative flex-shrink-0">
          <PieChart
            width={260}
            height={260}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Pie
              data={[
                { value: fsPercent },
                { value: Math.max(0, 100 - fsPercent) },
              ]}
              cx={130}
              cy={130}
              innerRadius={80}
              outerRadius={118}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={fsProgressColor} />
              <Cell fill={fsTrackColor} />
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <span className="text-5xl font-bold font-mono text-slate-900 dark:text-slate-100">
              {fsPercent}%
            </span>
          </div>
        </div>
        <div className="text-center space-y-4">
          <div className="text-[20rem] leading-none font-mono font-bold text-slate-900 dark:text-slate-100">
            {fullscreenTimer.timeLeft < 0 ? "-" : ""}
            {formatTimerTime(Math.abs(fullscreenTimer.timeLeft))}
          </div>
          <div className="text-5xl text-slate-600 dark:text-slate-400">
            {fullscreenTimer.name}
          </div>
          <Button onClick={() => toggleFullscreen(fullscreenTimer.id)}>
            Exit Fullscreen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Timer
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Create multiple timers with customizable alarms. Use Enter, Space,
              and Escape for quick control.
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <Button
            onClick={() => setShowAddTimer(!showAddTimer)}
            data-testid="add-timer-toggle"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
          {(() => {
            // Decide which global action button to render without nested ternaries
            if (timers.length === 0) return null;

            const noneStarted = timers.every(
              t => !t.isRunning && !t.isFinished && t.timeLeft === t.duration
            );

            const allFinished = timers.every(t => t.isFinished && !t.isRunning);

            if (noneStarted) {
              return (
                <Button
                  onClick={startAllTimers}
                  variant="outline"
                  data-testid="start-all-timers"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start All
                </Button>
              );
            }

            if (allFinished) {
              return (
                <Button
                  onClick={resetAllTimers}
                  variant="outline"
                  data-testid="reset-all-timers"
                >
                  <Square className="w-4 h-4 mr-1" />
                  Reset All
                </Button>
              );
            }

            if (pausedByGlobal.size > 0) {
              return (
                <Button
                  onClick={continueAllTimers}
                  variant="outline"
                  data-testid="continue-all-timers"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Continue All
                </Button>
              );
            }

            return (
              <Button
                onClick={pauseAllTimers}
                variant="outline"
                data-testid="pause-all-timers"
              >
                <Pause className="w-4 h-4 mr-1" />
                Pause All
              </Button>
            );
          })()}
          <ToolButton
            variant="share"
            onClick={copyShareURL}
            tooltip="Copy shareable timer URL"
          />
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset timer form to defaults"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Remove all timers"
            hasModifiedData={hasModifiedData}
            disabled={timers.length === 0}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {/* Add Timer Form */}
      {showAddTimer ? (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="timer-name">Timer Name (Optional)</Label>
                <Input
                  id="timer-name"
                  placeholder="e.g., Coffee break"
                  value={newTimerName}
                  onChange={e => setNewTimerName(e.target.value)}
                  data-testid="timer-name-input"
                  data-default-input="true"
                  autoFocus={true}
                />
              </div>

              <div>
                <Label htmlFor="timer-hours">Hours</Label>
                <Input
                  id="timer-hours"
                  type="number"
                  min="0"
                  max="23"
                  value={newTimerHours}
                  onChange={e =>
                    setNewTimerHours(parseInt(e.target.value, 10) || 0)
                  }
                  data-testid="timer-hours-input"
                />
              </div>

              <div>
                <Label htmlFor="timer-minutes">Minutes</Label>
                <Input
                  id="timer-minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={newTimerMinutes}
                  onChange={e =>
                    setNewTimerMinutes(parseInt(e.target.value, 10) || 0)
                  }
                  data-testid="timer-minutes-input"
                />
              </div>

              <div>
                <Label htmlFor="timer-seconds">Seconds</Label>
                <Input
                  id="timer-seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={newTimerSeconds}
                  onChange={e =>
                    setNewTimerSeconds(parseInt(e.target.value, 10) || 0)
                  }
                  data-testid="timer-seconds-input"
                />
              </div>

              <div>
                <Label htmlFor="alarm-count">Alarm Plays</Label>
                <Select
                  value={newTimerAlarmCount.toString()}
                  onValueChange={value =>
                    setNewTimerAlarmCount(parseInt(value, 10))
                  }
                >
                  <SelectTrigger data-testid="alarm-count-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 time</SelectItem>
                    <SelectItem value="2">2 times</SelectItem>
                    <SelectItem value="3">3 times</SelectItem>
                    <SelectItem value="-1">Until stopped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Duration: {newTimerHours > 0 ? `${newTimerHours}:` : ""}
                {newTimerMinutes}:{newTimerSeconds.toString().padStart(2, "0")}{" "}
                • Alarm: {getAlarmText(newTimerAlarmCount)}
              </div>
            </div>

            {/* Extra per-timer options */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="lead-time">Lead Time (seconds)</Label>
                <Input
                  id="lead-time"
                  type="number"
                  min="0"
                  max="3600"
                  value={newTimerLeadTime}
                  onChange={e =>
                    setNewTimerLeadTime(
                      Math.max(0, parseInt(e.target.value, 10) || 0)
                    )
                  }
                  data-testid="lead-time-input"
                  placeholder="0"
                />
              </div>

              <div className="flex items-start gap-3 pt-5">
                <Switch
                  id="overrun-enabled"
                  checked={newTimerOverrunEnabled}
                  onCheckedChange={setNewTimerOverrunEnabled}
                  data-testid="overrun-switch"
                />
                <div>
                  <Label htmlFor="overrun-enabled" className="cursor-pointer">
                    Count past zero
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Continue as -00:01, -00:02…
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-5">
                <Switch
                  id="beep-quartiles"
                  checked={newTimerBeepAtQuartiles}
                  onCheckedChange={setNewTimerBeepAtQuartiles}
                  data-testid="beep-quartiles-switch"
                />
                <div>
                  <Label htmlFor="beep-quartiles" className="cursor-pointer">
                    Beep at milestones
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Beep at 25%, 50%, 75% elapsed
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={addTimer} data-testid="add-timer-confirm">
                <Plus className="w-4 h-4 mr-2" />
                Add Timer
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Active Timers */}
      <div className="space-y-4">
        {timers.map(timer => {
          const percentComplete =
            timer.duration > 0 && timer.leadTimeRemaining === 0
              ? Math.min(
                  100,
                  Math.round(
                    ((timer.duration - Math.max(0, timer.timeLeft)) /
                      timer.duration) *
                      100
                  )
                )
              : 0;
          const isFlashing = flashingTimers.has(timer.id);
          let progressColor = theme === "dark" ? "#3b82f6" : "#2563eb";
          if (isFlashing || (timer.isFinished && !timer.isRunning))
            progressColor = "#ef4444";
          else if (timer.leadTimeRemaining > 0) progressColor = "#f59e0b";
          const trackColor = theme === "dark" ? "#334155" : "#e2e8f0";

          return (
            <Card
              key={timer.id}
              id={`timer-card-${timer.id}`}
              className={`transition-all ${timer.isFinished ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-950" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <TimerIcon className="w-5 h-5 mr-2" />
                    {timer.name}
                    {(() => {
                      if (timer.isFinished) {
                        if (timer.overrunEnabled && timer.isRunning) {
                          return (
                            <Badge variant="destructive" className="ml-2">
                              Overtime
                            </Badge>
                          );
                        }
                        return (
                          <Badge variant="destructive" className="ml-2">
                            Finished
                          </Badge>
                        );
                      }
                      if (timer.isRunning && timer.leadTimeRemaining > 0) {
                        return (
                          <Badge className="ml-2 bg-amber-500 hover:bg-amber-500">
                            Starting
                          </Badge>
                        );
                      }
                      if (timer.isRunning) {
                        return <Badge className="ml-2">Running</Badge>;
                      }
                      return null;
                    })()}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Alarm: {getAlarmText(timer.alarmCount)}
                    </div>
                    <Button
                      onClick={() => toggleFullscreen(timer.id)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      data-testid={`fullscreen-timer-${timer.id}`}
                    >
                      <Expand className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => removeTimer(timer.id)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                      data-testid={`remove-timer-${timer.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Donut chart with time inside */}
                  <div className="flex justify-center">
                    <div className="relative flex-shrink-0">
                      <PieChart
                        width={240}
                        height={240}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <Pie
                          data={[
                            { value: percentComplete },
                            { value: Math.max(0, 100 - percentComplete) },
                          ]}
                          cx={120}
                          cy={120}
                          innerRadius={88}
                          outerRadius={112}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          <Cell fill={progressColor} />
                          <Cell fill={trackColor} />
                        </Pie>
                      </PieChart>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                        {timer.isRunning && timer.leadTimeRemaining > 0 ? (
                          <div className="text-6xl font-mono font-bold text-amber-500 dark:text-amber-400">
                            {timer.leadTimeRemaining}
                          </div>
                        ) : (
                          <div
                            className={`text-6xl font-mono font-bold ${getTimerTextColor(isFlashing, timer.isFinished, timer.isRunning, timer.leadTimeRemaining)}`}
                          >
                            {timer.timeLeft < 0 ? "-" : ""}
                            {formatTimerTime(Math.abs(timer.timeLeft))}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-[calc(50%+2.4rem)] left-1/2 -translate-x-1/2 pointer-events-none text-center">
                        <span
                          className={`text-base font-mono ${
                            isFlashing || (timer.isFinished && !timer.isRunning)
                              ? "text-red-500"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {percentComplete}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex justify-center gap-2">
                    {(() => {
                      if (!timer.isFinished) {
                        return (
                          <Button
                            onClick={() => toggleTimer(timer.id)}
                            data-testid={`toggle-timer-${timer.id}`}
                          >
                            {timer.isRunning ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                {timer.timeLeft < timer.duration
                                  ? "Continue"
                                  : "Start"}
                              </>
                            )}
                          </Button>
                        );
                      }
                      const stopAlarmButton = alarmIntervalsRef.current.has(
                        timer.id
                      ) ? (
                        <Button
                          onClick={() => {
                            const handle = alarmIntervalsRef.current.get(
                              timer.id
                            );
                            if (handle) {
                              clearAlarmHandle(handle);
                              alarmIntervalsRef.current.delete(timer.id);
                            }
                          }}
                          variant="destructive"
                          data-testid={`stop-alarm-${timer.id}`}
                        >
                          <VolumeX className="w-4 h-4 mr-2" />
                          Stop Alarm
                        </Button>
                      ) : null;
                      return (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => stopTimer(timer.id)}
                            variant="outline"
                            data-testid={`reset-timer-${timer.id}`}
                          >
                            <Square className="w-4 h-4 mr-2" />
                            Reset
                          </Button>
                          {stopAlarmButton}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Original duration: {formatTimerTime(timer.duration)}
                    {timer.leadTime > 0 ? ` • Lead: ${timer.leadTime}s` : ""}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {timers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TimerIcon className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No Timers Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Create your first timer to get started. Default is 5 minutes.
            </p>
            <Button onClick={() => setShowAddTimer(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Timer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Timer Presets */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timerPresets.map(preset => (
              <Button
                key={preset.name}
                variant="outline"
                onClick={() => applyPreset(preset)}
                className="h-auto p-3 text-left flex flex-col items-start"
                data-testid={`preset-${preset.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="font-medium text-sm">{preset.name}</div>
                <div className="text-xs text-slate-500">
                  {preset.hours > 0
                    ? `${preset.hours}:${preset.minutes.toString().padStart(2, "0")}:${preset.seconds.toString().padStart(2, "0")}`
                    : `${preset.minutes}:${preset.seconds.toString().padStart(2, "0")}`}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
