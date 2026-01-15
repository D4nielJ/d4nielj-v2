import { LocaleProvider } from "@/i18n/locale-provider";
import { RoleProvider } from "@/context/role-context";
import { ThemeProvider } from "@/app/theme-provider";
import { CVView } from "@/components/cv-view";

export default function Page() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <RoleProvider>
          <CVView />
        </RoleProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
