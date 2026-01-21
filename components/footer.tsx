"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { cvData } from "@/storage/data/cv";

const REPO_URL = "https://github.com/D4nielJ/d4nielj-v2";

export function Footer() {
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  const githubLink = cvData.profile.links.find((link) =>
    link.url.includes("github.com"),
  );

  return (
    <footer className="border-t print:hidden">
      <div className="text-muted-foreground container mx-auto max-w-3xl flex flex-col justify-between items-center gap-3 px-4 py-4 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {cvData.profile.name}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${cvData.profile.email}`}
            className="transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <HugeiconsIcon icon={Mail01Icon} className="size-4" />
          </a>

          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <HugeiconsIcon icon={Github01Icon} className="size-4" />
            </a>
          )}

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {labels.viewSourceCode}
          </a>
        </div>
      </div>
    </footer>
  );
}
