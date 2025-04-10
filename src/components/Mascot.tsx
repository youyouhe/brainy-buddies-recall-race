
import React from 'react';

interface MascotProps {
  mood: 'happy' | 'thinking' | 'celebrating' | 'sad';
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ mood, className = '' }) => {
  const expressions = {
    happy: '😊',
    thinking: '🤔',
    celebrating: '🎉',
    sad: '😢',
  };

  return (
    <div className={`relative ${className}`}>
      <div className="w-24 h-24 md:w-32 md:h-32 bg-game-purple rounded-full flex items-center justify-center animate-bounce">
        <span className="text-4xl md:text-5xl">{expressions[mood]}</span>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-game-purple rounded-full px-4 py-1">
        <span className="text-white font-bold">Brainy</span>
      </div>
    </div>
  );
};

export default Mascot;
