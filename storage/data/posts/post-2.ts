import { BlogPost } from "@/storage/schema/blog";

export const post2: BlogPost = {
  slug: "ai-is-your-employee",
  title: {
    en: "AI is your employee. Be the better boss.",
    es: "La IA es tu empleado. Sé el mejor jefe.",
  },
  abstract: {
    en: "We live in a new era. Programming doesn’t look anything like what it used to five years ago. Here is how to stay in control of your AI workflow.",
    es: "Vivimos en una nueva era. La programación no se parece en nada a lo que era hace cinco años. Así es como puedes mantener el control de tu flujo de trabajo con IA.",
  },
  publishedAt: "2025-01-23",
  tags: ["AI", "Workflow", "Productivity"],
  figures: [
    {
      id: "fig-1",
      src: "/images/blog/post-2/image.png",
      alt: {
        en: "Developer frustrated at its computer",
        es: "Desarrollador frustrado en su computadora",
      },
      caption: {
        en: "No one wants to be this guy.",
        es: "Nadie quiere ser este tipo.",
      },
    },
  ],
  sections: [
    {
      type: "paragraph",
      content: {
        en: "Yes, the paradigm has changed, is undeniable. Programming doesn’t look anything like what it used to five years ago, let alone ten or twenty. AI tools are everywhere: from our command line to the cloud. And they’re meant to be used.",
        es: "Vivimos en una nueva era. La programación no se parece en nada a lo que era hace cinco años, y mucho menos hace diez o veinte. Las herramientas de IA están en todas partes: desde nuestra línea de comandos hasta la nube. Y están hechas para ser usadas.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "But you need to know **how** to use them.",
        es: "Pero necesitas saber **cómo** usarlas.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "I know this isn’t news to you, but bear with me. The real challenge, and the people who will win this race, are those who learn how to use AI efficiently and responsibly. You don’t want to be the person who doesn’t understand what AI is generating.",
        es: "Sé que esto no es noticia para ti, pero ten paciencia. El verdadero desafío, y las personas que ganarán esta carrera, son aquellas que aprendan a usar la IA de manera eficiente y responsable. No querrás ser la persona que no entiende lo que la IA está generando.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Why? Simple: bugs will flow, and things will spiral out of control very quickly.",
        es: "¿Por qué? Simple: los errores fluirán y las cosas se saldrán de control muy rápidamente.",
      },
    },
    {
      type: "figure",
      figureId: "fig-1",
    },
    {
      type: "paragraph",
      content: {
        en: "So how do you stay in control and remain the captain of the ship? Here’s the four-step workflow that’s been working for me.",
        es: "Entonces, ¿cómo mantienes el control y sigues siendo el capitán del barco? Aquí está el flujo de trabajo de cuatro pasos que me ha estado funcionando.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        en: "1. Learn the Fundamentals",
        es: "1. Aprende los Fundamentos",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "This is simple: you still need to be a programmer. You still need to do your job.",
        es: "Esto es simple: todavía necesitas ser programador. Todavía necesitas hacer tu trabajo.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "If you don’t understand how something works, don’t expect AI to guide you safely through it. It’s no secret that a single prompt to modern LLMs can generate hundreds, or even thousands, of lines of code. That’s powerful, and it’s part of why we use these tools.",
        es: "Si no entiendes cómo funciona algo, no esperes que la IA te guíe de manera segura a través de ello. No es un secreto que un solo prompt a los LLM modernos puede generar cientos, o incluso miles, de líneas de código. Eso es poderoso, y es parte de por qué usamos estas herramientas.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "But you must understand what the model is giving you.",
        es: "Pero debes entender lo que el modelo te está dando.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "The criteria you use to judge AI-generated code is, at the end of the day, the new value proposition developers bring. Without that judgment, AI would most definitely replace our jobs.",
        es: "El criterio que usas para juzgar el código generado por IA es, al final del día, la nueva propuesta de valor que aportan los desarrolladores. Sin ese juicio, la IA definitivamente reemplazaría nuestros trabajos.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "The good news is that AI is also very good at teaching new concepts and technologies. Still, nothing beats going to the source. Direct documentation from the tech stack you’re using is one of your most valuable resources.",
        es: "La buena noticia es que la IA también es muy buena enseñando nuevos conceptos y tecnologías. Aún así, nada supera ir a la fuente. La documentación directa de la tecnología que estás usando es uno de tus recursos más valiosos.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Use it.",
        es: "Úsala.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        en: "2. Prompt Well and Provide the Right Context",
        es: "2. Promptea Bien y Proporciona el Contexto Adecuado",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Most people know how to prompt an AI. Very few know how to do it well.",
        es: "La mayoría de la gente sabe cómo hacer un prompt a una IA. Muy pocos saben cómo hacerlo bien.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Here are a few principles I rely on.",
        es: "Aquí hay algunos principios en los que confío.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        en: "Provide Enough Context Every Time",
        es: "Proporciona Suficiente Contexto Cada Vez",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Nowadays, most AI agents allow you to define files, folders, or rules that are sent to the model with every prompt. These are incredibly powerful tools, and when used correctly, they dramatically improve results.",
        es: "Hoy en día, la mayoría de los agentes de IA te permiten definir archivos, carpetas o reglas que se envían al modelo con cada prompt. Estas son herramientas increíblemente poderosas y, cuando se usan correctamente, mejoran dramáticamente los resultados.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "I like to break this setup into three parts:",
        es: "Me gusta dividir esta configuración en tres partes:",
      },
    },
    {
      type: "list",
      items: [
        { en: "Rules", es: "Reglas" },
        { en: "Context", es: "Contexto" },
        { en: "Tools", es: "Herramientas" },
      ],
    },
    {
      type: "paragraph",
      content: {
        en: "These are the basics you should provide before asking the model to generate code.",
        es: "Estos son los conceptos básicos que debes proporcionar antes de pedirle al modelo que genere código.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "**Rules** are constraints the model must follow. For example:",
        es: "**Reglas** son restricciones que el modelo debe seguir. Por ejemplo:",
      },
    },
    {
      type: "list",
      items: [
        {
          en: "Keep the code type-safe",
          es: "Mantener el código con tipado seguro",
        },
        { en: "Avoid the use of `any`", es: "Evitar el uso de `any`" },
        {
          en: "Always add unit tests when introducing a new method",
          es: "Siempre añadir pruebas unitarias al introducir un nuevo método",
        },
      ],
    },
    {
      type: "paragraph",
      content: {
        en: "If your team follows specific style guides or architectural rules, this is where they belong.",
        es: "Si tu equipo sigue guías de estilo específicas o reglas arquitectónicas, aquí es donde pertenecen.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "**Context** is what the model needs to know about your codebase:",
        es: "**Contexto** es lo que el modelo necesita saber sobre tu base de código:",
      },
    },
    {
      type: "list",
      items: [
        {
          en: "This is a React project using TypeScript and Tailwind CSS",
          es: "Este es un proyecto React usando TypeScript y Tailwind CSS",
        },
        {
          en: "This is a Node.js backend using Express and MongoDB",
          es: "Este es un backend Node.js usando Express y MongoDB",
        },
      ],
    },
    {
      type: "paragraph",
      content: {
        en: "Include project structure, key files, and architectural decisions. The better the model understands your environment, the better its output will be.",
        es: "Incluye la estructura del proyecto, archivos clave y decisiones arquitectónicas. Cuanto mejor entienda el modelo tu entorno, mejor será su resultado.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "**Tools** are scripts or commands the model can use to verify its work. One of my favorites is bundling all common checks into a single script, for example, `tests:ai`, which runs linting, unit tests, and TypeScript checks.",
        es: "**Herramientas** son scripts o comandos que el modelo puede usar para verificar su trabajo. Una de mis favoritas es agrupar todas las comprobaciones comunes en un solo script, por ejemplo, `tests:ai`, que ejecuta linting, pruebas unitarias y comprobaciones de TypeScript.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "This allows the model to test its own output, iterate, and fix issues until everything passes.",
        es: "Esto permite al modelo probar su propio resultado, iterar y arreglar problemas hasta que todo pase.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        en: "The Prompt Itself",
        es: "El Prompt en sí",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "I don’t have much advice here beyond the basics: be clear, concise, and specific.",
        es: "No tengo muchos consejos aquí más allá de lo básico: sé claro, conciso y específico.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "The more precise you are about what you want, the better the results will be. Examples help a lot. And if you’ve set up rules, context, and tools properly, you’re already giving the model most of what it needs to succeed.",
        es: "Cuanto más preciso seas sobre lo que quieres, mejores serán los resultados. Los ejemplos ayudan mucho. Y si has configurado las reglas, el contexto y las herramientas correctamente, ya le estás dando al modelo la mayor parte de lo que necesita para tener éxito.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        en: "3. Force AI to Test Its Output",
        es: "3. Fuerza a la IA a Probar su Resultado",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "If you give AI the tools to test, make sure it actually uses them.",
        es: "Si le das a la IA las herramientas para probar, asegúrate de que realmente las use.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "In every prompt, explicitly require the model to run the tests after generating code. A simple instruction like:",
        es: "En cada prompt, requiere explícitamente que el modelo ejecute las pruebas después de generar código. Una instrucción simple como:",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "“Run the tests after generating the code and fix any failures.”",
        es: "“Ejecuta las pruebas después de generar el código y arregla cualquier fallo.”",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "goes a long way.",
        es: "hace una gran diferencia.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "This step alone dramatically improves quality. I can’t stress enough how much better the results are when the model is forced to validate its own work on every iteration.",
        es: "Este paso por sí solo mejora dramáticamente la calidad. No puedo enfatizar lo suficiente cuánto mejores son los resultados cuando se obliga al modelo a validar su propio trabajo en cada iteración.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        en: "4. Review the Results (Non-Negotiable)",
        es: "4. Revisa los Resultados (No Negociable)",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "If you understand the fundamentals, you can review results. This step is straightforward, but it’s also critical and unskippable.",
        es: "Si entiendes los fundamentos, puedes revisar los resultados. Este paso es directo, pero también es crítico e ineludible.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "You cannot blindly trust AI output. Even with great prompts and strong models, AI still hallucinates or takes shortcuts, which can introduce bad practices or long-term maintenance issues.",
        es: "No puedes confiar ciegamente en el resultado de la IA. Incluso con grandes prompts y modelos potentes, la IA todavía alucina o toma atajos, lo que puede introducir malas prácticas o problemas de mantenimiento a largo plazo.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Use review tools aggressively. Open pull requests, inspect diffs, and read every line. Make sure you understand the decisions the AI made and why they make sense.",
        es: "Usa herramientas de revisión agresivamente. Abre pull requests, inspecciona diffs y lee cada línea. Asegúrate de entender las decisiones que tomó la IA y por qué tienen sentido.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "You can even use other AI tools to help with reviews, they often catch issues you might miss. But remember: more eyes help, and you’re still responsible for the final result.",
        es: "Incluso puedes usar otras herramientas de IA para ayudar con las revisiones, a menudo detectan problemas que podrías pasar por alto. Pero recuerda: más ojos ayudan, y tú sigues siendo responsable del resultado final.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "You still need to do your job.",
        es: "Todavía necesitas hacer tu trabajo.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        en: "Final Note (and a Small Gift)",
        es: "Nota Final (y un Pequeño Regalo)",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "If you’re working on a new feature or refactor and the AI completely derails from what you want, don’t be afraid to delete everything.",
        es: "Si estás trabajando en una nueva funcionalidad o refactorización y la IA se descarrila completamente de lo que quieres, no tengas miedo de borrar todo.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Code is cheap now. You can always generate it again.",
        es: "El código es barato ahora. Siempre puedes generarlo de nuevo.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "What matters is the outcome, not how you got there. If the model isn’t cooperating, start over. Change the prompt. Add more context. Adjust the rules.",
        es: "Lo que importa es el resultado, no cómo llegaste allí. Si el modelo no está cooperando, empieza de nuevo. Cambia el prompt. Añade más contexto. Ajusta las reglas.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Sometimes that’s faster, and cleaner, than trying to force the AI to fix code it already fixated on.",
        es: "A veces eso es más rápido y limpio que intentar forzar a la IA a arreglar código en el que ya se ha fijado.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "AI can be stubborn like that.",
        es: "La IA puede ser así de terca.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        en: "Final takeaway",
        es: "Conclusión final",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "AI doesn’t replace developers who understand their craft. It replaces developers who surrender control.",
        es: "La IA no reemplaza a los desarrolladores que entienden su oficio. Reemplaza a los desarrolladores que renuncian al control.",
      },
    },
    {
      type: "paragraph",
      content: {
        en: "Stay critical. Stay in charge.",
        es: "Mantente crítico. Mantente al mando.",
      },
    },
  ],
};
