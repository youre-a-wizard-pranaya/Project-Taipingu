import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface UserInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  isCompleted: boolean;
}

export default function UserInputArea({ value, onChange, isCompleted }: UserInputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Update cursor position based on the caret position in textarea
    if (textareaRef.current && cursorRef.current) {
      const textarea = textareaRef.current;
      const cursorPosition = textarea.selectionStart;
      
      // Create a temporary div to measure text width
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.whiteSpace = 'pre';
      tempDiv.style.font = window.getComputedStyle(textarea).font;
      tempDiv.textContent = value.substring(0, cursorPosition);
      document.body.appendChild(tempDiv);
      
      // Get the width of the text before the cursor
      const textWidth = tempDiv.getBoundingClientRect().width;
      document.body.removeChild(tempDiv);
      
      // Calculate the position of the cursor
      const textareaRect = textarea.getBoundingClientRect();
      const cursorElement = cursorRef.current;
      
      // Account for line breaks
      const lines = value.substring(0, cursorPosition).split('\n');
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const lineCount = lines.length - 1;
      
      // Set cursor position
      cursorElement.style.top = `${10 + lineCount * lineHeight}px`;
      cursorElement.style.left = `${10 + (lines[lines.length - 1].length * 10)}px`; // Approximation
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="bg-dark bg-opacity-80 rounded-lg p-6 mb-6 shadow-lg border border-secondary border-opacity-30">
      <div className="relative">
        <textarea 
          ref={textareaRef}
          id="typing-input" 
          className="w-full bg-transparent border-none outline-none resize-none text-xl md:text-2xl leading-relaxed font-mono text-light placeholder-secondary placeholder-opacity-50 custom-scrollbar" 
          placeholder="Start typing here..." 
          rows={3}
          value={value}
          onChange={handleTextChange}
          disabled={isCompleted}
        />
        
        {/* Typewriter cursor effect */}
        <motion.div
          ref={cursorRef}
          id="typewriter-cursor"
          className="absolute h-6 w-0.5 bg-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ top: '10px', left: '10px' }}
        />
      </div>
    </div>
  );
}
