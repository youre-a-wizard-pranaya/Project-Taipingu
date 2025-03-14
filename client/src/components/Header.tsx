import { RefreshCcw, BookOpen, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingStats } from "../types";
import { motion } from "framer-motion";

interface HeaderProps {
  stats: TypingStats;
  onBookSelect: () => void;
  onDifficultySelect: () => void;
  onReset: () => void;
}

export default function Header({ stats, onBookSelect, onDifficultySelect, onReset }: HeaderProps) {
  return (
    <header className="py-4 px-6 flex justify-between items-center bg-dark bg-opacity-70 border-b border-secondary border-opacity-30">
      <div className="flex items-center">
        <motion.h1 
          className="text-4xl font-heading text-accent"
          whileHover={{ scale: 1.05 }}
        >
          Taipingu
        </motion.h1>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Stats Display */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xs text-secondary">WPM</p>
            <p className="text-xl font-mono">{stats.wpm}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-secondary">Accuracy</p>
            <p className="text-xl font-mono">{stats.accuracy}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-secondary">Time</p>
            <p className="text-xl font-mono">{stats.time}</p>
          </div>
        </div>
        
        {/* Menu Buttons */}
        <Button 
          variant="default" 
          className="bg-primary hover:bg-opacity-80" 
          onClick={onBookSelect}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Select Book</span>
        </Button>
        
        <Button 
          variant="default" 
          className="bg-accent hover:bg-opacity-80" 
          onClick={onDifficultySelect}
        >
          <Sliders className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Difficulty</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="bg-secondary bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full" 
          onClick={onReset}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
