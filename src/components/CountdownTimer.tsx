
import React, { useState, useEffect } from 'react';
import SoundEffects from '@/utils/SoundEffects';

interface CountdownTimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  duration, 
  isActive, 
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      SoundEffects.play('tick');
      timer = setTimeout(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          return newTime;
        });
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      onComplete();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, timeLeft, onComplete]);
  
  const progress = ((duration - timeLeft) / duration) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-game-orange mb-4">
          {timeLeft}
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-game-orange transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
