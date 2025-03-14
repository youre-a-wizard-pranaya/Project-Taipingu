import { useState, useEffect } from "react";
import Header from "./Header";
import TextDisplayPanel from "./TextDisplayPanel";
import UserInputArea from "./UserInputArea";
import VirtualKeyboard from "./VirtualKeyboard";
import BookSelectionModal from "./BookSelectionModal";
import DifficultyModal from "./DifficultyModal";
import { backgroundImages } from "../data/backgroundImages";
import { useQuery } from "@tanstack/react-query";
import useTypingGame from "../hooks/useTypingGame";
import useKeyPress from "../hooks/useKeyPress";
import { DifficultyLevel } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface MainAppProps {
  currentBookId: number;
  difficulty: DifficultyLevel;
  onSelectBook: (bookId: number) => void;
  onSetDifficulty: (level: DifficultyLevel) => void;
}

export default function MainApp({
  currentBookId,
  difficulty,
  onSelectBook,
  onSetDifficulty
}: MainAppProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const { data: textExcerpt } = useQuery({
    queryKey: ['/api/text-excerpts', currentBookId, difficulty],
  });

  const {
    typedText,
    charStatuses,
    stats,
    isCompleted,
    currentIndex,
    handleInput,
    resetTyping,
    startTyping
  } = useTypingGame(textExcerpt?.content || "Loading text...");

  useKeyPress((key) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });

    // Remove key after animation time
    setTimeout(() => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 100);
  });

  useEffect(() => {
    // Change background image every 30 seconds
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 30000);

    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    resetTyping();
  }, [currentBookId, difficulty, resetTyping]);

  const handleToggleBookModal = () => setShowBookModal(!showBookModal);
  const handleToggleDifficultyModal = () => setShowDifficultyModal(!showDifficultyModal);

  const handleSelectBookAndClose = (bookId: number) => {
    onSelectBook(bookId);
    setShowBookModal(false);
  };

  const handleSetDifficultyAndClose = (level: DifficultyLevel) => {
    onSetDifficulty(level);
    setShowDifficultyModal(false);
  };

  return (
    <motion.div 
      className="relative min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 z-0">
        {backgroundImages.map((bg, index) => (
          <div
            key={bg.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
              index === currentBgIndex ? "opacity-40" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${bg.url}')` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header
          stats={stats}
          onBookSelect={handleToggleBookModal}
          onDifficultySelect={handleToggleDifficultyModal}
          onReset={resetTyping}
        />

        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
          <TextDisplayPanel 
            charStatuses={charStatuses} 
            currentIndex={currentIndex}
          />

          <UserInputArea 
            value={typedText} 
            onChange={handleInput} 
            isCompleted={isCompleted}
          />

          <VirtualKeyboard pressedKeys={pressedKeys} />
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showBookModal && (
          <BookSelectionModal
            isOpen={showBookModal}
            onClose={handleToggleBookModal}
            onSelectBook={handleSelectBookAndClose}
            selectedBookId={currentBookId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDifficultyModal && (
          <DifficultyModal
            isOpen={showDifficultyModal}
            onClose={handleToggleDifficultyModal}
            onSelectDifficulty={handleSetDifficultyAndClose}
            selectedDifficulty={difficulty}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
