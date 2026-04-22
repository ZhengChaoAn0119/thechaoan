import en from "./messages/en.json";
import zhTW from "./messages/zh-TW.json";

const dictionaries = { en, "zh-TW": zhTW } as const;

export type Locale = keyof typeof dictionaries;

export function getT(locale: string) {
  const dict = (
    dictionaries[locale as Locale] ?? dictionaries.en
  ) as Record<string, unknown>;

  return (key: string): string => {
    const value = key.split(".").reduce<unknown>(
      (obj, k) =>
        obj && typeof obj === "object"
          ? (obj as Record<string, unknown>)[k]
          : undefined,
      dict
    );
    return typeof value === "string" ? value : key;
  };
}
