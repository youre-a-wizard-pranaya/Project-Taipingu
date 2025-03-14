import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define keyboard layout
const keyboardLayout = {
  numbersRow: [
    { key: "`", code: "Backquote" },
    { key: "1", code: "Digit1" },
    { key: "2", code: "Digit2" },
    { key: "3", code: "Digit3" },
    { key: "4", code: "Digit4" },
    { key: "5", code: "Digit5" },
    { key: "6", code: "Digit6" },
    { key: "7", code: "Digit7" },
    { key: "8", code: "Digit8" },
    { key: "9", code: "Digit9" },
    { key: "0", code: "Digit0" },
    { key: "-", code: "Minus" },
    { key: "=", code: "Equal" },
    { key: "Backspace", code: "Backspace", width: "flex-2", display: "⌫" }
  ],
  qwertyRow: [
    { key: "Tab", code: "Tab", width: "flex-1.5" },
    { key: "q", code: "KeyQ" },
    { key: "w", code: "KeyW" },
    { key: "e", code: "KeyE" },
    { key: "r", code: "KeyR" },
    { key: "t", code: "KeyT" },
    { key: "y", code: "KeyY" },
    { key: "u", code: "KeyU" },
    { key: "i", code: "KeyI" },
    { key: "o", code: "KeyO" },
    { key: "p", code: "KeyP" },
    { key: "[", code: "BracketLeft" },
    { key: "]", code: "BracketRight" },
    { key: "\\", code: "Backslash", width: "flex-1.5" }
  ],
  asdfRow: [
    { key: "CapsLock", code: "CapsLock", width: "flex-2", display: "Caps" },
    { key: "a", code: "KeyA" },
    { key: "s", code: "KeyS" },
    { key: "d", code: "KeyD" },
    { key: "f", code: "KeyF" },
    { key: "g", code: "KeyG" },
    { key: "h", code: "KeyH" },
    { key: "j", code: "KeyJ" },
    { key: "k", code: "KeyK" },
    { key: "l", code: "KeyL" },
    { key: ";", code: "Semicolon" },
    { key: "'", code: "Quote" },
    { key: "Enter", code: "Enter", width: "flex-2" }
  ],
  zxcvRow: [
    { key: "Shift", code: "ShiftLeft", width: "flex-2.5" },
    { key: "z", code: "KeyZ" },
    { key: "x", code: "KeyX" },
    { key: "c", code: "KeyC" },
    { key: "v", code: "KeyV" },
    { key: "b", code: "KeyB" },
    { key: "n", code: "KeyN" },
    { key: "m", code: "KeyM" },
    { key: ",", code: "Comma" },
    { key: ".", code: "Period" },
    { key: "/", code: "Slash" },
    { key: "Shift", code: "ShiftRight", width: "flex-2.5" }
  ],
  spaceRow: [
    { key: "Control", code: "ControlLeft", width: "flex-1.5", display: "Ctrl" },
    { key: "Alt", code: "AltLeft", width: "flex-1.5" },
    { key: " ", code: "Space", width: "flex-8 md:flex-6", display: "Space" },
    { key: "Alt", code: "AltRight", width: "flex-1.5" },
    { key: "Control", code: "ControlRight", width: "flex-1.5", display: "Ctrl" }
  ]
};

interface VirtualKeyboardProps {
  pressedKeys: Set<string>;
}

export default function VirtualKeyboard({ pressedKeys }: VirtualKeyboardProps) {
  const [isPressedMap, setIsPressedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Update the pressed keys state
    const newPressedMap: Record<string, boolean> = {};
    pressedKeys.forEach(key => {
      newPressedMap[key.toLowerCase()] = true;
    });
    setIsPressedMap(newPressedMap);
  }, [pressedKeys]);

  // Render a single key
  const renderKey = ({ key, code, width = "flex-1", display }: { key: string, code: string, width?: string, display?: string }) => {
    const isPressed = isPressedMap[key.toLowerCase()];
    const displayText = display || key.toUpperCase();

    return (
      <motion.div
        key={code}
        data-key={key}
        className={`key ${width} bg-dark border border-primary border-opacity-40 rounded-md h-10 md:h-12 flex items-center justify-center text-xs md:text-sm font-mono shadow ${
          isPressed ? 'active' : ''
        }`}
        animate={isPressed ? { 
          y: 2, 
          boxShadow: "0 0 10px rgba(255, 94, 91, 0.8)",
          backgroundColor: "rgba(255, 94, 91, 0.8)"
        } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {displayText}
      </motion.div>
    );
  };

  return (
    <div className="mt-auto bg-dark bg-opacity-80 rounded-lg p-4 shadow-lg border border-secondary border-opacity-30">
      <div className="keyboard-container flex flex-col items-center space-y-2 max-w-5xl mx-auto">
        {/* Row 1: Numbers */}
        <div className="flex space-x-1 w-full">
          {keyboardLayout.numbersRow.map(renderKey)}
        </div>

        {/* Row 2: QWERTY */}
        <div className="flex space-x-1 w-full">
          {keyboardLayout.qwertyRow.map(renderKey)}
        </div>

        {/* Row 3: ASDFGHJKL */}
        <div className="flex space-x-1 w-full">
          {keyboardLayout.asdfRow.map(renderKey)}
        </div>

        {/* Row 4: ZXCVBNM */}
        <div className="flex space-x-1 w-full">
          {keyboardLayout.zxcvRow.map(renderKey)}
        </div>

        {/* Row 5: Space bar */}
        <div className="flex space-x-1 w-full">
          {keyboardLayout.spaceRow.map(key => (
            <div key={key.code} className={`${key.width} ${key.code === 'ControlLeft' || key.code === 'AltLeft' || key.code === 'AltRight' || key.code === 'ControlRight' ? 'hidden md:flex' : 'flex'}`}>
              {renderKey(key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
