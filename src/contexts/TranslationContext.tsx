import React, { ReactNode, useCallback, useMemo, useState } from "react";
import {
  defaultTranslations,
  Language,
  TranslationSet,
} from "../translations/defaultTranslations";
import { TranslationContext } from "./TranslationContextValue";

// Provider props
interface TranslationProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  translations?: TranslationSet;
}

/**
 * Provider component that wraps the app and provides translation functionality
 */
export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  initialLanguage = "en",
  translations = defaultTranslations,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Memoize the current translation set to avoid unnecessary re-renders
  const currentTranslations = useMemo(() => {
    return translations[language] || {};
  }, [language, translations]);

  /**
   * Translate a key with optional parameter substitution
   */
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let translation = currentTranslations[key] || translations.en[key] || key;

      // Replace parameters in the format {{paramName}}
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          translation = translation.replace(
            new RegExp(`{{${paramKey}}}`, "g"),
            String(paramValue)
          );
        });
      }

      return translation;
    },
    [currentTranslations, translations]
  );

  /**
   * Toggle between available languages
   */
  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === "en" ? "vi" : "en"));
  }, []);

  // Create the context value
  const contextValue = useMemo(
    () => ({
      t,
      language,
      setLanguage,
      toggleLanguage,
    }),
    [t, language, setLanguage, toggleLanguage]
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
