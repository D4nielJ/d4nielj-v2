# Personal Website & Interactive CV

A high-performance personal branding platform built with Next.js 15 and React 19. This project serves as a comprehensive professional hub, featuring a blog, an automated project showcase via the GitHub API, and an interactive CV system with role-based filtering and PDF export capabilities.

## Key Features

### Interactive CV System
- **Role-Based Views**: Tailors content visibility based on professional roles (e.g., Frontend, Fullstack, Backend).
- **Single Source of Truth**: Professional data is managed through a central TypeScript-validated storage system.
- **PDF Export**: Dynamic generation of resumes using `@react-pdf/renderer` that mirrors the web layout.
- **I18n Support**: Full internationalization for all professional content and UI labels.

### GitHub Integration
- **Automated Projects Showcase**: Dynamically fetches and displays repositories using the GitHub REST API.
- **Profile Statistics**: Real-time display of GitHub contributions, followers, and language distribution.
- **Repository Management**: Built-in support for multiple cloning methods, including HTTPS, SSH, and the GitHub CLI.

### Modern Architecture
- **Next.js 15+ & React 19**: Utilizes the latest App Router patterns, Server Components, and React 19 features.
- **Tailwind CSS 4**: Implements the newest CSS-first configuration and utility engine.
- **Type Safety**: Strict TypeScript implementation across the entire codebase with no `any` types allowed.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://www.radix-ui.com) / [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Hugeicons](https://hugeicons.com)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org)

## Getting Started

### Prerequisites

This project requires **Bun** as the primary runtime and package manager.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/d4nielj/interactive-cv.git
   cd interactive-cv
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add your GitHub token for API access:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```

### Development Scripts

- `bun dev`: Starts the development server.
- `bun build`: Compiles the application for production.
- `bun lint`: Runs ESLint for code quality checks.
- `bun start`: Launches the production server.

## Data Management

### Professional Content
All data is stored in the `cv/data/` directory. The structure is validated against TypeScript schemas located in `cv/schema/`.

- `cv/data/cv.ts`: Contains professional experience, education, and skills.
- `cv/data/posts.ts`: Stores blog content and metadata.

### Internationalization
The application supports multiple languages through:
- `i18n/labels.ts`: Static UI translations.
- `LocalizedString` type: Used for dynamic content (`{ en: string, es: string }`).

## Workflows

### Adding Content
To add new CV entries or blog posts:
1. Ensure the schema in `cv/schema/` supports any new fields.
2. Update the data in `cv/data/`.
3. Verify the resolution logic in `lib/getCVByRole.ts` if adding new CV sections.

### PDF Synchronization
Since `@react-pdf` uses specific primitives (`<View>`, `<Text>`), changes to the layout of the "About" section must be manually reflected in `lib/cv-pdf-document.tsx` to maintain consistency between the web view and the exported PDF.
