"use client";

import {
  useRole,
  SUPPORTED_ROLES,
  SelectableRole,
} from "@/context/role-context";
import { Button } from "@/components/ui/button";
import { useLocale, Locale } from "@/i18n/locale-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <>
      <div className="hidden lg:flex flex-col gap-1">
        {SUPPORTED_ROLES.map((r) => (
          <Button
            className="cursor-pointer justify-start"
            key={r}
            variant={role === r ? "default" : "ghost"}
            size="sm"
            onClick={() => setRole(r)}
          >
            {roleLabels[locale][r]}
          </Button>
        ))}
      </div>

      <div className="lg:hidden">
        <Select
          value={role}
          onValueChange={(v) => setRole(v as SelectableRole)}
        >
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {roleLabels[locale][r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
