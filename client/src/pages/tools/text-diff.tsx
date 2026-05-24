import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  ResetButton,
  ClearButton,
  ToolButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_TEXT_DIFF_1, DEFAULT_TEXT_DIFF_2 } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { diffLines, createTwoFilesPatch } from "diff";
import {
  parseDiff,
  Diff,
  Hunk,
  type FileData,
  type ViewType,
} from "react-diff-view";
import "react-diff-view/style/index.css";

interface DiffStats {
  linesAdded: number;
  linesRemoved: number;
  charactersAdded: number;
  charactersRemoved: number;
}

export default function TextDiff() {
  const tool = getToolByPath("/tools/text-diff");
  const [text1, setText1] = useState(DEFAULT_TEXT_DIFF_1);
  const [text2, setText2] = useState(DEFAULT_TEXT_DIFF_2);
  const [diffFile, setDiffFile] = useState<FileData | null>(null);
  const [diffStats, setDiffStats] = useState<DiffStats | null>(null);
  const [viewType, setViewType] = useState<ViewType>("split");
  const { theme } = useTheme();

  const calculateDiff = useCallback(() => {
    const changes = diffLines(text1, text2);
    const stats: DiffStats = {
      linesAdded: 0,
      linesRemoved: 0,
      charactersAdded: 0,
      charactersRemoved: 0,
    };
    for (const change of changes) {
      if (change.added) {
        stats.linesAdded += change.count ?? 0;
        stats.charactersAdded += change.value.length;
      } else if (change.removed) {
        stats.linesRemoved += change.count ?? 0;
        stats.charactersRemoved += change.value.length;
      }
    }
    setDiffStats(stats);

    const rawPatch = createTwoFilesPatch(
      "Text 1",
      "Text 2",
      text1,
      text2,
      "",
      "",
      { context: 3 }
    );
    // createTwoFilesPatch prepends "===...===\n" which parseDiff doesn't expect
    const patch = rawPatch.replace(/^=+\n/, "");
    const files = parseDiff(patch);
    setDiffFile(files[0] ?? null);
  }, [text1, text2]);

  const handleReset = () => {
    setText1(DEFAULT_TEXT_DIFF_1);
    setText2(DEFAULT_TEXT_DIFF_2);
    setDiffFile(null);
    setDiffStats(null);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiffFile(null);
    setDiffStats(null);
  };

  const hasModifiedData =
    (text1 !== DEFAULT_TEXT_DIFF_1 && text1.trim() !== "") ||
    (text2 !== DEFAULT_TEXT_DIFF_2 && text2.trim() !== "");
  const isAtDefault =
    text1 === DEFAULT_TEXT_DIFF_1 && text2 === DEFAULT_TEXT_DIFF_2;

  useEffect(() => {
    calculateDiff();
  }, [calculateDiff]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              Text Diff
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Compare text differences side by side with detailed statistics
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={calculateDiff}
            tooltip="Compare both text inputs"
            icon={<GitCompare className="w-4 h-4 mr-2" />}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Compare Text
          </ToolButton>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default examples"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear all text"
            hasModifiedData={hasModifiedData}
            disabled={text1.trim() === "" && text2.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">
              Text 1 (Original)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input1"
              value={text1}
              onChange={e => setText1(e.target.value)}
              placeholder="Enter original text here..."
              data-testid="text1-input"
              className="min-h-[300px] font-mono text-sm"
              rows={15}
              autoFocus={true}
              minHeight="300px"
              lang="plaintext"
              fileExtension="txt"
              theme={theme}
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">
              Text 2 (Modified)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input2"
              value={text2}
              onChange={e => setText2(e.target.value)}
              placeholder="Enter modified text here..."
              data-testid="text2-input"
              className="min-h-[300px] font-mono text-sm"
              rows={15}
              minHeight="300px"
              lang="plaintext"
              fileExtension="txt"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      {diffFile ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Diff Results</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant={viewType === "split" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("split")}
                  title="Side-by-side view"
                >
                  Split
                </Button>
                <Button
                  variant={viewType === "unified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("unified")}
                  title="Unified single-column view"
                >
                  Unified
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(diffFile.hunks?.length ?? 0) > 0 ? (
              <div className="border rounded-lg overflow-auto max-h-[600px]">
                <Diff
                  viewType={viewType}
                  diffType="modify"
                  hunks={diffFile.hunks}
                >
                  {hunks =>
                    hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)
                  }
                </Diff>
              </div>
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                Texts are identical — no differences found.
              </p>
            )}
          </CardContent>
        </Card>
      ) : null}

      {diffStats ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Diff Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                +{diffStats.linesAdded} lines
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                -{diffStats.linesRemoved} lines
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {diffStats.charactersAdded + diffStats.charactersRemoved} chars
                changed
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
