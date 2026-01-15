# Personal CV Web App – Development Plan

This document describes a step-by-step plan to implement a **context-aware personal CV web application** using **Next.js (App Router)**.  
The app uses a **JSON-based CV as the single source of truth**, supports **i18n**, **dynamic PDF generation**, and **theme switching**.

Assumptions:

- A fresh **Next.js App Router project**
- Shared UI components, Tailwind.
- TypeScript is enabled.

---

## 1. Define the JSON Schema (Source of Truth)

### Goal

Create a strongly typed, extensible schema that:

- Separates content from presentation
- Supports multiple locales
- Supports multiple visibility roles (fullstack, frontend, backend, test automation, etc.)

### Tasks

- Create a `/cv/schema` folder
- Define TypeScript types for:
  - Profile
  - Experience
  - Projects
  - Skills
  - Education
  - Reasoning cases
- Include:
  - `LocalizedString` type
  - `VisibilityRole` type

### Output

- `/cv/schema/cv.ts`
- All CV-related types exported from a single entry point

---

## 2. Write JSON with Mock Data

### Goal

Populate a realistic CV using the schema to validate it early.

### Tasks

- Create a `/cv/data` folder
- Write a `cv.json` or `cv.ts` file with:
  - Realistic job experience
  - Multiple languages (`en`, `es`)
  - `visibleFor` rules applied selectively
- Ensure:
  - No UI assumptions are baked into the data
  - Content can scale (add roles, projects, etc.)

### Output

- `/cv/data/cv.ts`
- Schema validation via TypeScript compiler

---

## 3. CV Data Access & Filtering Layer

### Goal

Create a small domain layer that prepares CV data for the UI.

### Tasks

- Implement a pure function:
  - `getCVByRole(cv, locale, role)`
- Responsibilities:
  - Filter sections based on `visibleFor`
  - Resolve `LocalizedString` → string
  - Remove empty or irrelevant sections

### Output

- `/lib/getCVByRole.ts`
- Unit-testable, framework-agnostic logic

---

## 4. UI Visualization of the CV Data

### Goal

Render the CV data in a clean, readable, and adaptable UI. (Make sure to use existent components in /components/ui)

### Tasks

- Create container components:
  - `<ProfileSection />`
  - `<ExperienceSection />`
  - `<ProjectsSection />`
  - `<SkillsSection />`
  - `<ReasoningSection />`
- Map schema → components (no business logic in components)
- Ensure:
  - Mobile-first layout
  - Clear visual hierarchy
  - Scan-friendly content for recruiters

### Output

- `/components/cv/*`
- `/app/page.tsx` renders CV via filtered data

---

## 5. i18n Locale Implementation

### Goal

Support multiple languages using the same CV data.

### Tasks

- Define supported locales: `en`, `es`
- Implement:
  - Locale context/provider
  - Language switcher component
- Ensure:
  - Locale affects both UI copy and CV content
  - Fallback to default locale if translation is missing

### Output

- `/i18n/locale-provider.tsx`
- `/components/LocaleSwitcher.tsx`
- Locale-aware CV rendering

---

## 6. Context / Role Switch (Fullstack, Frontend, Backend, Test Automation, etc.)

### Goal

Adapt the CV to the viewer’s intent.

### Tasks

- Define supported roles:
  - `fullstack`
  - `frontend`
  - `backend`
  - `test-automation`
- Add a role switcher UI
- Re-render CV on role change using filtering layer

### Output

- `/context/role-context.tsx`
- `<RoleSwitcher />`
- Role-aware CV experience

---

## 7. PDF Generation & Download Button

### Goal

Allow users to download a **PDF generated dynamically** from the current CV view.

### Tasks

- Create a server-side PDF generator using:
  - React PDF, Playwright, or similar
- Ensure:
  - PDF respects current locale
  - PDF respects current role
- Add a prominent “Download PDF” button
- Use a server action or API route to generate the file

### Output

- `/app/api/cv/pdf/route.ts`
- `generatePdf(cvData)` utility
- `<DownloadPdfButton />`

---

## 8. Light / Dark / System Theme Support

### Goal

Respect user preferences and accessibility.

### Tasks

- Implement theme handling:
  - `light`
  - `dark`
  - `system`
- Store preference in local storage
- Apply theme consistently across:
  - UI
  - PDF (if applicable)

### Output

- `/app/theme-provider.tsx`
- `<ThemeSwitcher />`
- CSS variables or Tailwind theme support

---

## 9. Final Polish & UX Enhancements

### Optional Enhancements

- Loading states for PDF generation
- Print-friendly layout
- Accessibility audit (contrast, keyboard nav)
- SEO metadata (OpenGraph, resume keywords)
- Responsive layout
- Minimalist design
- Clean code

---

## 10. Guiding Principle

> **“The CV adapts to the user, not the other way around.”**

This project is not about showing everything —  
it’s about showing the _right thing_, at the _right time_, in the _right format_.

---

## Suggested Development Order

1. JSON schema
2. Mock CV data
3. Filtering logic
4. UI rendering
5. i18n
6. View mode switching
7. PDF generation
8. Theme support

---

## Further considerations for development

- Project bootstrapped with bun
- Run `bun run build` and `bun run dev` for automated tests. Fix any issues that arise.
