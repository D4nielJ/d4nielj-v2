# Instructions for working on Daniel's Personal Website & Interactive CV

This is a Next.js application that serves as a personal brand platform, including a blog, projects showcase, and a role-specific "About" section that functions as an interactive CV with PDF export.

## 🏗 Architecture & Data Flow

- **Single Source of Truth**: All professional content resides in `storage/data/cv.ts` and `storage/data/posts.ts`. Avoid hardcoding personal info in components.
- **Schema**: `storage/schema/cv.ts` and `storage/schema/blog.ts` define the data structures. Content uses `LocalizedString` (`{ en: string, es: string }`) for i18n support.
- **Role-Based Visibility**: CV entries have a `visibleFor` array (e.g., `["frontend", "fullstack"]`). Items without it are visible for all roles.
- **Resolution**: `lib/getCVByRole.ts` resolves a `CV` into a `ResolvedCV` by applying the selected `locale` and filtering data by the active `role`.
- **PDF Generation**: `@react-pdf/renderer` generates CV PDFs via `app/api/cv/pdf/route.tsx`. The document structure in `lib/cv-pdf-document.tsx` must mirror the visual sections of the "About" page.

## 🎨 Tech Stack & Conventions

- **Runtime**: Bootstrapped and managed with **Bun**.
- **Next.js 15+ & React 19**: App Router patterns are strictly followed (Server vs Client components).
- **Tailwind CSS 4**: Uses the new CSS-first configuration. Use modern Tailwind utility classes.
- **Components**:
  - `components/ui/`: Primitive, reusable UI components (Radix/shadcn).
  - `components/about/`: Domain-specific CV/About sections (e.g., `experience-section.tsx`).
- **Icons**: Use `@hugeicons/react` with imports from `@hugeicons/core-free-icons`.

## 🛠 Critical Workflows

- **Adding Content**:
  1. Update `storage/schema/` if adding new fields.
  2. Add data to `storage/data/`.
  3. Ensure `lib/getCVByRole.ts` handles the new fields/sections if they are part of the CV.
  4. Create/update components in `components/about/` or `components/blog/`.
  5. Update `lib/cv-pdf-document.tsx` if the change should reflect in the PDF export.
- **New Labels**: UI-only translations go in `i18n/labels.ts`.

## 📜 Development Scripts

Use `bun` for all execution:

- `bun dev`: Runs the development server.
- `bun build`: Compiles the project for production.
- `bun lint`: Runs ESLint to check for code quality issues.
- `bun start`: Starts the production server.

## ⚠️ Important Patterns & Strictness

- **TypeScript**: **No `any` allowed.** Ensure all data structures are properly typed according to the schemas.
- **Don't hardcode translations**: Always use `LocalizedString` for dynamic content or `uiLabels` from `i18n/labels.ts` for static UI strings.
- **Context Usage**: Access role/locale via `useRole()` and `useLocale()` hooks.
- **PDF Sync**: When changing an "About" section's logic, always check `lib/cv-pdf-document.tsx`. It does not share components with the web view as `@react-pdf` requires specific primitives like `<View>`, `<Text>`, and `<Link>`.
