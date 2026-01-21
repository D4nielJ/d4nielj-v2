"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Tick02Icon,
  SourceCodeIcon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface CloneDropdownProps {
  cloneUrl: string;
  sshUrl: string;
  fullName: string;
}

type CloneOption = "https" | "ssh" | "cli";

export function CloneDropdown({
  cloneUrl,
  sshUrl,
  fullName,
}: CloneDropdownProps) {
  const t = useTranslations("github");
  const [copied, setCopied] = useState<CloneOption | null>(null);

  const cloneOptions: { key: CloneOption; label: string; value: string }[] = [
    { key: "https", label: t("cloneHttps"), value: cloneUrl },
    { key: "ssh", label: t("cloneSsh"), value: sshUrl },
    { key: "cli", label: t("cloneCli"), value: `gh repo clone ${fullName}` },
  ];

  const handleCopy = async (option: CloneOption, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(option);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="gap-1.5 cursor-pointer">
          <HugeiconsIcon icon={SourceCodeIcon} className="size-3.5" />
          {t("clone")}
          <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {cloneOptions.map(({ key, label, value }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleCopy(key, value)}
            className="flex justify-between items-center gap-2 cursor-pointer"
          >
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="text-xs font-medium">{label}</span>
              <code className="text-[10px] text-muted-foreground truncate block">
                {value}
              </code>
            </div>
            <HugeiconsIcon
              icon={copied === key ? Tick02Icon : Copy01Icon}
              className="size-3.5 shrink-0 text-muted-foreground"
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
