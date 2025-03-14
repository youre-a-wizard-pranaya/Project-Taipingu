import { useEffect, useCallback } from "react";

type KeyPressHandler = (key: string) => void;

export default function useKeyPress(onKeyPress: KeyPressHandler): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = event.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      
      // If it's an input, only trigger for special keys like Tab, Enter, etc.
      if (isInput && !["Tab", "Enter", "Escape", "Backspace", "Delete"].includes(event.key)) {
        return;
      }

      onKeyPress(event.key);
    },
    [onKeyPress]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
