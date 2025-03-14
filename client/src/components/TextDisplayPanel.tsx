import { CharStatus } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TextDisplayPanelProps {
  charStatuses: CharStatus[];
  currentIndex: number;
}

export default function TextDisplayPanel({ charStatuses, currentIndex }: TextDisplayPanelProps) {
  return (
    <div className="bg-dark bg-opacity-80 rounded-lg p-6 mb-6 shadow-lg max-h-[40vh]">
      <ScrollArea className="h-full w-full custom-scrollbar">
        <div className="text-xl md:text-2xl leading-relaxed font-mono text-light">
          {charStatuses.map((charStatus, index) => {
            let className = "transition-all duration-100";
            
            if (charStatus.status === 'correct') {
              className += " text-highlight-correct";
            } else if (charStatus.status === 'incorrect') {
              className += " text-highlight-incorrect";
            } else if (charStatus.status === 'current') {
              className += " text-highlight-current";
            }
            
            return (
              <span
                key={index}
                className={className}
                data-index={index}
                data-char={charStatus.char}
                data-status={charStatus.status}
              >
                {charStatus.char}
              </span>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
