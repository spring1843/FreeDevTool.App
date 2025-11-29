import React from "react";
import { Shield, Lock, Wifi, Heart, Github } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SecurityBannerProps {
  variant?: "compact" | "detailed";
  className?: string;
}

export function SecurityBanner({
  variant = "compact",
  className = "",
}: SecurityBannerProps) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <a
          href="https://github.com/spring1843/FreeDevTool.App"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-xs font-medium"
        >
          <Github className="w-3.5 h-3.5" />
          Open Source
        </a>
        <a
          href="https://github.com/spring1843/FreeDevTool.App/blob/main/SECURITY.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-xs font-medium"
        >
          <Shield className="w-3.5 h-3.5" />
          Safety and Security
        </a>
      </div>
    );
  }

  return (
    <Card className={`border-l-4 border-l-green-500 ${className}`}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
          <h3 className="font-semibold text-green-800 dark:text-green-300">
            Open Source • Privacy-Focused Developer Tools
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-start">
            <Github className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <div className="font-medium text-slate-700 dark:text-slate-300">
                Open Source
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">
                Community-driven, transparent, and trustworthy
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Heart className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <div className="font-medium text-slate-700 dark:text-slate-300">
                Free Core Features
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">
                Browser-based computation for security
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Lock className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <div className="font-medium text-slate-700 dark:text-slate-300">
                No Network Requests
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">
                Designed to process data locally in your browser
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Wifi className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <div className="font-medium text-slate-700 dark:text-slate-300">
                Offline Design
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-xs">
                Built to work without internet connectivity
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
