"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { VisibilityRole } from "@/cv/schema/cv";

type SelectableRole = Exclude<VisibilityRole, "all">;

interface RoleContextValue {
  role: SelectableRole;
  setRole: (role: SelectableRole) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

const SUPPORTED_ROLES: SelectableRole[] = [
  "fullstack",
  "frontend",
  "backend",
  "test-automation",
];
const DEFAULT_ROLE: SelectableRole = "fullstack";

interface RoleProviderProps {
  children: ReactNode;
  defaultRole?: SelectableRole;
}

export function RoleProvider({
  children,
  defaultRole = DEFAULT_ROLE,
}: RoleProviderProps) {
  const [role, setRole] = useState<SelectableRole>(defaultRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

export { SUPPORTED_ROLES, DEFAULT_ROLE };
export type { SelectableRole };
