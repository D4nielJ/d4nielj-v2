"use client";

import { useTheme, Theme } from "@/app/theme-provider";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun01Icon,
  Moon01Icon,
  ComputerIcon,
} from "@hugeicons/core-free-icons";

const themeIcons: Record<Theme, React.ReactNode> = {
  light: <HugeiconsIcon icon={Sun01Icon} className="size-3.5" />,
  dark: <HugeiconsIcon icon={Moon01Icon} className="size-3.5" />,
  system: <HugeiconsIcon icon={ComputerIcon} className="size-3.5" />,
};

const themes: Theme[] = ["light", "dark", "system"];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-1">
      {themes.map((t) => (
        <Button
          key={t}
          variant={theme === t ? "default" : "outline"}
          size="icon-xs"
          onClick={() => setTheme(t)}
          aria-label={`Set ${t} theme`}
        >
          {themeIcons[t]}
        </Button>
      ))}
    </div>
  );
}
