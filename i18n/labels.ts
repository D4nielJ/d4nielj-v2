import { Locale } from "@/cv/schema/cv";

export const uiLabels: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    home: "Daniel J",
    cv: "About",
    blog: "Blog",
    // CV sections
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    reasoning: "Why Me?",
    downloadPdf: "Download PDF",
    viewAs: "View as:",
    language: "Language:",
    theme: "Theme:",
    // Blog
    figure: "Fig.",
    readMore: "Read more",
    recentPosts: "Recent Posts",
    // Footer
    viewSourceCode: "View source code",
  },
  es: {
    // Navigation
    home: "Daniel J",
    cv: "About",
    blog: "Blog",
    // CV sections
    experience: "Experiencia",
    projects: "Proyectos",
    skills: "Habilidades",
    education: "Educación",
    reasoning: "¿Por qué yo?",
    downloadPdf: "Descargar PDF",
    viewAs: "Ver como:",
    language: "Idioma:",
    theme: "Tema:",
    // Blog
    figure: "Fig.",
    readMore: "Leer más",
    recentPosts: "Publicaciones Recientes",
    // Footer
    viewSourceCode: "Ver código fuente",
  },
};
