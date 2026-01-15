import { CV } from "../schema/cv";

export const cvData: CV = {
  profile: {
    name: "Daniel J.",
    title: {
      en: "Full Stack Engineer & DX Enthusiast",
      es: "Ingeniero Full Stack y Entusiasta de DX",
    },
    email: "daniel@example.com",
    phone: "+1 234 567 890",
    location: {
      en: "Remote / Madrid, Spain",
      es: "Remoto / Madrid, España",
    },
    links: [
      { label: "GitHub", url: "https://github.com/d4nielj" },
      { label: "LinkedIn", url: "https://linkedin.com/in/d4nielj" },
    ],
    summary: {
      en: "Experienced software engineer focused on building scalable web applications and developer tools. Passionate about TypeScript, React, and Node.js.",
      es: "Ingeniero de software con experiencia enfocado en construir aplicaciones web escalables y herramientas para desarrolladores. Apasionado por TypeScript, React y Node.js.",
    },
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      role: {
        en: "Senior Frontend Developer",
        es: "Desarrollador Frontend Senior",
      },
      startDate: "2022-01",
      visibleFor: ["frontend", "fullstack"],
      description: {
        en: "Leading the migration from a monolithic architecture to micro-frontends using Next.js and Tailwind CSS.",
        es: "Liderando la migración de una arquitectura monolítica a micro-frontends usando Next.js y Tailwind CSS.",
      },
      highlights: [
        {
          en: "Reduced bundle size by 40%",
          es: "Reducción del tamaño del bundle en un 40%",
        },
        {
          en: "Implemented a custom component library with Radix UI",
          es: "Implementación de una librería de componentes personalizada con Radix UI",
        },
      ],
      keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "exp-2",
      company: "Backend Wizards",
      role: {
        en: "Software Engineer",
        es: "Ingeniero de Software",
      },
      startDate: "2020-06",
      endDate: "2021-12",
      visibleFor: ["backend", "fullstack"],
      description: {
        en: "Designed and implemented scalable RESTful APIs and background job processing systems.",
        es: "Diseño e implementación de APIs RESTful escalables y sistemas de procesamiento de trabajos en segundo plano.",
      },
      highlights: [
        {
          en: "Optimized database queries, reducing latency by 30%",
          es: "Optimización de consultas a la base de datos, reduciendo la latencia en un 30%",
        },
        {
          en: "Integrated third-party payment gateways (Stripe, PayPal)",
          es: "Integración de pasarelas de pago de terceros (Stripe, PayPal)",
        },
      ],
      keywords: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    },
    {
      id: "exp-3",
      company: "QA Masters",
      role: {
        en: "Test Automation Engineer",
        es: "Ingeniero de Automatización de Pruebas",
      },
      startDate: "2019-01",
      endDate: "2020-05",
      visibleFor: ["test-automation", "fullstack"],
      description: {
        en: "Built and maintained end-to-end testing frameworks using Playwright and Cypress.",
        es: "Construcción y mantenimiento de frameworks de pruebas end-to-end usando Playwright y Cypress.",
      },
      highlights: [
        {
          en: "Achieved 85% test coverage across critical user flows",
          es: "Logré un 85% de cobertura de pruebas en flujos críticos de usuario",
        },
        {
          en: "Reduced regression testing time by 60%",
          es: "Reducción del tiempo de pruebas de regresión en un 60%",
        },
      ],
      keywords: ["Playwright", "Cypress", "Jest", "CI/CD"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Interactive CV",
      description: {
        en: "A context-aware CV application that adapts to the viewer's role and language.",
        es: "Una aplicación de CV sensible al contexto que se adapta al rol e idioma del espectador.",
      },
      visibleFor: ["all"],
      keywords: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/d4nielj/interactive-cv",
    },
    {
      id: "proj-2",
      name: "Component Library",
      description: {
        en: "A reusable React component library with full accessibility support.",
        es: "Una biblioteca de componentes React reutilizable con soporte completo de accesibilidad.",
      },
      visibleFor: ["frontend", "fullstack"],
      keywords: ["React", "Storybook", "Radix UI"],
      github: "https://github.com/d4nielj/component-lib",
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: { en: "Frontend", es: "Frontend" },
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      visibleFor: ["frontend", "fullstack"],
    },
    {
      id: "skill-2",
      category: { en: "Backend", es: "Backend" },
      skills: ["Node.js", "Express", "NestJS", "PostgreSQL", "Prisma"],
      visibleFor: ["backend", "fullstack"],
    },
    {
      id: "skill-3",
      category: { en: "Testing", es: "Pruebas" },
      skills: ["Playwright", "Cypress", "Jest", "Testing Library", "Vitest"],
      visibleFor: ["test-automation", "fullstack"],
    },
    {
      id: "skill-4",
      category: { en: "DevOps & Tools", es: "DevOps y Herramientas" },
      skills: ["Docker", "GitHub Actions", "Vercel", "AWS", "Git"],
      visibleFor: ["all"],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Tech University",
      degree: {
        en: "B.S. in Computer Science",
        es: "Grado en Ingeniería Informática",
      },
      startDate: "2016-09",
      endDate: "2020-06",
    },
  ],
  reasoning: [
    {
      id: "reason-1",
      title: { en: "Why me for Fullstack?", es: "¿Por qué yo para Fullstack?" },
      scenario: {
        en: "Looking for someone who can jump between frontend and backend seamlessly.",
        es: "Buscando a alguien que pueda saltar entre frontend y backend sin problemas.",
      },
      approach: {
        en: "I have experience in both domains, ensuring consistent typing and efficient data flow between client and server.",
        es: "Tengo experiencia en ambos dominios, asegurando un tipado consistente y un flujo de datos eficiente entre cliente y servidor.",
      },
      visibleFor: ["fullstack"],
    },
    {
      id: "reason-2",
      title: { en: "Why me for Frontend?", es: "¿Por qué yo para Frontend?" },
      scenario: {
        en: "Need someone focused on delivering exceptional user experiences.",
        es: "Necesitan a alguien enfocado en entregar experiencias de usuario excepcionales.",
      },
      approach: {
        en: "I specialize in modern React patterns, accessibility, and performance optimization for web applications.",
        es: "Me especializo en patrones modernos de React, accesibilidad y optimización de rendimiento para aplicaciones web.",
      },
      visibleFor: ["frontend"],
    },
  ],
};
