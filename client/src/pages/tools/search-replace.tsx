import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ResetButton, ClearButton } from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import {
  DEFAULT_SEARCH_REPLACE_TEXT,
  DEFAULT_SEARCH_REPLACE_SEARCH,
  DEFAULT_SEARCH_REPLACE_REPLACE,
} from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function SearchReplace() {
  const tool = getToolByPath("/tools/search-replace");
  const [text, setText] = useState(DEFAULT_SEARCH_REPLACE_TEXT);
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH_REPLACE_SEARCH);
  const [replaceText, setReplaceText] = useState(
    DEFAULT_SEARCH_REPLACE_REPLACE
  );
  const [isRegex, setIsRegex] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isGlobal, setIsGlobal] = useState(true);
  const [result, setResult] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const performSearchReplace = useCallback(() => {
    try {
      setError("");

      if (!searchText) {
        setError("Search text cannot be empty");
        return;
      }

      let searchPattern: string | RegExp = searchText;

      if (isRegex) {
        let flags = "";
        if (!isCaseSensitive) flags += "i";
        if (isGlobal) flags += "g";

        try {
          searchPattern = new RegExp(searchText, flags);
        } catch (regexError) {
          setError(
            `Invalid regex pattern: ${regexError instanceof Error ? regexError.message : String(regexError)}`
          );
          return;
        }
      } else {
        // Escape special regex characters for literal search
        const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let flags = "";
        if (!isCaseSensitive) flags += "i";
        if (isGlobal) flags += "g";
        searchPattern = new RegExp(escapedSearch, flags);
      }

      // Count matches
      const matches = text.match(searchPattern);
      setMatchCount(matches ? matches.length : 0);

      // Perform replacement
      const replacedText = text.replace(searchPattern, replaceText);
      setResult(replacedText);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
      setResult("");
      setMatchCount(0);
    }
  }, [text, searchText, replaceText, isRegex, isCaseSensitive, isGlobal]);

  const handleReset = () => {
    setText(DEFAULT_SEARCH_REPLACE_TEXT);
    setSearchText(DEFAULT_SEARCH_REPLACE_SEARCH);
    setReplaceText(DEFAULT_SEARCH_REPLACE_REPLACE);
    setIsRegex(false);
    setIsCaseSensitive(false);
    setIsGlobal(true);
    setResult("");
    setMatchCount(0);
    setError("");
  };

  const handleClear = () => {
    setText("");
    setSearchText("");
    setReplaceText("");
    setResult("");
    setMatchCount(0);
    setError("");
  };

  const hasModifiedData =
    (text !== DEFAULT_SEARCH_REPLACE_TEXT && text.trim() !== "") ||
    (searchText !== DEFAULT_SEARCH_REPLACE_SEARCH &&
      searchText.trim() !== "") ||
    (replaceText !== DEFAULT_SEARCH_REPLACE_REPLACE &&
      replaceText.trim() !== "");
  const isAtDefault =
    text === DEFAULT_SEARCH_REPLACE_TEXT &&
    searchText === DEFAULT_SEARCH_REPLACE_SEARCH &&
    replaceText === DEFAULT_SEARCH_REPLACE_REPLACE &&
    isRegex === false &&
    isCaseSensitive === false &&
    isGlobal === true;

  useEffect(() => {
    performSearchReplace();
  }, [performSearchReplace]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Search & Replace
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Find and replace text with regex support
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Replace Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search-text">Search For</Label>
              <Input
                id="search-text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Text to search for..."
                data-testid="search-input"
              />
            </div>
            <div>
              <Label htmlFor="replace-text">Replace With</Label>
              <Input
                id="replace-text"
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
                placeholder="Replacement text..."
                data-testid="replace-input"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="regex-mode"
                checked={isRegex}
                onCheckedChange={setIsRegex}
              />
              <Label htmlFor="regex-mode">Regular Expression</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="case-sensitive"
                checked={isCaseSensitive}
                onCheckedChange={setIsCaseSensitive}
              />
              <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="global-replace"
                checked={isGlobal}
                onCheckedChange={setIsGlobal}
              />
              <Label htmlFor="global-replace">Replace All</Label>
            </div>
          </div>

          {error ? (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-sm text-red-800 dark:text-red-200">
                {error}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                onClick={performSearchReplace}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Search & Replace
              </Button>
              <ResetButton
                onClick={handleReset}
                tooltip="Reset all settings to defaults"
                hasModifiedData={hasModifiedData}
                disabled={isAtDefault}
              />
              <ClearButton
                onClick={handleClear}
                tooltip="Clear all inputs"
                hasModifiedData={hasModifiedData}
                disabled={
                  text.trim() === "" &&
                  searchText.trim() === "" &&
                  replaceText.trim() === ""
                }
              />
            </div>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {matchCount} matches found
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter text to search and replace..."
              data-default-input="true"
              data-testid="text-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="txt"
              theme={theme}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={result}
              readOnly={true}
              placeholder="Search and replace results will appear here..."
              data-testid="text-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>
      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
