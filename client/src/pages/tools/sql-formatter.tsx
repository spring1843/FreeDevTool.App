import { useShareTool } from "@/hooks/use-share-tool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import {
  formatSQL,
  DEFAULT_SQL_OPTIONS,
  type SqlFormatOptions,
} from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_SQL } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

const DIALECTS: Array<{ value: SqlFormatOptions["language"]; label: string }> =
  [
    { value: "sql", label: "Standard SQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "mariadb", label: "MariaDB" },
    { value: "sqlite", label: "SQLite" },
    { value: "transactsql", label: "SQL Server (T-SQL)" },
    { value: "plsql", label: "Oracle PL/SQL" },
    { value: "bigquery", label: "BigQuery" },
    { value: "snowflake", label: "Snowflake" },
    { value: "redshift", label: "Redshift" },
    { value: "duckdb", label: "DuckDB" },
    { value: "clickhouse", label: "ClickHouse" },
    { value: "spark", label: "Spark SQL" },
    { value: "hive", label: "Hive" },
    { value: "trino", label: "Trino / Presto" },
    { value: "db2", label: "DB2" },
    { value: "db2i", label: "DB2 for IBM i" },
    { value: "singlestoredb", label: "SingleStore" },
    { value: "tidb", label: "TiDB" },
    { value: "n1ql", label: "Couchbase N1QL" },
  ];

const CASE_OPTIONS = [
  { value: "upper", label: "UPPER" },
  { value: "lower", label: "lower" },
  { value: "preserve", label: "Preserve" },
];

const INDENT_STYLES = [
  { value: "standard", label: "Standard" },
  { value: "tabularLeft", label: "Tabular left" },
  { value: "tabularRight", label: "Tabular right" },
];

const INDENT_OPTIONS = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "8", label: "8 spaces" },
  { value: "tab", label: "Tabs" },
];

const OPERATOR_NEWLINE = [
  { value: "before", label: "Before (AND x)" },
  { value: "after", label: "After (x AND)" },
];

function SettingSelect({
  id,
  label,
  value,
  options,
  onChange,
  width = "w-40",
}: {
  id: string;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  width?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className="text-xs text-slate-600 dark:text-slate-400"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className={width} data-testid={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SettingNumber({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className="text-xs text-slate-600 dark:text-slate-400"
      >
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => {
          const parsed = parseInt(e.target.value, 10);
          if (!Number.isNaN(parsed)) {
            onChange(Math.min(max, Math.max(min, parsed)));
          }
        }}
        className="w-24"
        data-testid={id}
      />
    </div>
  );
}

function SettingSwitch({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 h-10 self-end">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        data-testid={id}
      />
      <Label htmlFor={id} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

export default function SqlFormatter() {
  const { handleShare } = useShareTool();
  const tool = getToolByPath("/tools/sql-formatter");
  const [input, setInput] = useState(DEFAULT_SQL);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [autoFormat, setAutoFormat] = useState(true);
  const [options, setOptions] = useState<SqlFormatOptions>(DEFAULT_SQL_OPTIONS);
  const { theme } = useTheme();

  const setOption = <K extends keyof SqlFormatOptions>(
    key: K,
    value: SqlFormatOptions[K]
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const formatCode = useCallback(async () => {
    const { formatted, error: formatError } = await formatSQL(input, options);
    setOutput(formatted);
    setError(formatError || null);
  }, [input, options]);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (output) {
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_SQL);
    setOptions(DEFAULT_SQL_OPTIONS);
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const optionsModified =
    JSON.stringify(options) !== JSON.stringify(DEFAULT_SQL_OPTIONS);
  const hasModifiedData =
    (input !== DEFAULT_SQL && input.trim() !== "") || optionsModified;
  const isAtDefault = input === DEFAULT_SQL && !optionsModified;

  useEffect(() => {
    document.title = "SQL Formatter - FreeDevTool.App";
    if (autoFormat) {
      formatCode();
    }
  }, [autoFormat, formatCode]);

  const indentValue = options.useTabs ? "tab" : String(options.tabWidth);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              SQL Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format and beautify SQL queries for PostgreSQL, MySQL, SQL Server,
              Oracle, SQLite, BigQuery and more
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      {error ? (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={formatCode}
            icon={<Code className="w-4 h-4 mr-2" />}
            tooltip="Format and beautify SQL"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Format SQL
          </ToolButton>
          <ToolButton
            variant="share"
            onClick={handleShare}
            tooltip="Copy link to this tool"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sql-auto-format"
                    checked={autoFormat}
                    onCheckedChange={setAutoFormat}
                    data-testid="auto-process-switch"
                  />
                  <Label htmlFor="sql-auto-format" className="cursor-pointer">
                    Auto Format
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically format the input when it changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default example and settings"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear all inputs"
            hasModifiedData={hasModifiedData}
            disabled={input.trim() === "" && output.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <SettingSelect
              id="sql-dialect"
              label="Dialect"
              value={options.language}
              options={DIALECTS}
              width="w-48"
              onChange={v =>
                setOption("language", v as SqlFormatOptions["language"])
              }
            />
            <SettingSelect
              id="sql-indent"
              label="Indentation"
              value={indentValue}
              options={INDENT_OPTIONS}
              width="w-32"
              onChange={v => {
                if (v === "tab") {
                  setOption("useTabs", true);
                } else {
                  setOptions(prev => ({
                    ...prev,
                    useTabs: false,
                    tabWidth: parseInt(v, 10),
                  }));
                }
              }}
            />
            <SettingSelect
              id="sql-keyword-case"
              label="Keyword case"
              value={options.keywordCase}
              options={CASE_OPTIONS}
              width="w-32"
              onChange={v =>
                setOption("keywordCase", v as SqlFormatOptions["keywordCase"])
              }
            />
            <SettingSelect
              id="sql-function-case"
              label="Function case"
              value={options.functionCase}
              options={CASE_OPTIONS}
              width="w-32"
              onChange={v =>
                setOption("functionCase", v as SqlFormatOptions["functionCase"])
              }
            />
            <SettingSelect
              id="sql-data-type-case"
              label="Data type case"
              value={options.dataTypeCase}
              options={CASE_OPTIONS}
              width="w-32"
              onChange={v =>
                setOption("dataTypeCase", v as SqlFormatOptions["dataTypeCase"])
              }
            />
            <SettingSelect
              id="sql-indent-style"
              label="Indent style"
              value={options.indentStyle}
              options={INDENT_STYLES}
              width="w-36"
              onChange={v =>
                setOption("indentStyle", v as SqlFormatOptions["indentStyle"])
              }
            />
            <SettingSelect
              id="sql-logical-operator"
              label="AND / OR position"
              value={options.logicalOperatorNewline}
              options={OPERATOR_NEWLINE}
              width="w-40"
              onChange={v =>
                setOption(
                  "logicalOperatorNewline",
                  v as SqlFormatOptions["logicalOperatorNewline"]
                )
              }
            />
            <SettingNumber
              id="sql-expression-width"
              label="Expression width"
              value={options.expressionWidth}
              min={10}
              max={200}
              onChange={v => setOption("expressionWidth", v)}
            />
            <SettingNumber
              id="sql-lines-between"
              label="Lines between queries"
              value={options.linesBetweenQueries}
              min={0}
              max={5}
              onChange={v => setOption("linesBetweenQueries", v)}
            />
            <SettingSwitch
              id="sql-dense-operators"
              label="Dense operators"
              checked={options.denseOperators}
              onChange={v => setOption("denseOperators", v)}
            />
            <SettingSwitch
              id="sql-newline-semicolon"
              label="Semicolon on new line"
              checked={options.newlineBeforeSemicolon}
              onChange={v => setOption("newlineBeforeSemicolon", v)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input SQL</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your SQL query here..."
              data-testid="sql-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="sql"
              theme={theme}
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={output}
              readOnly={true}
              placeholder="Formatted SQL will appear here..."
              data-testid="sql-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              fileExtension="sql"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
