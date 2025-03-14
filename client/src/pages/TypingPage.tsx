import { useState } from "react";
import WelcomePage from "@/components/WelcomePage";
import MainApp from "@/components/MainApp";
import { DifficultyLevel } from "../types";

export default function TypingPage() {
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);
  const [currentBookId, setCurrentBookId] = useState(1);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");

  const handleStartTyping = () => {
    setIsWelcomeScreen(false);
  };

  const handleSelectBook = (bookId: number) => {
    setCurrentBookId(bookId);
  };

  const handleSetDifficulty = (level: DifficultyLevel) => {
    setDifficulty(level);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {isWelcomeScreen ? (
        <WelcomePage onStartTyping={handleStartTyping} />
      ) : (
        <MainApp 
          currentBookId={currentBookId} 
          difficulty={difficulty}
          onSelectBook={handleSelectBook}
          onSetDifficulty={handleSetDifficulty}
        />
      )}
    </div>
  );
}
