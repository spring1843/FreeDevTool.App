import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_TEXT_SORT } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { renderToolExplanations } from "@/components/tool-explanations";

type SortType = "alphabetical" | "numerical" | "length" | "reverse" | "random";
type SortOrder = "asc" | "desc";

export default function TextSort() {
  const [input, setInput] = useState(DEFAULT_TEXT_SORT);
  const [sortType, setSortType] = useState<SortType>("alphabetical");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [unique, setUnique] = useState(false);
  const [trimLines, setTrimLines] = useState(false);
  const [sortedOutput, setSortedOutput] = useState("");
  const { theme } = useTheme();

  const sortText = useCallback(() => {
    // Split into raw lines first (preserve original ordering prior to sort)
    const rawLines = input.split("\n");
    // Optionally trim each line before filtering empties & sorting/deduping
    const processed = rawLines
      .map(l => (trimLines ? l.trim() : l))
      .filter(line => line.trim() !== "");

    let sorted = [...processed];

    switch (sortType) {
      case "alphabetical":
        sorted.sort((a, b) => {
          const strA = caseSensitive ? a : a.toLowerCase();
          const strB = caseSensitive ? b : b.toLowerCase();
          return strA.localeCompare(strB);
        });
        break;
      case "numerical":
        sorted.sort((a, b) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (isNaN(numA) && isNaN(numB)) return 0;
          if (isNaN(numA)) return 1;
          if (isNaN(numB)) return -1;
          return numA - numB;
        });
        break;
      case "length":
        sorted.sort((a, b) => a.length - b.length);
        break;
      case "reverse":
        sorted.reverse();
        break;
      case "random": {
        for (let i = sorted.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
        }
        break;
      }
      default: {
        // Handle default case
      }
    }

    if (
      sortOrder === "desc" &&
      sortType !== "reverse" &&
      sortType !== "random"
    ) {
      sorted.reverse();
    }

    // Remove duplicates if unique option is enabled
    if (unique) {
      // Deduplicate after optional trimming so lines differing only by surrounding whitespace are merged
      sorted = Array.from(new Set(sorted));
    }

    setSortedOutput(sorted.join("\n"));
  }, [input, sortType, sortOrder, caseSensitive, unique, trimLines]);

  const handleReset = () => {
    setInput(DEFAULT_TEXT_SORT);
    setSortType("alphabetical");
    setSortOrder("asc");
    setCaseSensitive(false);
    setUnique(false);
    setTrimLines(false);
    setSortedOutput("");
  };

  useEffect(() => {
    sortText();
  }, [sortText]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Text Sorter
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sort lines of text alphabetically, randomly, numerically, or by
              length with optional deduplication
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sort Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="sort-type">Sort Type</Label>
              <Select
                value={sortType}
                onValueChange={(value: SortType) => setSortType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="numerical">Numerical</SelectItem>
                  <SelectItem value="length">By Length</SelectItem>
                  <SelectItem value="reverse">Reverse Lines</SelectItem>
                  <SelectItem value="random">Randomize</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sort-order">Sort Order</Label>
              <Select
                value={sortOrder}
                onValueChange={(value: SortOrder) => setSortOrder(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id="case-sensitive"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
                data-testid="switch-case-sensitive"
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="trim-lines"
                checked={trimLines}
                onCheckedChange={checked => setTrimLines(checked === true)}
                data-testid="checkbox-trim-lines"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="trim-lines"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trim lines before processing
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Removes leading and trailing whitespace prior to sorting &
                  deduplication
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="unique"
                checked={unique}
                onCheckedChange={checked => setUnique(checked === true)}
                data-testid="checkbox-unique"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="unique"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remove duplicate lines
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Keeps only unique entries (after optional trimming)
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={sortText}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort Text
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter lines of text to sort..."
              data-testid="text-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="txt"
              theme={theme}
              lang="text"
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sorted Output</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={sortedOutput}
              readOnly={true}
              placeholder="Sorted text will appear here..."
              data-testid="text-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              theme={theme}
              lang="text"
              fileExtension="txt"
            />
          </CardContent>
        </Card>
      </div>
      {renderToolExplanations(getToolByPath("/tools/text-sort")?.explanations)}
    </div>
  );
}
