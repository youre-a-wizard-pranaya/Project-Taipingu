import { useRef } from "react";
import { X } from "lucide-react";
import { DifficultyLevel } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface DifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  selectedDifficulty: DifficultyLevel;
}

export default function DifficultyModal({
  isOpen,
  onClose,
  onSelectDifficulty,
  selectedDifficulty
}: DifficultyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const difficultyOptions: {
    value: DifficultyLevel;
    title: string;
    description: string;
  }[] = [
    {
      value: 'beginner',
      title: 'Beginner',
      description: 'Simple sentences, common words, minimal punctuation.'
    },
    {
      value: 'intermediate',
      title: 'Intermediate',
      description: 'More complex sentences, varied vocabulary, common punctuation.'
    },
    {
      value: 'advanced',
      title: 'Advanced',
      description: 'Complex sentences, advanced vocabulary, all punctuation and symbols.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-dark border border-primary border-opacity-50 rounded-lg shadow-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading text-accent">Difficulty Settings</h2>
              <button 
                onClick={onClose} 
                className="text-light hover:text-accent transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Difficulty Options */}
              <div className="space-y-4">
                {difficultyOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    className={`difficulty-option border rounded-lg p-4 cursor-pointer ${
                      selectedDifficulty === option.value 
                        ? 'border-accent' 
                        : 'border-secondary border-opacity-30 hover:border-accent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectDifficulty(option.value)}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mr-3">
                        <div className={`w-3 h-3 rounded-full ${
                          selectedDifficulty === option.value ? 'bg-accent' : ''
                        }`}></div>
                      </div>
                      <h3 className="text-xl font-heading text-light">{option.title}</h3>
                    </div>
                    <p className="text-sm text-secondary mt-2 pl-9">{option.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Apply Button */}
              <motion.button
                className="w-full bg-accent hover:bg-opacity-80 py-3 rounded-lg text-light font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Apply Settings
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
