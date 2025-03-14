import { useState, useEffect, useCallback } from "react";
import { CharStatus, TypingStats } from "../types";

const initialStats: TypingStats = {
  wpm: 0,
  accuracy: 100,
  time: "0:00",
  totalChars: 0,
  correctChars: 0,
  incorrectChars: 0,
  startTime: null
};

export default function useTypingGame(text: string) {
  const [typedText, setTypedText] = useState("");
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState<TypingStats>(initialStats);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize or reset the char statuses when text changes
  useEffect(() => {
    const initialCharStatuses: CharStatus[] = text.split("").map((char, index) => ({
      char,
      status: index === 0 ? "current" : "upcoming"
    }));
    
    setCharStatuses(initialCharStatuses);
    setCurrentIndex(0);
    setTypedText("");
    setIsStarted(false);
    setIsCompleted(false);
    setStats(initialStats);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [text]);

  // Update WPM and accuracy stats
  const updateStats = useCallback(() => {
    if (!isStarted || !stats.startTime) return;

    const timeElapsed = (new Date().getTime() - stats.startTime) / 1000; // seconds
    const minutes = timeElapsed / 60;
    const words = typedText.length / 5; // standard WPM calculation (5 chars = 1 word)
    
    const wpm = Math.max(0, Math.round(words / Math.max(minutes, 0.01)));
    
    const accuracy = stats.totalChars === 0 
      ? 100 
      : Math.round((stats.correctChars / stats.totalChars) * 100);
    
    const displayMinutes = Math.floor(timeElapsed / 60);
    const displaySeconds = Math.floor(timeElapsed % 60);
    
    setStats({
      ...stats,
      wpm,
      accuracy,
      time: `${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`
    });
  }, [isStarted, stats, typedText]);

  // Start the timer when typing begins
  const startTyping = useCallback(() => {
    if (isStarted) return;
    
    setIsStarted(true);
    setStats({
      ...initialStats,
      startTime: new Date().getTime()
    });
    
    const interval = setInterval(updateStats, 1000);
    setTimerInterval(interval);
    
    return () => {
      clearInterval(interval);
    };
  }, [isStarted, updateStats]);

  // Handle input changes
  const handleInput = useCallback((value: string) => {
    if (isCompleted) return;
    
    if (!isStarted) {
      startTyping();
    }
    
    setTypedText(value);
    
    // Update character statuses
    const newStatuses = [...charStatuses];
    const newCurrentIndex = Math.min(value.length, text.length);
    
    let correctChars = 0;
    let incorrectChars = 0;
    
    // Update status for typed characters
    for (let i = 0; i < Math.min(value.length, text.length); i++) {
      const isCorrect = value[i] === text[i];
      newStatuses[i].status = isCorrect ? "correct" : "incorrect";
      
      if (isCorrect) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }
    
    // Set current character
    if (newCurrentIndex < text.length) {
      newStatuses[newCurrentIndex].status = "current";
    }
    
    // Reset upcoming status for untyped characters
    for (let i = newCurrentIndex + 1; i < text.length; i++) {
      newStatuses[i].status = "upcoming";
    }
    
    // Update state
    setCharStatuses(newStatuses);
    setCurrentIndex(newCurrentIndex);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalChars: value.length,
      correctChars,
      incorrectChars
    }));
    
    // Check if completed
    if (value.length === text.length) {
      setIsCompleted(true);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  }, [charStatuses, isCompleted, isStarted, startTyping, text, timerInterval]);

  // Reset the typing game
  const resetTyping = useCallback(() => {
    const initialCharStatuses: CharStatus[] = text.split("").map((char, index) => ({
      char,
      status: index === 0 ? "current" : "upcoming"
    }));
    
    setCharStatuses(initialCharStatuses);
    setCurrentIndex(0);
    setTypedText("");
    setIsStarted(false);
    setIsCompleted(false);
    setStats(initialStats);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [text, timerInterval]);

  return {
    typedText,
    charStatuses,
    currentIndex,
    isStarted,
    isCompleted,
    stats,
    handleInput,
    resetTyping,
    startTyping
  };
}
