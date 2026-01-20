"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { ResolvedBlogFigure } from "@/cv/schema/blog";

interface FigureProps {
  figure: ResolvedBlogFigure;
  number: number;
}

export function Figure({ figure, number }: FigureProps) {
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  return (
    <figure className="my-8 space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <figcaption className="text-sm text-muted-foreground">
        <span className="font-semibold">
          {labels.figure} {number}.
        </span>{" "}
        {figure.caption}
      </figcaption>
    </figure>
  );
}
