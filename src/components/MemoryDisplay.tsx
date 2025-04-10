
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MemoryDisplayProps {
  characters: string;
  isDisplaying: boolean;
  displayTime: number;
  onDisplayEnd: () => void;
}

const MemoryDisplay: React.FC<MemoryDisplayProps> = ({
  characters,
  isDisplaying,
  displayTime,
  onDisplayEnd,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isDisplaying) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDisplayEnd();
      }, displayTime * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isDisplaying, displayTime, onDisplayEnd]);

  return (
    <div className="w-full my-8">
      <div 
        className={cn(
          "character-display bg-game-soft-blue rounded-2xl transition-all duration-500",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          isDisplaying ? "border-4 border-game-blue" : ""
        )}
      >
        {visible ? characters : ""}
      </div>
      {isDisplaying && (
        <div className="mt-2 text-center text-game-blue font-bold">
          Remember these characters!
        </div>
      )}
    </div>
  );
};

export default MemoryDisplay;
