import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { cvData } from "@/storage/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import { CVPdfDocument } from "@/lib/cv-pdf-document";
import { Locale } from "@/storage/schema/cv";
import { VisibilityRole } from "@/storage/schema/cv";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  es: esMessages,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = (searchParams.get("locale") || "en") as Locale;
  const role = (searchParams.get("role") || "fullstack") as VisibilityRole;

  const cv = getCVByRole(cvData, locale, role);
  const localeMessages = messages[locale];

  const pdfBuffer = await renderToBuffer(
    <CVPdfDocument cv={cv} messages={localeMessages} />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${role}-${locale}.pdf"`,
    },
  });
}
