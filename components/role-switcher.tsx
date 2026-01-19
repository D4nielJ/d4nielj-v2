"use client";

import {
  useRole,
  SUPPORTED_ROLES,
  SelectableRole,
} from "@/context/role-context";
import { Button } from "@/components/ui/button";
import { useLocale, Locale } from "@/i18n/locale-provider";

const roleLabels: Record<Locale, Record<SelectableRole, string>> = {
  en: {
    fullstack: "Full Stack",
    frontend: "Frontend",
    backend: "Backend",
    "test-automation": "Test Automation",
  },
  es: {
    fullstack: "Full Stack",
    frontend: "Frontend",
    backend: "Backend",
    "test-automation": "Automatización",
  },
};

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { locale } = useLocale();

  return (
    <div className="flex flex-wrap gap-1">
      {SUPPORTED_ROLES.map((r) => (
        <Button
          className="cursor-pointer"
          key={r}
          variant={role === r ? "default" : "outline"}
          size="xs"
          onClick={() => setRole(r)}
        >
          {roleLabels[locale][r]}
        </Button>
      ))}
    </div>
  );
}
