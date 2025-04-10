
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  isActive,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isActive, duration, onComplete]);

  const percentageLeft = (timeLeft / duration) * 100;

  return (
    <div className="w-full max-w-md mx-auto my-8">
      {isActive && (
        <div className="text-center mb-2">
          <span className="countdown-timer text-game-orange">{Math.ceil(timeLeft)}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div 
          className="bg-game-orange h-full transition-all duration-1000 rounded-full"
          style={{ width: `${percentageLeft}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;
