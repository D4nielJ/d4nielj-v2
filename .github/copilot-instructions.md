# Copilot Instructions for Interactive CV

Expert coding assistant for the Interactive CV project, a Next.js application that renders a role-specific and localized CV for web and PDF.

## 🏗 Architecture & Data Flow

- **Single Source of Truth**: All CV content resides in `cv/data/cv.ts`. Avoid hardcoding personal info in components.
- **Schema**: `cv/schema/cv.ts` defines the structure. Content uses `LocalizedString` (`{ en: string, es: string }`) for i18n.
- **Role-Based Visibility**: Entries have a `visibleFor` array (e.g., `["frontend", "fullstack"]`). Items without it are visible to all.
- **Resolution**: `lib/getCVByRole.ts` resolves a `CV` into a `ResolvedCV` by applying the selected `locale` and filtering by `role`.
- **PDF Generation**: `@react-pdf/renderer` generates PDFs via `app/api/cv/pdf/route.tsx`. The document structure in `lib/cv-pdf-document.tsx` should mirror the visual sections of the web view.

## 🎨 Tech Stack & Conventions

- **Next.js 15+ & React 19**: App Router patterns apply.
- **Tailwind CSS 4**: Uses CSS-first configuration. Use modern Tailwind utility classes.
- **Components**:
  - `components/ui/`: Primitive, reusable UI components (Radix/shadcn).
  - `components/cv/`: Domain-specific CV sections (e.g., `experience-section.tsx`).
- **Icons**: Use `@hugeicons/react`.

## 🛠 Critical Workflows

- **Adding Content**:
  1. Update `cv/schema/cv.ts` if adding new fields.
  2. Add data to `cv/data/cv.ts`.
  3. Ensure `lib/getCVByRole.ts` handles the new fields/sections.
  4. Create/update components in `components/cv/`.
  5. Update `lib/cv-pdf-document.tsx` to include the section in the PDF export.
- **New Labels**: UI-only translations go in `i18n/labels.ts`.

## ⚠️ Important Patterns

- **Don't hardcode translations**: Always use `LocalizedString` for content or `uiLabels` from `i18n/labels.ts` for UI strings.
- **Context Usage**: Access role/locale via `useRole()` and `useLocale()` hooks.
- **PDF Sync**: When changing a CV section's logic, always check `lib/cv-pdf-document.tsx` as it doesn't share components with the web view (PDF requires specific primitives like `<View>`, `<Text>`, `<Link>`).
