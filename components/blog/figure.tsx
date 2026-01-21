import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ResolvedBlogFigure } from "@/storage/schema/blog";

interface FigureProps {
  figure: ResolvedBlogFigure;
  number: number;
}

export async function Figure({ figure, number }: FigureProps) {
  const t = await getTranslations("blog");

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
          {t("figure")} {number}.
        </span>{" "}
        {figure.caption}
      </figcaption>
    </figure>
  );
}
