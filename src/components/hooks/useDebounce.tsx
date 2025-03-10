import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 3000) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  });
  return debounceValue;
};