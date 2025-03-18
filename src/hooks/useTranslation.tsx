import { useContext } from "react";
import {
  TranslationContext,
  TranslationContextType,
} from "@contexts/TranslationContextValue";

/**
 * Hook to use the translation context
 */
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};
