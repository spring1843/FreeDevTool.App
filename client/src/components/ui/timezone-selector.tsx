import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import { allTimezones, getUserTimezone } from "@/lib/time-tools";
import { cn } from "@/lib/utils";

interface WorldClockCity {
  name: string;
  country: string;
  timezone: string;
}

interface TimezoneSelectorProps {
  value?: string;
  onValueChange: (timezone: string) => void;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
}

export function TimezoneSelector({
  value,
  onValueChange,
  placeholder = `Select timezone... (Current: ${getUserTimezone()})`,
  className,
  "data-testid": testId,
}: TimezoneSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get timezone offset for display
  const getTimezoneOffset = (timezone: string): string => {
    try {
      const now = new Date();
      const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
      const target = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );
      const offsetMinutes = (target.getTime() - utc.getTime()) / 60000;
      const offsetHours = offsetMinutes / 60;
      const sign = offsetHours >= 0 ? "+" : "";
      return `UTC${sign}${offsetHours.toFixed(offsetHours % 1 === 0 ? 0 : 1)}`;
    } catch {
      return "UTC+0";
    }
  };

  // Filter and sort timezones
  const filteredTimezones = useMemo(() => {
    const filtered = allTimezones.filter(
      (city: WorldClockCity) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.timezone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by timezone offset, then by city name
    return filtered.sort((a: WorldClockCity, b: WorldClockCity) => {
      const offsetA = getTimezoneOffset(a.timezone);
      const offsetB = getTimezoneOffset(b.timezone);

      // Extract numeric offset for proper sorting
      const numericOffsetA = parseFloat(offsetA.replace(/[^\d.-]/g, "")) || 0;
      const numericOffsetB = parseFloat(offsetB.replace(/[^\d.-]/g, "")) || 0;

      if (numericOffsetA !== numericOffsetB) {
        return numericOffsetA - numericOffsetB;
      }

      return a.name.localeCompare(b.name);
    });
  }, [searchTerm]);

  // Get selected timezone label
  const selectedLabel = useMemo(() => {
    if (!value) return placeholder;
    const selected = allTimezones.find(tz => tz.timezone === value);
    return selected
      ? `${selected.name}, ${selected.country} (${getTimezoneOffset(value)})`
      : placeholder;
  }, [value, placeholder]);

  // Handle closing dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle selection
  const handleSelect = (timezone: string) => {
    onValueChange(timezone);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Prevent event propagation to avoid closing when interacting with dropdown
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div ref={containerRef} className="relative w-full" data-testid={testId}>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full justify-between text-left font-normal",
          !value && "text-muted-foreground",
          className
        )}
        variant="outline"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg"
          onClick={handleDropdownClick}
        >
          {/* Sticky Search Input */}
          <div className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-2">
            <div className="flex items-center px-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900">
              <Search className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
              <Input
                ref={searchInputRef}
                placeholder="Search timezones..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-0 px-2 py-2 focus-visible:ring-0 bg-transparent"
              />
            </div>
          </div>

          {/* Scrollable Options */}
          <div className="max-h-64 overflow-y-auto">
            {filteredTimezones.length > 0 ? (
              filteredTimezones.map((city: WorldClockCity) => {
                const offset = getTimezoneOffset(city.timezone);
                const isSelected = value === city.timezone;

                return (
                  <button
                    key={city.timezone}
                    onClick={() => handleSelect(city.timezone)}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm transition-colors",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      isSelected &&
                        "bg-primary text-primary-foreground dark:bg-primary dark:text-slate-950"
                    )}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium truncate">
                        {city.name}, {city.country}
                      </span>
                      <span
                        className={cn(
                          "text-xs ml-2 flex-shrink-0",
                          isSelected
                            ? "text-primary-foreground"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {offset}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                No timezones found matching &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
