import { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allTimezones, getUserTimezone } from "@/lib/time-tools";

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
  const [open, setOpen] = useState(false);

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

  // Sort timezones by offset then by name
  const sortedTimezones = useMemo(
    () =>
      [...allTimezones].sort((a: WorldClockCity, b: WorldClockCity) => {
        const offsetA = getTimezoneOffset(a.timezone);
        const offsetB = getTimezoneOffset(b.timezone);

        // Extract numeric offset for proper sorting
        const numericOffsetA = parseFloat(offsetA.replace(/[^\d.-]/g, "")) || 0;
        const numericOffsetB = parseFloat(offsetB.replace(/[^\d.-]/g, "")) || 0;

        if (numericOffsetA !== numericOffsetB) {
          return numericOffsetA - numericOffsetB;
        }

        return a.name.localeCompare(b.name);
      }),
    []
  );

  // Find the selected timezone display value
  const selectedTimezone = value
    ? allTimezones.find((tz: WorldClockCity) => tz.timezone === value)
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          data-testid={testId}
        >
          {selectedTimezone ? (
            <span className="truncate">
              {selectedTimezone.name}, {selectedTimezone.country} (
              {getTimezoneOffset(selectedTimezone.timezone)})
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command
          filter={(value, search) => {
            // Custom filter that searches city name, country, and timezone
            const timezone = allTimezones.find(
              (tz: WorldClockCity) => tz.timezone === value
            );
            if (!timezone) return 0;
            const searchLower = search.toLowerCase();
            if (
              timezone.name.toLowerCase().includes(searchLower) ||
              timezone.country.toLowerCase().includes(searchLower) ||
              timezone.timezone.toLowerCase().includes(searchLower)
            ) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search timezones..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {sortedTimezones.map((city: WorldClockCity) => {
                const offset = getTimezoneOffset(city.timezone);
                return (
                  <CommandItem
                    key={city.timezone}
                    value={city.timezone}
                    onSelect={currentValue => {
                      onValueChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.timezone ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex-1 truncate">
                      {city.name}, {city.country}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {offset}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
