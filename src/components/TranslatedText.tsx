import { useTranslation } from "@hooks/useTranslation";
import React, { ElementType } from "react";

interface TranslatedTextProps {
  textKey: string;
  params?: Record<string, string | number>;
  className?: string;
  as?: ElementType;
}

/**
 * A component that displays text translated according to the current language
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({
  textKey,
  params,
  className = "",
  as: Component = "span",
}) => {
  const { t } = useTranslation();
  const translatedText = t(textKey, params);

  return <Component className={className}>{translatedText}</Component>;
};

export default TranslatedText;
