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
} from "lucide-react";
import {
  formatTimerTime,
  createTimerSound,
  playTimerBeep,
} from "@/lib/time-tools";
import { getParam, updateURL, copyShareableURL } from "@/lib/url-sharing";
import { useToast } from "@/hooks/use-toast";
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
}

export default function Timer() {
  const tool = getToolByPath("/tools/timer");
  // Default timer setup - 5 minutes as per STYLE.md requirement
  const [newTimerHours, setNewTimerHours] = useState(0);
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  const [newTimerSeconds, setNewTimerSeconds] = useState(0);
  const [newTimerName, setNewTimerName] = useState("");
  const [newTimerAlarmCount, setNewTimerAlarmCount] = useState(3);
  const [timers, setTimers] = useState<TimerInstance[]>([]);
  const [showAddTimer, setShowAddTimer] = useState(false);
  // Track which timers were paused by the global pause so we can resume only those
  const [pausedByGlobal, setPausedByGlobal] = useState<Set<string>>(new Set());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const alarmIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const { toast } = useToast();

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
    };

    setTimers(prev => [...prev, newTimer]);

    // Reset form
    setNewTimerName("");
    setNewTimerHours(0);
    setNewTimerMinutes(5);
    setNewTimerSeconds(0);
    setNewTimerAlarmCount(3);
    setShowAddTimer(false);

    // Update URL with latest timer
    updateURL({
      h: newTimerHours,
      m: newTimerMinutes,
      s: newTimerSeconds,
      name,
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
    toast,
  ]);

  const toggleTimer = useCallback((id: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.id === id
          ? { ...timer, isRunning: !timer.isRunning, isFinished: false }
          : timer
      )
    );
  }, []);

  const stopAllTimers = useCallback(() => {
    // Clear all alarms
    alarmIntervalsRef.current.forEach(handle => clearAlarmHandle(handle));
    alarmIntervalsRef.current.clear();

    setTimers(prev =>
      prev.map(timer => ({
        ...timer,
        isRunning: false,
        isFinished: false,
        currentAlarmPlays: 0,
      }))
    );
    // Clear any global paused tracking
    setPausedByGlobal(new Set());
  }, [clearAlarmHandle]);

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
  }, []);

  const continueAllTimers = useCallback(() => {
    setTimers(prev =>
      prev.map(timer =>
        pausedByGlobal.has(timer.id) && !timer.isFinished
          ? { ...timer, isRunning: true }
          : timer
      )
    );
    // Reset tracking after resuming
    setPausedByGlobal(new Set());
  }, [pausedByGlobal]);

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
  }, []);

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
      }))
    );

    // Clear global paused tracking
    setPausedByGlobal(new Set());
  }, [clearAlarmHandle]);

  // Initialize audio context and default timer
  useEffect(() => {
    audioContextRef.current = createTimerSound();

    // Capture ref value at effect start
    const intervals = alarmIntervalsRef.current;

    // Load from URL parameters or create default timer
    const urlHours = getParam("h", 0);
    const urlMinutes = getParam("m", 5);
    const urlSeconds = getParam("s", 0);
    const urlName = getParam("name", "");

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
        alarmCount: 3,
        currentAlarmPlays: 0,
      };
      setTimers([defaultTimer]);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      // Clear all alarm intervals using captured ref value
      intervals.forEach(interval => clearInterval(interval));
      intervals.clear();
    };
  }, [clearAlarmHandle]);

  // Main timer update loop
  useEffect(() => {
    if (timers.some(timer => timer.isRunning)) {
      intervalRef.current = setInterval(() => {
        setTimers(prevTimers =>
          prevTimers.map(timer => {
            if (!timer.isRunning || timer.timeLeft <= 0) return timer;

            const newTimeLeft = timer.timeLeft - 1;
            if (newTimeLeft <= 0) {
              // Timer finished
              startAlarm(timer);
              return {
                ...timer,
                timeLeft: 0,
                isRunning: false,
                isFinished: true,
              };
            }

            return { ...timer, timeLeft: newTimeLeft };
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
              }
            : timer
        )
      );
    },
    [clearAlarmHandle]
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
      copyShareableURL({ h: hours, m: minutes, s: seconds, name: timer.name });
    } else {
      copyShareableURL({
        h: newTimerHours,
        m: newTimerMinutes,
        s: newTimerSeconds,
      });
    }

    toast({
      title: "URL Copied",
      description: "Timer URL has been copied to clipboard",
    });
  }, [timers, newTimerHours, newTimerMinutes, newTimerSeconds, toast]);

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
    !showAddTimer;

  // Check if there's modified data
  const hasModifiedData = timers.length > 0 || showAddTimer;

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

            const allFinished =
              timers.every(t => t.isFinished);

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
        {timers.map(timer => (
          <Card
            key={timer.id}
            className={`transition-all ${timer.isFinished ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-950" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <TimerIcon className="w-5 h-5 mr-2" />
                  {timer.name}
                  {timer.isFinished ? (
                    <Badge variant="destructive" className="ml-2">
                      Finished
                    </Badge>
                  ) : null}
                  {timer.isRunning ? (
                    <Badge className="ml-2">Running</Badge>
                  ) : null}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Alarm: {getAlarmText(timer.alarmCount)}
                  </div>
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
              <div className="text-center space-y-4">
                <div
                  className={`text-6xl font-mono font-bold ${timer.isFinished ? "text-red-600" : "text-slate-900 dark:text-slate-100"}`}
                >
                  {formatTimerTime(timer.timeLeft)}
                </div>

                <div className="flex justify-center gap-2">
                  {!timer.isFinished ? (
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
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => stopTimer(timer.id)}
                        variant="outline"
                        data-testid={`reset-timer-${timer.id}`}
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                      {alarmIntervalsRef.current.has(timer.id) && (
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
                      )}
                    </div>
                  )}
                </div>

                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Original duration: {formatTimerTime(timer.duration)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
