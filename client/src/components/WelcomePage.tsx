import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animeCharacters } from "../data/animeCharacters";

interface WelcomePageProps {
  onStartTyping: () => void;
}

export default function WelcomePage({ onStartTyping }: WelcomePageProps) {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark bg-opacity-90 transition-opacity duration-500">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80')] opacity-30 bg-cover bg-center"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl md:text-8xl font-heading mb-6 bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
          タイピング
        </h1>
        <h2 className="text-3xl md:text-5xl font-heading mb-8 text-light">Project Taipingu</h2>
        
        <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto">
          Hi, Welcome to Taipingu, a personal typing website I created using generative AI. Improve your typing skills with anime aesthetic.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {animeCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              className="anime-character"
              animate={{ 
                y: [0, -10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 4,
                  delay: index * 0.5
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredChar(character.id)}
              onHoverEnd={() => setHoveredChar(null)}
            >
              <img 
                src={character.imageUrl} 
                alt={character.name} 
                className="h-40 w-auto mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-8 rounded-full text-xl hover:opacity-90 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartTyping}
        >
          Start Typing Challenge
        </motion.button>
      </div>
    </div>
  );
}
