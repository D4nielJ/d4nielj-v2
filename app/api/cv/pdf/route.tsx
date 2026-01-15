import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { cvData } from "@/cv/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import { CVPdfDocument } from "@/lib/cv-pdf-document";
import { uiLabels } from "@/i18n/labels";
import { Locale } from "@/cv/schema/cv";
import { VisibilityRole } from "@/cv/schema/cv";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = (searchParams.get("locale") || "en") as Locale;
  const role = (searchParams.get("role") || "fullstack") as VisibilityRole;

  const cv = getCVByRole(cvData, locale, role);
  const labels = uiLabels[locale];

  const pdfBuffer = await renderToBuffer(
    <CVPdfDocument cv={cv} labels={labels} />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${role}-${locale}.pdf"`,
    },
  });
}
