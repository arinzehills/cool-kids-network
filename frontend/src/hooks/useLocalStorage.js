import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);

      // Check if savedValue is non-null and non-empty before parsing
      if (savedValue != null) {
        try {
          return JSON.parse(savedValue);
        } catch (error) {
          //   console.error("Error parsing JSON from localStorage:", error);
          return initialValue;
        }
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
