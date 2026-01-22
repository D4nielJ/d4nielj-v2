import en from "@i18n/messages/en.json";

type Messages = typeof en;

declare global {
  type IntlMessages = Messages;

  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer: unknown[];
  }
}
