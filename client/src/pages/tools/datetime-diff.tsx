import { useState, useMemo } from "react";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Calculator, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResetButton,
  ClearButton,
  NowButton,
  ToolButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { useToast } from "@/hooks/use-toast";
import { usePersistentForm } from "@/hooks/use-persistent-state";
import { getUserTimezone } from "@/lib/time-tools";

interface DateTimeDifference {
  totalMilliseconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalYears: number;

  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export default function DateTimeDiff() {
  const tool = getToolByPath("/tools/datetime-diff");
  const formatCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return { date, time };
  };

  // Set interesting default values
  const getDefaultValues = () => {
    const { date, time } = formatCurrentDateTime();
    // end time is 1 hour after time
    const endTime = new Date(new Date().setHours(new Date().getHours() + 1))
      .toTimeString()
      .slice(0, 5);
    return {
      startDate: date,
      startTime: time,
      endDate: date,
      endTime,
      timezone: getUserTimezone(),
    };
  };

  const { fields, updateField, updateFields } = usePersistentForm(
    "datetime-diff",
    getDefaultValues()
  );
  const [copiedField, setCopiedField] = useState<string>("");

  const { toast } = useToast();

  // Preset configurations for time differences
  const presets = [
    // Quick intervals
    { label: "5 minutes from now", minutes: 5 },
    { label: "1 hour from now", hours: 1 },
    { label: "1 day from now", days: 1 },
    { label: "1 week from now", days: 7 },
    { label: "1 month from now", days: 30 },
    { label: "1 year from now", days: 365 },

    // Historical dates
    {
      label: "From year 1 AD to now",
      type: "historical",
      startDate: "0001-01-01",
      startTime: "00:00",
    },
    {
      label: "From year 1000 to now",
      type: "historical",
      startDate: "1000-01-01",
      startTime: "00:00",
    },
    {
      label: "From Unix epoch to now",
      type: "historical",
      startDate: "1970-01-01",
      startTime: "00:00",
    },
    {
      label: "From Y2K to now",
      type: "historical",
      startDate: "2000-01-01",
      startTime: "00:00",
    },
    {
      label: "From 2010 to now",
      type: "historical",
      startDate: "2010-01-01",
      startTime: "00:00",
    },

    // Far future
    { label: "100 years from now", days: 36525 },
    { label: "500 years from now", days: 182625 },
    { label: "1000 years from now", days: 365250 },
    {
      label: "To year 3000",
      type: "future",
      endDate: "3000-01-01",
      endTime: "00:00",
    },
    {
      label: "To year 10000",
      type: "future",
      endDate: "10000-01-01",
      endTime: "00:00",
    },
  ];

  // Apply preset function
  const applyPreset = (preset: (typeof presets)[0]) => {
    const now = new Date();
    const nowDate = now.toISOString().split("T")[0];
    const nowTime = now.toTimeString().slice(0, 5);

    let startDate = nowDate;
    let startTime = nowTime;
    let endDate = nowDate;
    let endTime = nowTime;

    if (preset.type === "historical") {
      // Historical presets: from specific date to now
      startDate = preset.startDate!;
      startTime = preset.startTime!;
      endDate = nowDate;
      endTime = nowTime;
    } else if (preset.type === "future") {
      // Future presets: from now to specific date
      startDate = nowDate;
      startTime = nowTime;
      endDate = preset.endDate!;
      endTime = preset.endTime!;
    } else {
      // Relative presets: from now to future date
      const future = new Date(now);
      if (preset.minutes)
        future.setMinutes(future.getMinutes() + preset.minutes);
      if (preset.hours) future.setHours(future.getHours() + preset.hours);
      if (preset.days) future.setDate(future.getDate() + preset.days);

      startDate = nowDate;
      startTime = nowTime;
      endDate = future.toISOString().split("T")[0];
      endTime = future.toTimeString().slice(0, 5);
    }

    updateField("startDate", startDate);
    updateField("startTime", startTime);
    updateField("endDate", endDate);
    updateField("endTime", endTime);

    toast({
      title: "Preset Applied",
      description: `Set to calculate difference for "${preset.label}"`,
    });
  };

  // Calculate the difference between two dates
  const calculateDifference = (start: Date, end: Date): DateTimeDifference => {
    const diffMs = Math.abs(end.getTime() - start.getTime());

    // Calculate total units
    const totalMilliseconds = diffMs;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Approximate months and years
    const totalMonths = Math.floor(totalDays / 30.44); // Average days per month
    const totalYears = Math.floor(totalDays / 365.25); // Average days per year

    // Calculate precise breakdown
    let tempMs = diffMs;

    const years = Math.floor(tempMs / (1000 * 60 * 60 * 24 * 365.25));
    tempMs -= years * (1000 * 60 * 60 * 24 * 365.25);

    const months = Math.floor(tempMs / (1000 * 60 * 60 * 24 * 30.44));
    tempMs -= months * (1000 * 60 * 60 * 24 * 30.44);

    const weeks = Math.floor(tempMs / (1000 * 60 * 60 * 24 * 7));
    tempMs -= weeks * (1000 * 60 * 60 * 24 * 7);

    const days = Math.floor(tempMs / (1000 * 60 * 60 * 24));
    tempMs -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(tempMs / (1000 * 60 * 60));
    tempMs -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(tempMs / (1000 * 60));
    tempMs -= minutes * (1000 * 60);

    const seconds = Math.floor(tempMs / 1000);
    const milliseconds = tempMs % 1000;

    return {
      totalMilliseconds,
      totalSeconds,
      totalMinutes,
      totalHours,
      totalDays,
      totalWeeks,
      totalMonths,
      totalYears,
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  // Parse date and time inputs
  const parseDateTime = (dateStr: string, timeStr: string): Date | null => {
    if (!dateStr) return null;

    const timeValue = timeStr || "00:00";
    const dateTimeStr = `${dateStr}T${timeValue}`;

    try {
      const date = new Date(dateTimeStr);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  // Calculate difference
  const difference = useMemo(() => {
    const start = parseDateTime(fields.startDate, fields.startTime);
    const end = parseDateTime(fields.endDate, fields.endTime);

    if (!start || !end) return null;

    return calculateDifference(start, end);
  }, [fields.startDate, fields.startTime, fields.endDate, fields.endTime]);

  // Set current date/time
  const setCurrentDateTime = (field: "start" | "end") => {
    const { date, time } = formatCurrentDateTime();
    if (field === "start") {
      updateFields({
        startDate: date,
        startTime: time,
      });
    } else {
      updateFields({
        endDate: date,
        endTime: time,
      });
    }
  };

  // Copy value to clipboard
  const copyToClipboard = async (value: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2000);

      toast({
        title: "Copied to Clipboard",
        description: `${fieldName} copied successfully.`,
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Clear all inputs – for this tool "Clear" means make date inputs empty so users start fresh
  const clearAll = () => {
    updateFields({
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
  };

  // Modified if any date field has content; clear sets them empty which should disable Clear button per tests
  const hasModifiedData =
    fields.startDate.trim() !== "" ||
    fields.endDate.trim() !== "" ||
    fields.startTime.trim() !== "" ||
    fields.endTime.trim() !== "";
  // Reset should be disabled when we're already at initial defaults (all fields equal their mount-time defaults)
  const isAtDefault =
    fields.startDate === getDefaultValues().startDate &&
    fields.startTime === getDefaultValues().startTime &&
    fields.endDate === getDefaultValues().endDate &&
    fields.endTime === getDefaultValues().endTime;

  // Format large numbers with commas
  const formatNumber = (num: number): string =>
    Math.floor(num).toLocaleString();

  // Get readable duration string
  const getReadableDuration = (diff: DateTimeDifference): string => {
    const parts = [];

    if (diff.years > 0)
      parts.push(`${diff.years} year${diff.years !== 1 ? "s" : ""}`);
    if (diff.months > 0)
      parts.push(`${diff.months} month${diff.months !== 1 ? "s" : ""}`);
    if (diff.weeks > 0)
      parts.push(`${diff.weeks} week${diff.weeks !== 1 ? "s" : ""}`);
    if (diff.days > 0)
      parts.push(`${diff.days} day${diff.days !== 1 ? "s" : ""}`);
    if (diff.hours > 0)
      parts.push(`${diff.hours} hour${diff.hours !== 1 ? "s" : ""}`);
    if (diff.minutes > 0)
      parts.push(`${diff.minutes} minute${diff.minutes !== 1 ? "s" : ""}`);
    if (diff.seconds > 0 && parts.length < 3)
      parts.push(`${diff.seconds} second${diff.seconds !== 1 ? "s" : ""}`);

    if (parts.length === 0) return "0 seconds";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;

    return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Date & Time Difference Calculator
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Calculate the precise difference between two dates and times with
              detailed breakdowns. Explore fascinating time spans from
              historical dates to far future dates.
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Start Date/Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Start Date & Time
                </div>
                <NowButton
                  onClick={() => setCurrentDateTime("start")}
                  tooltip="Set start to current time"
                  toastTitle="Start time updated"
                  toastDescription="Set to current date and time"
                  iconOnly
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={fields.startDate}
                    onChange={e => updateField("startDate", e.target.value)}
                    data-testid="start-date-input"
                    data-default-input="true"
                    autoFocus={true}
                  />
                </div>
                <div>
                  <Label htmlFor="start-time">Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    step="1"
                    value={fields.startTime}
                    onChange={e => updateField("startTime", e.target.value)}
                    data-testid="start-time-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* End Date/Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  End Date & Time
                </div>
                <NowButton
                  onClick={() => setCurrentDateTime("end")}
                  tooltip="Set end to current time"
                  toastTitle="End time updated"
                  toastDescription="Set to current date and time"
                  iconOnly
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="end-date">Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={fields.endDate}
                    onChange={e => updateField("endDate", e.target.value)}
                    data-testid="end-date-input"
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    step="1"
                    value={fields.endTime}
                    onChange={e => updateField("endTime", e.target.value)}
                    data-testid="end-time-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Quick Presets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Quick Intervals */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Quick Future Intervals
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {presets
                      .filter(p => !p.type)
                      .map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => applyPreset(preset)}
                          className="text-xs h-8"
                          data-testid={`preset-quick-${index}`}
                        >
                          {preset.label.replace(" from now", "")}
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Historical */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Historical Periods
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {presets
                      .filter(p => p.type === "historical")
                      .map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => applyPreset(preset)}
                          className="text-xs h-8"
                          data-testid={`preset-historical-${index}`}
                        >
                          {preset.label}
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Far Future */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Far Future
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {presets
                      .filter(
                        p => p.type === "future" || (p.days && p.days > 10000)
                      )
                      .map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => applyPreset(preset)}
                          className="text-xs h-8"
                          data-testid={`preset-future-${index}`}
                        >
                          {preset.label}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                Click any preset to automatically set dates and calculate
                fascinating time differences
              </p>
            </CardContent>
          </Card>

          {/* Controls */}
          <ToolButtonGroup>
            <DataButtonGroup>
              <ResetButton
                onClick={clearAll}
                tooltip="Reset to default values"
                hasModifiedData={hasModifiedData}
                disabled={isAtDefault}
              />
              <ClearButton
                onClick={clearAll}
                tooltip="Clear all date inputs"
                hasModifiedData={hasModifiedData}
                disabled={!hasModifiedData}
              />
            </DataButtonGroup>
          </ToolButtonGroup>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {difference ? (
            <>
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Duration Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        {getReadableDuration(difference)}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Total: {formatNumber(difference.totalDays)} days,{" "}
                        {difference.totalHours % 24} hours,{" "}
                        {difference.totalMinutes % 60} minutes
                      </div>
                    </div>

                    {/* Precise Breakdown */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {difference.years > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Years:
                          </span>
                          <span className="font-mono">{difference.years}</span>
                        </div>
                      )}
                      {difference.months > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Months:
                          </span>
                          <span className="font-mono">{difference.months}</span>
                        </div>
                      )}
                      {difference.weeks > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Weeks:
                          </span>
                          <span className="font-mono">{difference.weeks}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Days:
                        </span>
                        <span className="font-mono">{difference.days}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Hours:
                        </span>
                        <span className="font-mono">{difference.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Minutes:
                        </span>
                        <span className="font-mono">{difference.minutes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Seconds:
                        </span>
                        <span className="font-mono">{difference.seconds}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Units */}
              <Card>
                <CardHeader>
                  <CardTitle>Total Duration in Different Units</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Total Years",
                        value: difference.totalYears.toFixed(2),
                        key: "totalYears",
                      },
                      {
                        label: "Total Months",
                        value: formatNumber(difference.totalMonths),
                        key: "totalMonths",
                      },
                      {
                        label: "Total Weeks",
                        value: formatNumber(difference.totalWeeks),
                        key: "totalWeeks",
                      },
                      {
                        label: "Total Days",
                        value: formatNumber(difference.totalDays),
                        key: "totalDays",
                      },
                      {
                        label: "Total Hours",
                        value: formatNumber(difference.totalHours),
                        key: "totalHours",
                      },
                      {
                        label: "Total Minutes",
                        value: formatNumber(difference.totalMinutes),
                        key: "totalMinutes",
                      },
                      {
                        label: "Total Seconds",
                        value: formatNumber(difference.totalSeconds),
                        key: "totalSeconds",
                      },
                    ].map(({ label, value, key }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                      >
                        <span className="text-sm font-medium">{label}:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-lg">{value}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(value, label)}
                            data-testid={`copy-${key}`}
                          >
                            {copiedField === label ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No Calculation Yet</p>
                  <p className="text-sm">
                    Enter both start and end dates to see the difference
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
