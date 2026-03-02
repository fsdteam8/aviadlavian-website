"use client";

import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;

const DisplaySetting = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [fontSize, setFontSize] = React.useState(16);

  React.useEffect(() => {
    const savedSize = window.localStorage.getItem("dashboard-font-size");
    if (savedSize) {
      const parsed = Number(savedSize);
      if (!Number.isNaN(parsed)) {
        setFontSize(parsed);
      }
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    window.localStorage.setItem("dashboard-font-size", String(fontSize));
  }, [fontSize]);

  const isDark = resolvedTheme === "dark";

  const handleNightModeToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <section className="rounded-b-xl bg-slate-100 p-4 transition-colors sm:p-6 dark:bg-slate-900">
      <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Display Settings
      </h2>

      <div className="mt-6 space-y-5 text-sm text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-3">
          <span>Night Mode :</span>
          <button
            type="button"
            onClick={handleNightModeToggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-600 px-2 py-0.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/30"
          >
            <Moon size={13} />
            {isDark ? "On" : "Off"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span>Font Size :</span>
          <div className="inline-flex overflow-hidden rounded-full border border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300">
            <button
              type="button"
              onClick={() =>
                setFontSize((prev) => Math.max(MIN_FONT_SIZE, prev - 1))
              }
              className="px-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30"
              aria-label="Decrease font size"
            >
              -
            </button>
            <span className="border-x border-blue-600 px-2 text-xs dark:border-blue-400">
              A
            </span>
            <button
              type="button"
              onClick={() =>
                setFontSize((prev) => Math.min(MAX_FONT_SIZE, prev + 1))
              }
              className="px-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30"
              aria-label="Increase font size"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplaySetting;
