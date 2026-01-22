import { describe, it, expect } from "vitest";
import { getCVByRole } from "../lib/getCVByRole";
import { cvData } from "@/storage/data/cv";
import { CV, Locale, VisibilityRole } from "@/storage/schema/cv";

describe("getCVByRole", () => {
  const locales: Locale[] = ["en", "es"];
  const roles: VisibilityRole[] = [
    "fullstack",
    "frontend",
    "backend",
    "test-automation",
  ];

  describe("profile resolution", () => {
    it.each(locales)(
      "resolves profile name correctly for locale %s",
      (locale) => {
        const resolved = getCVByRole(cvData, locale, "fullstack");

        expect(resolved.profile.name).toBe(cvData.profile.name);
        expect(typeof resolved.profile.name).toBe("string");
      },
    );

    it.each(locales)("resolves profile title based on locale %s", (locale) => {
      const resolved = getCVByRole(cvData, locale, "fullstack");

      expect(resolved.profile.title).toBe(cvData.profile.title[locale]);
      expect(typeof resolved.profile.title).toBe("string");
      expect(resolved.profile.title.length).toBeGreaterThan(0);
    });

    it.each(locales)(
      "resolves profile summary based on locale %s",
      (locale) => {
        const resolved = getCVByRole(cvData, locale, "fullstack");

        expect(resolved.profile.summary).toBe(cvData.profile.summary[locale]);
        expect(typeof resolved.profile.summary).toBe("string");
      },
    );

    it.each(locales)(
      "resolves profile location based on locale %s",
      (locale) => {
        const resolved = getCVByRole(cvData, locale, "fullstack");

        expect(resolved.profile.location).toBe(cvData.profile.location[locale]);
      },
    );

    it("preserves profile email and phone", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      expect(resolved.profile.email).toBe(cvData.profile.email);
      expect(resolved.profile.phone).toBe(cvData.profile.phone);
    });

    it("preserves profile links", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      expect(resolved.profile.links).toEqual(cvData.profile.links);
    });
  });

  describe("role-based visibility filtering", () => {
    it("filters experience entries by role", () => {
      const frontendCV = getCVByRole(cvData, "en", "frontend");
      const testAutomationCV = getCVByRole(cvData, "en", "test-automation");

      // Frontend role should NOT see test-automation-only entries
      const frontendExperienceIds = frontendCV.experience.map((e) => e.id);
      const testAutoExperienceIds = testAutomationCV.experience.map(
        (e) => e.id,
      );

      // exp-globant is only visible for test-automation and fullstack
      expect(frontendExperienceIds).not.toContain("exp-globant");
      expect(testAutoExperienceIds).toContain("exp-globant");
    });

    it("includes entries visible for 'all' roles", () => {
      roles.forEach((role) => {
        const resolved = getCVByRole(cvData, "en", role);
        const projectIds = resolved.projects.map((p) => p.id);

        // proj-interactive-cv is visible for "all"
        expect(projectIds).toContain("proj-interactive-cv");
      });
    });

    it("filters skills by role correctly", () => {
      const frontendCV = getCVByRole(cvData, "en", "frontend");
      const backendCV = getCVByRole(cvData, "en", "backend");

      const frontendSkillCategories = frontendCV.skills.map((s) => s.category);
      const backendSkillCategories = backendCV.skills.map((s) => s.category);

      // Frontend should see Frontend skills
      expect(frontendSkillCategories).toContain("Frontend");

      // Backend should see Backend and Databases skills
      expect(backendSkillCategories).toContain("Backend");
      expect(backendSkillCategories).toContain("Databases");

      // Frontend should NOT see Backend-only skills
      expect(frontendSkillCategories).not.toContain("Backend");
      expect(frontendSkillCategories).not.toContain("Databases");
    });

    it("filters reasoning cases by role", () => {
      const frontendCV = getCVByRole(cvData, "en", "frontend");
      const testAutomationCV = getCVByRole(cvData, "en", "test-automation");

      const frontendReasoningIds = frontendCV.reasoning.map((r) => r.id);
      const testAutoReasoningIds = testAutomationCV.reasoning.map((r) => r.id);

      // Each role should only see their specific reasoning
      expect(frontendReasoningIds).toContain("reason-frontend");
      expect(frontendReasoningIds).not.toContain("reason-tae");

      expect(testAutoReasoningIds).toContain("reason-tae");
      expect(testAutoReasoningIds).not.toContain("reason-frontend");
    });

    it("entries without visibleFor are visible to all roles", () => {
      // Education entries don't have visibleFor, so they should be visible to all
      roles.forEach((role) => {
        const resolved = getCVByRole(cvData, "en", role);

        expect(resolved.education.length).toBe(cvData.education.length);
      });
    });
  });

  describe("localization resolution", () => {
    it("resolves experience highlights to the correct locale", () => {
      const enCV = getCVByRole(cvData, "en", "fullstack");
      const esCV = getCVByRole(cvData, "es", "fullstack");

      // Find the same experience entry in both
      const enExp = enCV.experience.find((e) => e.id === "exp-freelance");
      const esExp = esCV.experience.find((e) => e.id === "exp-freelance");

      expect(enExp).toBeDefined();
      expect(esExp).toBeDefined();

      // Highlights should be in the correct language
      expect(enExp!.highlights[0]).toContain("Test Driven Development");
      expect(esExp!.highlights[0]).toContain("Desarrollo Guiado por Pruebas");
    });

    it("resolves project descriptions to the correct locale", () => {
      const enCV = getCVByRole(cvData, "en", "fullstack");
      const esCV = getCVByRole(cvData, "es", "fullstack");

      const enProj = enCV.projects.find((p) => p.id === "proj-interactive-cv");
      const esProj = esCV.projects.find((p) => p.id === "proj-interactive-cv");

      expect(enProj!.description).toContain("context-aware CV application");
      expect(esProj!.description).toContain("aplicación de CV sensible");
    });

    it("resolves skill categories to the correct locale", () => {
      const enCV = getCVByRole(cvData, "en", "fullstack");
      const esCV = getCVByRole(cvData, "es", "fullstack");

      const enSkillCategories = enCV.skills.map((s) => s.category);
      const esSkillCategories = esCV.skills.map((s) => s.category);

      expect(enSkillCategories).toContain("Testing & Automation");
      expect(esSkillCategories).toContain("Pruebas y Automatización");
    });

    it("resolves education degree to the correct locale", () => {
      const enCV = getCVByRole(cvData, "en", "fullstack");
      const esCV = getCVByRole(cvData, "es", "fullstack");

      const enEdu = enCV.education.find((e) => e.id === "edu-microverse");
      const esEdu = esCV.education.find((e) => e.id === "edu-microverse");

      expect(enEdu!.degree).toContain("Remote Full Stack");
      expect(esEdu!.degree).toContain("Programa Remoto");
    });

    it("resolves reasoning cases to the correct locale", () => {
      const enCV = getCVByRole(cvData, "en", "test-automation");
      const esCV = getCVByRole(cvData, "es", "test-automation");

      const enReasoning = enCV.reasoning.find((r) => r.id === "reason-tae");
      const esReasoning = esCV.reasoning.find((r) => r.id === "reason-tae");

      expect(enReasoning!.title).toContain("Why me for Test Automation");
      expect(esReasoning!.title).toContain("Por qué yo para Automatización");
    });
  });

  describe("data integrity", () => {
    it("preserves experience keywords array", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      resolved.experience.forEach((exp) => {
        expect(Array.isArray(exp.keywords)).toBe(true);
        expect(exp.keywords.length).toBeGreaterThan(0);
      });
    });

    it("preserves project github and url fields", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      const interactiveCV = resolved.projects.find(
        (p) => p.id === "proj-interactive-cv",
      );
      expect(interactiveCV!.github).toBeDefined();
      expect(interactiveCV!.github).toContain("github.com");
    });

    it("preserves skills array within each skill set", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      resolved.skills.forEach((skillSet) => {
        expect(Array.isArray(skillSet.skills)).toBe(true);
        expect(skillSet.skills.length).toBeGreaterThan(0);
      });
    });

    it("preserves education dates", () => {
      const resolved = getCVByRole(cvData, "en", "fullstack");

      resolved.education.forEach((edu) => {
        expect(edu.startDate).toMatch(/^\d{4}-\d{2}$/);
        expect(edu.endDate).toMatch(/^\d{4}-\d{2}$/);
      });
    });

    it("all resolved strings are non-null", () => {
      locales.forEach((locale) => {
        roles.forEach((role) => {
          const resolved = getCVByRole(cvData, locale, role);

          // Check profile
          expect(resolved.profile.name).toBeTruthy();
          expect(resolved.profile.title).toBeTruthy();
          expect(resolved.profile.summary).toBeTruthy();

          // Check all experience entries
          resolved.experience.forEach((exp) => {
            expect(exp.role).toBeTruthy();
            expect(exp.description).toBeTruthy();
          });

          // Check all projects
          resolved.projects.forEach((proj) => {
            expect(proj.name).toBeTruthy();
            expect(proj.description).toBeTruthy();
          });
        });
      });
    });
  });

  describe("edge cases", () => {
    it("returns empty arrays when no entries match role", () => {
      // Create a mock CV with no entries for a specific role
      const mockCV: CV = {
        ...cvData,
        experience: [
          {
            id: "exp-test",
            company: "Test Co",
            role: { en: "Test", es: "Prueba" },
            startDate: "2024-01",
            description: { en: "Test", es: "Prueba" },
            highlights: [],
            keywords: [],
            visibleFor: ["backend"], // Only backend
          },
        ],
        projects: [],
        reasoning: [],
      };

      const resolved = getCVByRole(mockCV, "en", "frontend");

      expect(resolved.experience).toHaveLength(0);
    });

    it("defaults to English when Spanish translation is missing", () => {
      const mockCV: CV = {
        ...cvData,
        profile: {
          ...cvData.profile,
          title: { en: "English Title Only" }, // No Spanish
        },
      };

      const resolved = getCVByRole(mockCV, "es", "fullstack");

      // Should fall back to English
      expect(resolved.profile.title).toBe("English Title Only");
    });
  });
});

describe("getCVByRole cross-role data leakage prevention", () => {
  it("does not leak test-automation specific content to frontend role", () => {
    const frontendCV = getCVByRole(cvData, "en", "frontend");

    // Ensure no test-automation-only content appears
    const allContent = JSON.stringify(frontendCV);

    // Should not contain test-automation-specific reasoning
    expect(allContent).not.toContain("robust, maintainable test automation");
  });

  it("does not leak frontend-specific reasoning to backend role", () => {
    const backendCV = getCVByRole(cvData, "en", "backend");

    const reasoningTitles = backendCV.reasoning.map((r) => r.title);
    expect(reasoningTitles).not.toContain("Why me for Frontend?");
  });

  it("fullstack role sees combined content from multiple domains", () => {
    const fullstackCV = getCVByRole(cvData, "en", "fullstack");

    const skillCategories = fullstackCV.skills.map((s) => s.category);

    // Fullstack should see both frontend and backend skills
    expect(skillCategories).toContain("Frontend");
    expect(skillCategories).toContain("Backend");
    expect(skillCategories).toContain("Databases");
    expect(skillCategories).toContain("Testing & Automation");
  });
});
