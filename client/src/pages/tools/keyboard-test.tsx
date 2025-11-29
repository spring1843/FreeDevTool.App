import { useState, useEffect, useCallback } from "react";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Keyboard, Info, Play, Square } from "lucide-react";
import { ToolButton } from "@/components/ui/tool-button";

interface KeyPress {
  key: string;
  code: string;
  timestamp: number;
  id: string;
}

export default function KeyboardTest() {
  const tool = getToolByPath("/tools/keyboard-test");
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyHistory, setKeyHistory] = useState<KeyPress[]>([]);
  const [isActive, setIsActive] = useState(true);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      event.preventDefault();

      const keyPress: KeyPress = {
        key: event.key,
        code: event.code,
        timestamp: Date.now(),
        id: `${event.code}-${Date.now()}`,
      };

      setPressedKeys(prev => new Set(prev).add(event.code));
      setKeyHistory(prev => [keyPress, ...prev.slice(0, 49)]); // Keep last 50 key presses
    },
    [isActive]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(event.code);
        return newSet;
      });
    },
    [isActive]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, isActive]);

  const toggleTesting = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPressedKeys(new Set());
    }
  };

  // Get key display name
  const getKeyDisplayName = (key: string) => {
    const specialKeys: { [key: string]: string } = {
      " ": "Space",
      ArrowUp: "↑",
      ArrowDown: "↓",
      ArrowLeft: "←",
      ArrowRight: "→",
      Enter: "Enter",
      Tab: "Tab",
      Shift: "Shift",
      Control: "Ctrl",
      Alt: "Alt",
      Meta: "Win",
      CapsLock: "Caps Lock",
      Backspace: "⌫",
      Delete: "Del",
      Escape: "Esc",
    };

    return specialKeys[key] || (key.length === 1 ? key.toUpperCase() : key);
  };

  // Get key category for styling
  const getKeyCategory = (code: string) => {
    if (code.startsWith("Key")) return "letter";
    if (code.startsWith("Digit")) return "number";
    if (code.startsWith("Arrow")) return "arrow";
    if (
      [
        "ShiftLeft",
        "ShiftRight",
        "ControlLeft",
        "ControlRight",
        "AltLeft",
        "AltRight",
        "MetaLeft",
        "MetaRight",
      ].includes(code)
    )
      return "modifier";
    if (
      ["Space", "Enter", "Tab", "Backspace", "Delete", "Escape"].includes(code)
    )
      return "special";
    if (code.startsWith("F") && /F\d+/.test(code)) return "function";
    return "other";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      letter: "bg-blue-500 text-white",
      number: "bg-green-500 text-white",
      arrow: "bg-purple-500 text-white",
      modifier: "bg-orange-500 text-white",
      special: "bg-red-500 text-white",
      function: "bg-indigo-500 text-white",
      other: "bg-slate-500 text-white",
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Keyboard Test
              {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Test your keyboard keys and see which buttons you're pressing in
              real-time
            </p>
          </div>
          <SecurityBanner variant="compact" className="shrink-0" />
        </div>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Keyboard className="w-5 h-5 mr-2" />
              Keyboard Testing
            </div>
            <ToolButton
              variant="custom"
              onClick={toggleTesting}
              tooltip={
                isActive ? "Stop keyboard testing" : "Start keyboard testing"
              }
              icon={
                isActive ? (
                  <Square className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )
              }
              className={
                isActive
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
              size="sm"
            >
              {isActive ? "Stop Testing" : "Start Testing"}
            </ToolButton>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="w-4 h-4" />
            <AlertDescription>
              {isActive ? (
                <>
                  Press any key to test it. Keys will light up when pressed and
                  appear in the history below.
                </>
              ) : (
                <>
                  Click "Start Testing" to begin keyboard testing. Make sure
                  this page has focus.
                </>
              )}
            </AlertDescription>
          </Alert>

          {/* Currently Pressed Keys */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Currently Pressed ({pressedKeys.size})
            </h3>
            <div className="min-h-[60px] p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
              {pressedKeys.size === 0 ? (
                <div className="text-slate-500 dark:text-slate-400 italic">
                  No keys currently pressed
                </div>
              ) : (
                Array.from(pressedKeys).map(code => {
                  const keyPress = keyHistory.find(k => k.code === code);
                  const category = getKeyCategory(code);
                  const displayName = keyPress
                    ? getKeyDisplayName(keyPress.key)
                    : code;

                  return (
                    <Badge
                      key={code}
                      className={`${getCategoryColor(category)} text-sm px-3 py-1`}
                      data-testid={`pressed-key-${code}`}
                    >
                      {displayName}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key History */}
      <Card>
        <CardHeader>
          <CardTitle>Key Press History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
              <span>Recent key presses (last 50)</span>
              <span>{keyHistory.length} total presses</span>
            </div>

            <div className="max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700">
              {keyHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  <Keyboard className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No keys pressed yet</p>
                  <p className="text-sm">
                    Start typing to see key presses here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {keyHistory.map((keyPress, index) => {
                    const category = getKeyCategory(keyPress.code);
                    const displayName = getKeyDisplayName(keyPress.key);
                    const timeAgo = (
                      (Date.now() - keyPress.timestamp) /
                      1000
                    ).toFixed(1);

                    return (
                      <div
                        key={keyPress.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        data-testid={`history-item-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${getCategoryColor(category)} text-xs`}
                          >
                            {displayName}
                          </Badge>
                          <div className="text-sm">
                            <span className="font-mono text-slate-600 dark:text-slate-400">
                              {keyPress.code}
                            </span>
                            {keyPress.key !== displayName && (
                              <span className="text-slate-500 dark:text-slate-500 ml-2">
                                ({keyPress.key})
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {timeAgo}s ago
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              "letter",
              "number",
              "arrow",
              "modifier",
              "special",
              "function",
              "other",
            ].map(category => {
              const count = keyHistory.filter(
                k => getKeyCategory(k.code) === category
              ).length;
              const percentage =
                keyHistory.length > 0
                  ? ((count / keyHistory.length) * 100).toFixed(1)
                  : "0";

              return (
                <div
                  key={category}
                  className="p-3 border border-slate-200 dark:border-slate-700"
                >
                  <div
                    className={`inline-block px-2 py-1 text-xs font-semibold mb-2 ${getCategoryColor(category)}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {count}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
