import { createContext } from "react";
import { Language } from "../translations/defaultTranslations";

// Define the shape of the context
export interface TranslationContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

// Create the context with a default value
export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);
