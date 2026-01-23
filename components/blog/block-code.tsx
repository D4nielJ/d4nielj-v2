"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Copy01FreeIcons } from "@hugeicons/core-free-icons";
import { ResolvedBlogSection } from "@/storage/schema/blog";
import { cn } from "@/lib/utils";

const BlockCodeCard = ({ section }: { section: ResolvedBlogSection }) => {
  const [copied, setCopied] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    if (!section.content) return;
    navigator.clipboard.writeText(section.content);
    setCopied(true);
    setFading(false);

    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    // start fading shortly before hiding so transition can run
    fadeTimeoutRef.current = window.setTimeout(() => setFading(true), 500);
    hideTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      setFading(false);
    }, 1000);
  };

  return (
    <Card size="sm" className="border bg-secondary/50">
      <CardHeader className="flex items-center justify-between relative">
        {section.language ? (
          <span className="text-xs font-medium">{section.language}</span>
        ) : null}
        <div className="relative">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleCopy}
          >
            <HugeiconsIcon icon={Copy01FreeIcons} className="size-4" />
          </Button>
          {copied && (
            <span
              className={cn(
                "absolute right-0 top-full mt-2 rounded bg-black/90 text-white text-xs px-2 py-1 transition-opacity duration-500 ease-in-out",
                fading ? "opacity-0" : "opacity-100",
              )}
            >
              Copied!
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <code className="text-base">{section.content}</code>
      </CardContent>
    </Card>
  );
};

export default BlockCodeCard;
