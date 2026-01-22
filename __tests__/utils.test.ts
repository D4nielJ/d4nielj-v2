import { describe, it, expect } from "vitest";
import { cn } from "../lib/utils";

describe("cn utility function", () => {
  it("merges simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes with clsx syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("handles undefined and null values gracefully", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("handles empty strings", () => {
    expect(cn("base", "", "extra")).toBe("base extra");
  });

  it("handles arrays of class names", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("merges conflicting Tailwind classes correctly (last wins)", () => {
    // tailwind-merge should keep the last conflicting class
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("preserves non-conflicting Tailwind classes", () => {
    expect(cn("p-4", "m-2", "text-lg")).toBe("p-4 m-2 text-lg");
  });

  it("handles complex Tailwind class merging", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
    expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe(
      "hover:bg-blue-500",
    );
  });

  it("returns empty string when no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles mix of all input types", () => {
    expect(
      cn("base", ["arr1", "arr2"], { conditional: true }, undefined, "final"),
    ).toBe("base arr1 arr2 conditional final");
  });
});
