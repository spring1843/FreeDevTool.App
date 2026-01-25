import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

export default function Home() {
  const { filteredToolsData } = useSearch();

  /* ---------------- HERO SLIDER ---------------- */
  const slides = [
    {
      title: "Your Data Never Leaves Your Device",
      description:
        "No back-end design. All processing happens entirely in your browser. Your data is never sent to any server.",
    },
    {
      title: "No Cookies, No Tracking, No Ads",
      description:
        "No cookies, tracking pixels, or ads. Only browser local storage for your preferences. No external dependencies.",
    },
    {
      title: "Free & Open Source",
      description:
        "Designed for ultimate privacy and security. Inspect the code yourself.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  /* ---------------- CLEAN SSR REMNANT ---------------- */
  useEffect(() => {
    const ssrDirectory = document.getElementById("ssr-tool-directory");
    if (ssrDirectory) ssrDirectory.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* ================= HERO / TRUST SLIDER ================= */}
      <div className="relative mb-14">
        {/* GLASS SLIDER */}
        <div
          className="
            overflow-hidden rounded-lg
            bg-white/70 backdrop-blur-xl
            border border-slate-300 hover:border-slate-400
            dark:bg-color dark:border-white/10
          "
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8"
              >
                <div className="max-w-full text-center lg:text-left">
                  <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">
                    {slide.title}
                  </h1>
                  <p className=" mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg"
                    >
                      Open Source
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-red-500 text-red-500 dark:text-red-400 rounded-lg"
                    >
                      Safe & Secure
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-500 dark:text-green-400 rounded-lg"
                    >
                      Free
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-500 dark:text-purple-400 rounded-lg"
                    >
                      Offline
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 pb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 w-4 rounded-lg transition",
                  currentSlide === index
                    ? "bg-blue-500"
                    : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= TOOL SECTIONS ================= */}
      <div className="space-y-16">
        {Object.entries(filteredToolsData).map(([section, data]) => (
          <div key={section}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {section}
              </h2>
              <span
                className="
                  text-xs px-2 py-1 rounded-lg
                  bg-slate-100 text-slate-600 border border-slate-300
                  dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700
                "
              >
                {data.tools.length} Tools
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.tools.map(tool => (
                <Link key={tool.path} href={tool.path}>
                  <a href={tool.path} className="block">
                    <Card
                      className="
                        group h-full cursor-pointer rounded-lg p-6 transition-all
                        bg-white/70 backdrop-blur-lg
                        border border-slate-200 hover:border-slate-300
                        dark:bg-color dark:border-slate-700 dark:hover:border-slate-500
                      "
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3
                          className="
                            text-lg font-semibold transition-colors
                            text-slate-900 dark:text-slate-100
                            group-hover:text-blue-500 dark:group-hover:text-blue-400
                          "
                        >
                          {tool.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <p className="text-sm mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                        {tool.metadata.description}
                      </p>

                      <span
                        className="
                          text-xs px-2 py-1 rounded-lg
                          bg-slate-100 text-slate-600 border border-slate-300
                          dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700
                        "
                      >
                        {tool.shortcut}
                      </span>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
