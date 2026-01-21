"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  BaseGrid,
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

export function NotFoundView() {
  const t = useTranslations("notFound");
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = () => {
      router.push("/");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <div
          ref={containerRef}
          tabIndex={-1}
          className="flex flex-1 justify-center items-center py-16 outline-none lg:py-32"
        >
          <Card className="w-full">
            {/* Terminal header */}
            <div className="border-border flex items-center gap-2 px-4 py-2 border-b">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-foreground/20" />
                <span className="size-2.5 rounded-full bg-foreground/20" />
                <span className="size-2.5 rounded-full bg-foreground/20" />
              </div>
              <span className="text-muted-foreground ml-2 font-mono">
                Terminal
              </span>
            </div>

            {/* Terminal body */}
            <CardContent className="p-4 space-y-3 font-mono text-xs">
              {/* Command that failed */}
              <div className="text-foreground">
                <span className="text-muted-foreground">~ </span>
                <span>cd {pathname}</span>
              </div>

              {/* Error output */}
              <div className="text-muted-foreground">
                {t("error", { path: pathname })}
              </div>

              {/* Suggested command */}
              <div className="text-foreground pt-2">
                <span className="text-muted-foreground">~ </span>
                <Link
                  href="/"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  cd ~
                </Link>
                <span className="text-muted-foreground ml-1 animate-pulse">
                  ▋
                </span>
              </div>

              {/* Hint */}
              <p className="text-muted-foreground pt-2">{t("hint")}</p>
            </CardContent>
          </Card>
        </div>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
