import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight, Copy, Check, Calculator } from "lucide-react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import {
  updateURL,
  copyShareableURL,
  getValidatedParam,
} from "@/lib/url-sharing";
import { useToast } from "@/hooks/use-toast";
import { getToolByPath } from "@/data/tools";
import { DEFAULT_UNIT_CONVERTER } from "@/data/defaults";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";

interface UnitGroup {
  name: string;
  units: { [key: string]: { name: string; factor: number; symbol: string } };
}

const unitGroups: { [key: string]: UnitGroup } = {
  weight: {
    name: "Weight / Mass",
    units: {
      mg: { name: "Milligram", factor: 0.000001, symbol: "mg" },
      g: { name: "Gram", factor: 0.001, symbol: "g" },
      kg: { name: "Kilogram", factor: 1, symbol: "kg" },
      oz: { name: "Ounce", factor: 0.0283495, symbol: "oz" },
      lb: { name: "Pound", factor: 0.453592, symbol: "lb" },
      stone: { name: "Stone", factor: 6.35029, symbol: "st" },
      ton: { name: "Metric Ton", factor: 1000, symbol: "t" },
      uston: { name: "US Ton", factor: 907.185, symbol: "ton" },
      carat: { name: "Carat", factor: 0.0002, symbol: "ct" },
      grain: { name: "Grain", factor: 0.0000647989, symbol: "gr" },
    },
  },
  distance: {
    name: "Distance / Length",
    units: {
      mm: { name: "Millimeter", factor: 0.001, symbol: "mm" },
      cm: { name: "Centimeter", factor: 0.01, symbol: "cm" },
      m: { name: "Meter", factor: 1, symbol: "m" },
      km: { name: "Kilometer", factor: 1000, symbol: "km" },
      in: { name: "Inch", factor: 0.0254, symbol: "in" },
      ft: { name: "Foot", factor: 0.3048, symbol: "ft" },
      yd: { name: "Yard", factor: 0.9144, symbol: "yd" },
      mi: { name: "Mile", factor: 1609.34, symbol: "mi" },
      nmi: { name: "Nautical Mile", factor: 1852, symbol: "nmi" },
      angstrom: { name: "Angstrom", factor: 0.0000000001, symbol: "Å" },
      micron: { name: "Micrometer", factor: 0.000001, symbol: "μm" },
      lightyear: { name: "Light Year", factor: 9.461e15, symbol: "ly" },
    },
  },
  area: {
    name: "Area",
    units: {
      mm2: { name: "Square Millimeter", factor: 0.000001, symbol: "mm²" },
      cm2: { name: "Square Centimeter", factor: 0.0001, symbol: "cm²" },
      m2: { name: "Square Meter", factor: 1, symbol: "m²" },
      km2: { name: "Square Kilometer", factor: 1000000, symbol: "km²" },
      in2: { name: "Square Inch", factor: 0.00064516, symbol: "in²" },
      ft2: { name: "Square Foot", factor: 0.092903, symbol: "ft²" },
      yd2: { name: "Square Yard", factor: 0.836127, symbol: "yd²" },
      acre: { name: "Acre", factor: 4046.86, symbol: "ac" },
      hectare: { name: "Hectare", factor: 10000, symbol: "ha" },
      mi2: { name: "Square Mile", factor: 2589988.11, symbol: "mi²" },
    },
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliter", factor: 0.001, symbol: "ml" },
      l: { name: "Liter", factor: 1, symbol: "l" },
      m3: { name: "Cubic Meter", factor: 1000, symbol: "m³" },
      in3: { name: "Cubic Inch", factor: 0.0163871, symbol: "in³" },
      ft3: { name: "Cubic Foot", factor: 28.3168, symbol: "ft³" },
      yd3: { name: "Cubic Yard", factor: 764.555, symbol: "yd³" },
      floz: { name: "Fluid Ounce (US)", factor: 0.0295735, symbol: "fl oz" },
      cup: { name: "Cup (US)", factor: 0.236588, symbol: "cup" },
      pint: { name: "Pint (US)", factor: 0.473176, symbol: "pt" },
      quart: { name: "Quart (US)", factor: 0.946353, symbol: "qt" },
      gallon: { name: "Gallon (US)", factor: 3.78541, symbol: "gal" },
      barrel: { name: "Barrel (Oil)", factor: 158.987, symbol: "bbl" },
    },
  },
  pressure: {
    name: "Pressure",
    units: {
      pa: { name: "Pascal", factor: 1, symbol: "Pa" },
      kpa: { name: "Kilopascal", factor: 1000, symbol: "kPa" },
      mpa: { name: "Megapascal", factor: 1000000, symbol: "MPa" },
      bar: { name: "Bar", factor: 100000, symbol: "bar" },
      atm: { name: "Atmosphere", factor: 101325, symbol: "atm" },
      psi: { name: "Pound per Square Inch", factor: 6894.76, symbol: "psi" },
      torr: { name: "Torr", factor: 133.322, symbol: "Torr" },
      mmhg: { name: "Millimeter of Mercury", factor: 133.322, symbol: "mmHg" },
      inhg: { name: "Inch of Mercury", factor: 3386.39, symbol: "inHg" },
      mbar: { name: "Millibar", factor: 100, symbol: "mbar" },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", factor: 1, symbol: "°C" },
      f: { name: "Fahrenheit", factor: 1, symbol: "°F" },
      k: { name: "Kelvin", factor: 1, symbol: "K" },
      r: { name: "Rankine", factor: 1, symbol: "°R" },
    },
  },
  energy: {
    name: "Energy",
    units: {
      j: { name: "Joule", factor: 1, symbol: "J" },
      kj: { name: "Kilojoule", factor: 1000, symbol: "kJ" },
      cal: { name: "Calorie", factor: 4.184, symbol: "cal" },
      kcal: { name: "Kilocalorie", factor: 4184, symbol: "kcal" },
      wh: { name: "Watt Hour", factor: 3600, symbol: "Wh" },
      kwh: { name: "Kilowatt Hour", factor: 3600000, symbol: "kWh" },
      btu: { name: "British Thermal Unit", factor: 1055.06, symbol: "BTU" },
      erg: { name: "Erg", factor: 0.0000001, symbol: "erg" },
      ev: { name: "Electron Volt", factor: 1.602e-19, symbol: "eV" },
      therm: { name: "Therm", factor: 105506000, symbol: "thm" },
    },
  },
  power: {
    name: "Power",
    units: {
      w: { name: "Watt", factor: 1, symbol: "W" },
      kw: { name: "Kilowatt", factor: 1000, symbol: "kW" },
      mw: { name: "Megawatt", factor: 1000000, symbol: "MW" },
      hp: { name: "Horsepower (Mechanical)", factor: 745.7, symbol: "hp" },
      ps: { name: "Metric Horsepower", factor: 735.5, symbol: "PS" },
      btu_h: { name: "BTU per Hour", factor: 0.293071, symbol: "BTU/h" },
      cal_s: { name: "Calorie per Second", factor: 4.184, symbol: "cal/s" },
      erg_s: { name: "Erg per Second", factor: 0.0000001, symbol: "erg/s" },
    },
  },
  speed: {
    name: "Speed / Velocity",
    units: {
      ms: { name: "Meter per Second", factor: 1, symbol: "m/s" },
      kmh: { name: "Kilometer per Hour", factor: 0.277778, symbol: "km/h" },
      mph: { name: "Mile per Hour", factor: 0.44704, symbol: "mph" },
      fps: { name: "Foot per Second", factor: 0.3048, symbol: "ft/s" },
      knot: { name: "Knot", factor: 0.514444, symbol: "kn" },
      mach: { name: "Mach (Speed of Sound)", factor: 343, symbol: "Mach" },
      c: { name: "Speed of Light", factor: 299792458, symbol: "c" },
    },
  },
  time: {
    name: "Time",
    units: {
      ns: { name: "Nanosecond", factor: 0.000000001, symbol: "ns" },
      us: { name: "Microsecond", factor: 0.000001, symbol: "μs" },
      ms_time: { name: "Millisecond", factor: 0.001, symbol: "ms" },
      s: { name: "Second", factor: 1, symbol: "s" },
      min: { name: "Minute", factor: 60, symbol: "min" },
      h: { name: "Hour", factor: 3600, symbol: "h" },
      day: { name: "Day", factor: 86400, symbol: "d" },
      week: { name: "Week", factor: 604800, symbol: "wk" },
      month: { name: "Month (30 days)", factor: 2592000, symbol: "mo" },
      year: { name: "Year (365 days)", factor: 31536000, symbol: "yr" },
    },
  },
  data: {
    name: "Data / Digital Storage",
    units: {
      bit: { name: "Bit", factor: 0.125, symbol: "b" },
      byte: { name: "Byte", factor: 1, symbol: "B" },
      kb: { name: "Kilobyte (1000)", factor: 1000, symbol: "KB" },
      kib: { name: "Kibibyte (1024)", factor: 1024, symbol: "KiB" },
      mb: { name: "Megabyte (1000²)", factor: 1000000, symbol: "MB" },
      mib: { name: "Mebibyte (1024²)", factor: 1048576, symbol: "MiB" },
      gb: { name: "Gigabyte (1000³)", factor: 1000000000, symbol: "GB" },
      gib: { name: "Gibibyte (1024³)", factor: 1073741824, symbol: "GiB" },
      tb: { name: "Terabyte (1000⁴)", factor: 1000000000000, symbol: "TB" },
      tib: { name: "Tebibyte (1024⁴)", factor: 1099511627776, symbol: "TiB" },
      pb: { name: "Petabyte (1000⁵)", factor: 1000000000000000, symbol: "PB" },
      pib: {
        name: "Pebibyte (1024⁵)",
        factor: 1125899906842624,
        symbol: "PiB",
      },
    },
  },
  datarate: {
    name: "Data Transfer Rate",
    units: {
      bps: { name: "Bits per Second", factor: 1, symbol: "bps" },
      kbps: { name: "Kilobits per Second", factor: 1000, symbol: "Kbps" },
      mbps: { name: "Megabits per Second", factor: 1000000, symbol: "Mbps" },
      gbps: { name: "Gigabits per Second", factor: 1000000000, symbol: "Gbps" },
      Bps: { name: "Bytes per Second", factor: 8, symbol: "B/s" },
      kBps: { name: "Kilobytes per Second", factor: 8000, symbol: "KB/s" },
      mBps: { name: "Megabytes per Second", factor: 8000000, symbol: "MB/s" },
      gBps: {
        name: "Gigabytes per Second",
        factor: 8000000000,
        symbol: "GB/s",
      },
    },
  },
  frequency: {
    name: "Frequency",
    units: {
      hz: { name: "Hertz", factor: 1, symbol: "Hz" },
      khz: { name: "Kilohertz", factor: 1000, symbol: "kHz" },
      mhz: { name: "Megahertz", factor: 1000000, symbol: "MHz" },
      ghz: { name: "Gigahertz", factor: 1000000000, symbol: "GHz" },
      thz: { name: "Terahertz", factor: 1000000000000, symbol: "THz" },
      rpm: { name: "Revolutions per Minute", factor: 0.0166667, symbol: "RPM" },
      rps: { name: "Revolutions per Second", factor: 1, symbol: "RPS" },
    },
  },
  angle: {
    name: "Angle",
    units: {
      deg: { name: "Degree", factor: 1, symbol: "°" },
      rad: { name: "Radian", factor: 57.2958, symbol: "rad" },
      grad: { name: "Gradian", factor: 0.9, symbol: "gon" },
      arcmin: { name: "Arcminute", factor: 0.0166667, symbol: "′" },
      arcsec: { name: "Arcsecond", factor: 0.000277778, symbol: "″" },
      turn: { name: "Turn / Revolution", factor: 360, symbol: "rev" },
    },
  },
  force: {
    name: "Force",
    units: {
      n: { name: "Newton", factor: 1, symbol: "N" },
      kn: { name: "Kilonewton", factor: 1000, symbol: "kN" },
      dyn: { name: "Dyne", factor: 0.00001, symbol: "dyn" },
      kgf: { name: "Kilogram-force", factor: 9.80665, symbol: "kgf" },
      lbf: { name: "Pound-force", factor: 4.44822, symbol: "lbf" },
      ozf: { name: "Ounce-force", factor: 0.278014, symbol: "ozf" },
      kip: { name: "Kip", factor: 4448.22, symbol: "kip" },
      pdl: { name: "Poundal", factor: 0.138255, symbol: "pdl" },
    },
  },
  torque: {
    name: "Torque",
    units: {
      nm: { name: "Newton-meter", factor: 1, symbol: "N·m" },
      knm: { name: "Kilonewton-meter", factor: 1000, symbol: "kN·m" },
      ftlb: { name: "Foot-pound", factor: 1.35582, symbol: "ft·lbf" },
      inlb: { name: "Inch-pound", factor: 0.112985, symbol: "in·lbf" },
      kgfm: { name: "Kilogram-force meter", factor: 9.80665, symbol: "kgf·m" },
      kgfcm: {
        name: "Kilogram-force centimeter",
        factor: 0.0980665,
        symbol: "kgf·cm",
      },
      dyncm: { name: "Dyne-centimeter", factor: 0.0000001, symbol: "dyn·cm" },
    },
  },
  density: {
    name: "Density",
    units: {
      kgm3: { name: "Kilogram per Cubic Meter", factor: 1, symbol: "kg/m³" },
      gcm3: {
        name: "Gram per Cubic Centimeter",
        factor: 1000,
        symbol: "g/cm³",
      },
      kgl: { name: "Kilogram per Liter", factor: 1000, symbol: "kg/L" },
      gl: { name: "Gram per Liter", factor: 1, symbol: "g/L" },
      lbft3: {
        name: "Pound per Cubic Foot",
        factor: 16.0185,
        symbol: "lb/ft³",
      },
      lbin3: {
        name: "Pound per Cubic Inch",
        factor: 27679.9,
        symbol: "lb/in³",
      },
      lbgal: {
        name: "Pound per Gallon (US)",
        factor: 119.826,
        symbol: "lb/gal",
      },
      ozin3: {
        name: "Ounce per Cubic Inch",
        factor: 1729.99,
        symbol: "oz/in³",
      },
    },
  },
  fueleconomy: {
    name: "Fuel Economy",
    units: {
      mpgus: { name: "Miles per Gallon (US)", factor: 1, symbol: "mpg" },
      mpguk: {
        name: "Miles per Gallon (UK)",
        factor: 1.20095,
        symbol: "mpg (UK)",
      },
      kml: { name: "Kilometers per Liter", factor: 0.425144, symbol: "km/L" },
      l100km: { name: "Liters per 100 km", factor: 235.215, symbol: "L/100km" },
      mpl: { name: "Miles per Liter", factor: 0.264172, symbol: "mi/L" },
    },
  },
  luminance: {
    name: "Luminance / Light",
    units: {
      lux: { name: "Lux", factor: 1, symbol: "lx" },
      lumen: { name: "Lumen per Square Meter", factor: 1, symbol: "lm/m²" },
      fc: { name: "Foot-candle", factor: 10.7639, symbol: "fc" },
      phot: { name: "Phot", factor: 10000, symbol: "ph" },
      nit: { name: "Nit (Candela/m²)", factor: 1, symbol: "nt" },
      stilb: { name: "Stilb", factor: 10000, symbol: "sb" },
      lambert: { name: "Lambert", factor: 3183.1, symbol: "L" },
      footlambert: { name: "Foot-lambert", factor: 3.42626, symbol: "fL" },
    },
  },
  typography: {
    name: "Typography",
    units: {
      pt: { name: "Point", factor: 1, symbol: "pt" },
      px: { name: "Pixel (96 DPI)", factor: 0.75, symbol: "px" },
      pica: { name: "Pica", factor: 12, symbol: "pc" },
      em: { name: "Em (16px base)", factor: 12, symbol: "em" },
      inch_typo: { name: "Inch", factor: 72, symbol: "in" },
      mm_typo: { name: "Millimeter", factor: 2.83465, symbol: "mm" },
      cm_typo: { name: "Centimeter", factor: 28.3465, symbol: "cm" },
      twip: { name: "Twip", factor: 0.05, symbol: "twip" },
    },
  },
};

export default function UnitConverter() {
  const tool = getToolByPath("/tools/unit-converter");
  const [selectedCategory, setSelectedCategory] = useState("weight");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  // Default value aligns with test expectation of 100
  const [inputValue, setInputValue] = useState(DEFAULT_UNIT_CONVERTER);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load parameters from URL with validation
    const validCategories = Object.keys(unitGroups);
    const urlCategory = getValidatedParam("cat", "weight", {
      type: "enum",
      allowedValues: validCategories,
    });

    const categoryUnits = Object.keys(
      unitGroups[urlCategory as keyof typeof unitGroups].units
    );
    const urlFrom = getValidatedParam("from", "", {
      type: "enum",
      allowedValues: categoryUnits,
    });
    const urlTo = getValidatedParam("to", "", {
      type: "enum",
      allowedValues: categoryUnits,
    });
    const urlValue = getValidatedParam("val", DEFAULT_UNIT_CONVERTER, {
      type: "string",
      pattern: /^-?\d*\.?\d*$/,
      maxLength: 20,
    });

    setSelectedCategory(urlCategory as string);
    setInputValue(urlValue as string);

    if (
      urlFrom &&
      urlTo &&
      unitGroups[urlCategory as keyof typeof unitGroups]
    ) {
      setFromUnit(urlFrom as string);
      setToUnit(urlTo as string);
    }
  }, []);

  // Set default units when category changes
  useEffect(() => {
    const units = Object.keys(unitGroups[selectedCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [selectedCategory]);

  const convertTemperature = useCallback(
    (value: number, from: string, to: string): number => {
      // Convert to Celsius first
      let celsius = value;
      switch (from) {
        case "f":
          celsius = ((value - 32) * 5) / 9;
          break;
        case "k":
          celsius = value - 273.15;
          break;
        case "r":
          celsius = ((value - 491.67) * 5) / 9;
          break;
        default:
          // Celsius is default, no conversion needed
          break;
      }

      // Convert from Celsius to target
      switch (to) {
        case "f":
          return (celsius * 9) / 5 + 32;
        case "k":
          return celsius + 273.15;
        case "r":
          return (celsius * 9) / 5 + 491.67;
        default:
          return celsius;
      }
    },
    []
  );

  const convertUnits = useCallback(() => {
    try {
      const value = parseFloat(inputValue);
      if (isNaN(value)) {
        setResult("");
        return;
      }

      const category = unitGroups[selectedCategory];

      if (selectedCategory === "temperature") {
        setResult(convertTemperature(value, fromUnit, toUnit).toString());
      } else {
        const fromFactor = category.units[fromUnit].factor;
        const toFactor = category.units[toUnit].factor;
        const convertedValue = (value * fromFactor) / toFactor;
        setResult(convertedValue.toString());
      }
    } catch {
      console.error("Conversion error occurred");
      setResult("");
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory, convertTemperature]);

  // Convert units when inputs change
  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      convertUnits();
      updateURL({
        cat: selectedCategory,
        from: fromUnit,
        to: toUnit,
        val: inputValue,
      });
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory, convertUnits]);

  const shareConversion = async () => {
    const success = await copyShareableURL({
      cat: selectedCategory,
      from: fromUnit,
      to: toUnit,
      val: inputValue,
    });
    if (success) {
      toast({
        title: "Conversion shared!",
        description: "URL copied to clipboard with current conversion settings",
      });
    } else {
      toast({
        title: "Share failed",
        description: "Could not copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setSelectedCategory("weight");
    setInputValue(DEFAULT_UNIT_CONVERTER);
    const weightUnits = Object.keys(unitGroups["weight"].units);
    setFromUnit(weightUnits[0]);
    setToUnit(weightUnits[1] || weightUnits[0]);
    setResult("");
  };

  const handleClear = () => {
    // Clear sets numeric default minimal value per tests (expect "0" after clear confirmation)
    setInputValue("0");
    setResult("");
  };

  const hasModifiedData =
    inputValue !== DEFAULT_UNIT_CONVERTER && inputValue.trim() !== "";
  const isAtDefault =
    inputValue === DEFAULT_UNIT_CONVERTER && selectedCategory === "weight";

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.error("Failed to copy");
      }
    }
  };

  const formatResult = (value: string): string => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    // Format with appropriate precision
    if (Math.abs(num) >= 1000000 || Math.abs(num) < 0.001) {
      return num.toExponential(6);
    } else if (Math.abs(num) >= 100) {
      return num.toFixed(2);
    } else if (Math.abs(num) >= 1) {
      return num.toFixed(4);
    }
    return num.toFixed(6);
  };

  const currentCategory = unitGroups[selectedCategory];
  const unitOptions = Object.entries(currentCategory.units);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Unit Converter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Convert between various units of weight, distance, area, volume,
              pressure, and more
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6 justify-end">
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default settings"
            hasModifiedData={isAtDefault ? false : hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear input value"
            hasModifiedData={hasModifiedData}
            disabled={inputValue.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {/* Category Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Select Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger data-testid="category-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(unitGroups).map(([key, group]) => (
                <SelectItem key={key} value={key}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {/* Conversion Interface */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{currentCategory.name} Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="input-value">Value</Label>
              <Input
                id="input-value"
                type="number"
                step="any"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Enter value"
                data-testid="input-value"
                autoFocus={true}
                data-default-input="true"
              />
            </div>
            <div>
              <Label htmlFor="from-unit">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger data-testid="from-unit-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="to-unit">To</Label>
              <div className="flex gap-2">
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger data-testid="to-unit-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={swapUnits}
                  data-testid="swap-units-button"
                  disabled={fromUnit === toUnit}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Result Section */}
          {result ? (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-100 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Result
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyResult}
                  data-testid="copy-result-button"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="text-2xl font-mono text-slate-900 dark:text-slate-100">
                {formatResult(result)} {currentCategory.units[toUnit]?.symbol}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {inputValue} {currentCategory.units[fromUnit]?.symbol} ={" "}
                {formatResult(result)} {currentCategory.units[toUnit]?.symbol}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <ToolButton
                  variant="share"
                  onClick={shareConversion}
                  size="sm"
                  className="w-full flex items-center justify-center space-x-2"
                  tooltip="Copy shareable URL to clipboard"
                  data-testid="share-conversion-button"
                >
                  Share Conversion
                </ToolButton>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
      {/* Quick Conversion Reference */}
      <Card className="mb-6 mt-6">
        <CardHeader>
          <CardTitle>Common {currentCategory.name} Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {getCommonConversions(selectedCategory).map((conversion, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
              >
                <span className="text-slate-600 dark:text-slate-400">
                  {conversion.from}
                </span>
                <span className="font-mono text-slate-900 dark:text-slate-100">
                  {conversion.to}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}

function getCommonConversions(
  category: string
): Array<{ from: string; to: string }> {
  const conversions: { [key: string]: Array<{ from: string; to: string }> } = {
    weight: [
      { from: "1 kg", to: "2.205 lb" },
      { from: "1 lb", to: "453.59 g" },
      { from: "1 oz", to: "28.35 g" },
      { from: "1 stone", to: "6.35 kg" },
      { from: "1 ton", to: "1000 kg" },
      { from: "1 carat", to: "0.2 g" },
    ],
    distance: [
      { from: "1 m", to: "3.281 ft" },
      { from: "1 km", to: "0.621 mi" },
      { from: "1 in", to: "2.54 cm" },
      { from: "1 ft", to: "30.48 cm" },
      { from: "1 yd", to: "0.914 m" },
      { from: "1 mi", to: "1.609 km" },
    ],
    area: [
      { from: "1 m²", to: "10.76 ft²" },
      { from: "1 km²", to: "0.386 mi²" },
      { from: "1 hectare", to: "2.471 acre" },
      { from: "1 acre", to: "4047 m²" },
      { from: "1 ft²", to: "0.093 m²" },
      { from: "1 in²", to: "6.452 cm²" },
    ],
    volume: [
      { from: "1 l", to: "0.264 gal" },
      { from: "1 gal", to: "3.785 l" },
      { from: "1 m³", to: "35.31 ft³" },
      { from: "1 cup", to: "236.6 ml" },
      { from: "1 pint", to: "473.2 ml" },
      { from: "1 quart", to: "946.4 ml" },
    ],
    pressure: [
      { from: "1 bar", to: "14.5 psi" },
      { from: "1 atm", to: "101.3 kPa" },
      { from: "1 psi", to: "6.895 kPa" },
      { from: "1 torr", to: "133.3 Pa" },
      { from: "1 mmHg", to: "133.3 Pa" },
      { from: "1 inHg", to: "3.386 kPa" },
    ],
    temperature: [
      { from: "0°C", to: "32°F" },
      { from: "100°C", to: "212°F" },
      { from: "0°F", to: "-17.8°C" },
      { from: "0 K", to: "-273.15°C" },
      { from: "20°C", to: "68°F" },
      { from: "37°C", to: "98.6°F" },
    ],
    energy: [
      { from: "1 kWh", to: "3.6 MJ" },
      { from: "1 cal", to: "4.184 J" },
      { from: "1 BTU", to: "1055 J" },
      { from: "1 eV", to: "1.602×10⁻¹⁹ J" },
      { from: "1 kcal", to: "4184 J" },
      { from: "1 Wh", to: "3600 J" },
    ],
    power: [
      { from: "1 hp", to: "745.7 W" },
      { from: "1 kW", to: "1.34 hp" },
      { from: "1 PS", to: "735.5 W" },
      { from: "1 BTU/h", to: "0.293 W" },
      { from: "1 MW", to: "1000 kW" },
      { from: "1 cal/s", to: "4.184 W" },
    ],
    speed: [
      { from: "1 m/s", to: "3.6 km/h" },
      { from: "1 mph", to: "1.609 km/h" },
      { from: "1 knot", to: "1.852 km/h" },
      { from: "1 km/h", to: "0.278 m/s" },
      { from: "1 ft/s", to: "0.305 m/s" },
      { from: "Mach 1", to: "343 m/s" },
    ],
  };

  return conversions[category] || [];
}
