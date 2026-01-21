import { CV } from "../schema/cv";

export const cvData: CV = {
  profile: {
    name: "Daniel Jaramillo",
    title: {
      en: "Software Engineer",
      es: "Ingeniero de Software",
    },
    email: "d4niel.djm@gmail.com",
    phone: "+57 321 698 9816",
    location: {
      en: "Remote / Colombia",
      es: "Remoto / Colombia",
    },
    links: [
      { label: "GitHub", url: "https://github.com/d4nielj" },
      { label: "LinkedIn", url: "https://linkedin.com/in/d4nielj" },
    ],
    summary: {
      en: "Passionate about computer science and software development, I find pleasure in creating fast, efficient, and high-quality systems. Since a young age, I have always liked a good challenge or facing complex problems, which has shaped my career as a Software Engineer. Nowadays, I'm thrilled to leverage the power of modern web technologies and AI to build innovative solutions that make a difference.",
      es: "Apasionado por la informática y el desarrollo de software, encuentro placer en crear sistemas rápidos, eficientes y de alta calidad. Desde joven, siempre me han gustado los buenos desafíos o enfrentar problemas complejos, lo que ha moldeado mi carrera como Ingeniero de Software. Hoy en día, estoy emocionado de aprovechar el poder de las tecnologías web modernas y la IA para construir soluciones innovadoras que marquen la diferencia.",
    },
    roleSummaries: {},
  },
  experience: [
    {
      id: "exp-globant",
      company: "Globant (Client: Disney Parks)",
      role: {
        en: "Test Automation Engineer",
        es: "Ingeniero de Automatización de Pruebas",
      },
      startDate: "2022-03",
      visibleFor: ["test-automation", "fullstack"],
      description: {
        en: "Contributed to comprehensive test coverage, specializing in FIT tests while also developing and executing UI tests to ensure proper front-end functionality.",
        es: "Contribuí a una cobertura de pruebas integral, especializándome en pruebas FIT mientras desarrollaba y ejecutaba pruebas de UI para asegurar el correcto funcionamiento del front-end.",
      },
      highlights: [
        {
          en: "Designed and built a payment framework to integrate a physical cardbot with two POS systems: one for Android devices and another for Windows terminals",
          es: "Diseñé y construí un framework de pagos para integrar un cardbot físico con dos sistemas POS: uno para dispositivos Android y otro para terminales Windows",
        },
        {
          en: "Developed an automation framework for Disney Parks' POS ticketing system, overcoming challenges related to image-based and OCR-only selectors",
          es: "Desarrollé un framework de automatización para el sistema de ticketing POS de Disney Parks, superando desafíos relacionados con selectores basados en imágenes y OCR",
        },
        {
          en: "Collaborated with peers to enhance code quality through best practices, clean coding, and improved documentation",
          es: "Colaboré con compañeros para mejorar la calidad del código mediante mejores prácticas, código limpio y documentación mejorada",
        },
      ],
      keywords: [
        "Webdriver.io",
        "Selenium",
        "TypeScript",
        "Java",
        "Appium",
        "CI/CD",
      ],
    },
    {
      id: "exp-freelance",
      company: "Freelance",
      role: {
        en: "Web Developer",
        es: "Desarrollador Web",
      },
      startDate: "2021-01",
      visibleFor: ["frontend", "fullstack", "backend"],
      description: {
        en: "Designed high quality, easy to maintain web apps from conception to implementation using React, Redux, NextJS, PostgreSQL, Ruby on Rails, and more.",
        es: "Diseñé aplicaciones web de alta calidad y fáciles de mantener desde la concepción hasta la implementación usando React, Redux, NextJS, PostgreSQL, Ruby on Rails y más.",
      },
      highlights: [
        {
          en: "Practiced Test Driven Development, regularly wrote clean code, debugged, and reviewed code for high caliber quality assurance",
          es: "Practiqué Desarrollo Guiado por Pruebas, escribí código limpio regularmente, depuré y revisé código para aseguramiento de calidad de alto nivel",
        },
        {
          en: "Designed frontend applications with user-centric approach, incorporating UI and UX best practices to create streamlined, accessible web apps",
          es: "Diseñé aplicaciones frontend con enfoque centrado en el usuario, incorporando mejores prácticas de UI y UX para crear aplicaciones web accesibles y optimizadas",
        },
        {
          en: "Created a variety of Full Stack, Front end, and Back end projects in accordance with client needs",
          es: "Creé una variedad de proyectos Full Stack, Front end y Back end de acuerdo con las necesidades del cliente",
        },
      ],
      keywords: [
        "React",
        "Redux",
        "Next.js",
        "PostgreSQL",
        "Ruby on Rails",
        "TDD",
      ],
    },
    {
      id: "exp-microverse-reviewer",
      company: "Microverse",
      role: {
        en: "Code Reviewer",
        es: "Revisor de Código",
      },
      startDate: "2021-10",
      visibleFor: ["fullstack", "frontend", "backend"],
      description: {
        en: "Developed code review guidelines on JavaScript, React.js/Redux, and Ruby on Rails for part-time code reviewers in a fast-paced startup.",
        es: "Desarrollé guías de revisión de código en JavaScript, React.js/Redux y Ruby on Rails para revisores de código a tiempo parcial en una startup de ritmo acelerado.",
      },
      highlights: [
        {
          en: "Provided quality control and appropriate feedback for code reviewers within a cross-functional team to optimize the code review process",
          es: "Proporcioné control de calidad y retroalimentación apropiada para revisores de código dentro de un equipo multifuncional para optimizar el proceso de revisión",
        },
        {
          en: "Helped 300+ students debug their code and understand technical concepts",
          es: "Ayudé a más de 300 estudiantes a depurar su código y entender conceptos técnicos",
        },
        {
          en: "Created and coordinated a continuous learning program for junior code reviewers",
          es: "Creé y coordiné un programa de aprendizaje continuo para revisores de código junior",
        },
      ],
      keywords: [
        "JavaScript",
        "React",
        "Redux",
        "Ruby on Rails",
        "Code Review",
        "Mentoring",
      ],
    },
    {
      id: "exp-mp-agencia",
      company: "MP La Agencia",
      role: {
        en: "Graphic Designer",
        es: "Diseñador Gráfico",
      },
      startDate: "2019-03",
      endDate: "2020-09",
      visibleFor: ["frontend"],
      description: {
        en: "Acted as team lead to ensure prompt delivery and providing quality outputs. Designed mockups and digital content to increase brand awareness and customer engagement.",
        es: "Actué como líder de equipo para asegurar entregas puntuales y resultados de calidad. Diseñé mockups y contenido digital para aumentar el reconocimiento de marca y engagement del cliente.",
      },
      highlights: [
        {
          en: "In charge of company rebranding and relaunch, personally designed new branding and implementation",
          es: "A cargo del rebranding y relanzamiento de la empresa, diseñé personalmente la nueva marca e implementación",
        },
        {
          en: "Organized relaunch campaign to promote new brand awareness",
          es: "Organicé campaña de relanzamiento para promover el reconocimiento de la nueva marca",
        },
      ],
      keywords: ["UI Design", "Branding", "Adobe Suite", "Team Lead"],
    },
  ],
  projects: [
    {
      id: "proj-interactive-cv",
      name: "Interactive CV",
      description: {
        en: "A context-aware CV application that adapts to the viewer's role and language. Built with Next.js, TypeScript, and Tailwind CSS.",
        es: "Una aplicación de CV sensible al contexto que se adapta al rol e idioma del espectador. Construida con Next.js, TypeScript y Tailwind CSS.",
      },
      visibleFor: ["all"],
      keywords: ["Next.js", "TypeScript", "Tailwind CSS", "React PDF"],
      github: "https://github.com/D4nielJ/d4nielj-v2/",
    },
    {
      id: "proj-be4t",
      name: "Be4t",
      description: {
        en: "A powerful showcase of Front-end abilities, built under less than 48 hours. Consumes the DISCOGS API to create a beautiful, responsive interface that showcases artists and albums.",
        es: "Una poderosa demostración de habilidades Front-end, construida en menos de 48 horas. Consume la API de DISCOGS para crear una interfaz hermosa y responsiva que muestra artistas y álbumes.",
      },
      visibleFor: ["frontend", "fullstack"],
      keywords: ["Next.js", "API Integration", "Responsive Design"],
      github: "https://github.com/d4nielj/be4t",
    },
    {
      id: "proj-pokemon",
      name: "Pokemon Capstone",
      description: {
        en: "A capstone project built for the Microverse Curriculum. Users can consult information about their favorite Pokemon and interact with the community.",
        es: "Un proyecto final construido para el Currículum de Microverse. Los usuarios pueden consultar información sobre su Pokemon favorito e interactuar con la comunidad.",
      },
      visibleFor: ["frontend", "fullstack"],
      keywords: ["React", "Redux", "API Integration"],
      github: "https://github.com/d4nielj/pokemon-capstone",
    },
  ],
  skills: [
    {
      id: "skill-testing",
      category: { en: "Testing & Automation", es: "Pruebas y Automatización" },
      skills: [
        "Webdriver.io",
        "Cypress",
        "Selenium",
        "Serenity",
        "Appium",
        "Jest",
        "TDD",
      ],
      visibleFor: ["test-automation", "fullstack"],
    },
    {
      id: "skill-frontend",
      category: { en: "Frontend", es: "Frontend" },
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Redux",
        "Tailwind CSS",
        "CSS",
        "HTML",
      ],
      visibleFor: ["frontend", "fullstack"],
    },
    {
      id: "skill-backend",
      category: { en: "Backend", es: "Backend" },
      skills: ["Node.js", "Ruby on Rails", "Spring Framework", "Java", "C#"],
      visibleFor: ["backend", "fullstack"],
    },
    {
      id: "skill-databases",
      category: { en: "Databases", es: "Bases de Datos" },
      skills: ["PostgreSQL", "MySQL", "MariaDB", "SQLite", "MongoDB", "Redis"],
      visibleFor: ["backend", "fullstack"],
    },
    {
      id: "skill-tools",
      category: { en: "DevOps & Tools", es: "DevOps y Herramientas" },
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "CI/CD",
        "Mobile/Responsive Development",
      ],
      visibleFor: ["all"],
    },
    {
      id: "skill-professional",
      category: { en: "Professional", es: "Profesional" },
      skills: ["Remote Pair-Programming", "Teamwork", "Mentoring", "SDLC"],
      visibleFor: ["all"],
    },
  ],
  education: [
    {
      id: "edu-microverse",
      institution: "Microverse",
      degree: {
        en: "Remote Full Stack Web Development Program",
        es: "Programa Remoto de Desarrollo Web Full Stack",
      },
      startDate: "2021-06",
      endDate: "2022-01",
    },
    {
      id: "edu-asa",
      institution: "Academia Superior de Artes",
      degree: {
        en: "Technology in Advertising and Graphic Design",
        es: "Tecnología en Publicidad y Diseño Gráfico",
      },
      startDate: "2015-01",
      endDate: "2017-12",
    },
  ],
  reasoning: [
    {
      id: "reason-tae",
      title: {
        en: "Why me for Test Automation?",
        es: "¿Por qué yo para Automatización de Pruebas?",
      },
      scenario: {
        en: "Looking for someone who can build robust, maintainable test automation frameworks.",
        es: "Buscando a alguien que pueda construir frameworks de automatización de pruebas robustos y mantenibles.",
      },
      approach: {
        en: "With 3+ years at Globant working on Disney Parks' complex POS systems, I've built frameworks handling physical hardware integration, image-based selectors, and cross-platform testing. My pragmatic coding style ensures maintainable, scalable automation.",
        es: "Con más de 3 años en Globant trabajando en los complejos sistemas POS de Disney Parks, he construido frameworks que manejan integración de hardware físico, selectores basados en imágenes y pruebas multiplataforma. Mi estilo de código pragmático asegura automatización mantenible y escalable.",
      },
      visibleFor: ["test-automation"],
    },
    {
      id: "reason-fullstack",
      title: { en: "Why me for Fullstack?", es: "¿Por qué yo para Fullstack?" },
      scenario: {
        en: "Looking for someone who can jump between frontend and backend seamlessly.",
        es: "Buscando a alguien que pueda saltar entre frontend y backend sin problemas.",
      },
      approach: {
        en: "My experience spans from React/Next.js frontends to Ruby on Rails and Node.js backends. With 4 years at Globant working on Disney Parks' complex systems and freelance projects, I've built and work on end-to-end solutions that deliver great user experiences and robust functionality.",
        es: "Mi experiencia abarca desde frontends en React/Next.js hasta backends en Ruby on Rails y Node.js. Con 4 años en Globant trabajando en los complejos sistemas de Disney Parks y proyectos freelance, he construido y trabajado en soluciones de extremo a extremo que ofrecen excelentes experiencias de usuario y funcionalidad robusta.",
      },
      visibleFor: ["fullstack"],
    },
    {
      id: "reason-frontend",
      title: { en: "Why me for Frontend?", es: "¿Por qué yo para Frontend?" },
      scenario: {
        en: "Need someone focused on delivering exceptional user experiences.",
        es: "Necesitan a alguien enfocado en entregar experiencias de usuario excepcionales.",
      },
      approach: {
        en: "My background as a graphic designer combined with frontend development creates a unique skill set. I don't just code interfaces—I understand visual hierarchy, accessibility, and user-centric design principles that make applications truly shine.",
        es: "Mi experiencia como diseñador gráfico combinada con desarrollo frontend crea un conjunto de habilidades único. No solo codifico interfaces—entiendo jerarquía visual, accesibilidad y principios de diseño centrado en el usuario que hacen que las aplicaciones realmente brillen.",
      },
      visibleFor: ["frontend"],
    },
  ],
};
