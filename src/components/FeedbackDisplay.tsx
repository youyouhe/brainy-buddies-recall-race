
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Mascot from './Mascot';
import confetti from 'canvas-confetti';

interface FeedbackDisplayProps {
  isCorrect: boolean | null;
  correctAnswer: string;
  onContinue: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  isCorrect,
  correctAnswer,
  onContinue,
}) => {
  useEffect(() => {
    if (isCorrect === true) {
      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCorrect]);

  if (isCorrect === null) return null;

  return (
    <div className={cn(
      "game-card my-6 animate-scale-up",
      isCorrect ? "bg-game-soft-green border-green-500" : "bg-game-soft-pink border-red-500"
    )}>
      <div className="flex flex-col items-center gap-4">
        <Mascot mood={isCorrect ? "celebrating" : "sad"} className="mb-2" />
        
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold",
          isCorrect ? "text-green-600" : "text-red-600"
        )}>
          {isCorrect 
            ? "Amazing job! You remembered correctly!" 
            : "Oops! That's not quite right."}
        </h2>
        
        {!isCorrect && (
          <div className="my-2">
            <p className="text-lg mb-2">The correct sequence was:</p>
            <div className="text-3xl font-bold p-3 bg-white rounded-lg border-2 border-dashed border-game-pink">
              {correctAnswer}
            </div>
          </div>
        )}
        
        <p className="text-lg my-2">
          {isCorrect 
            ? "Your memory is getting stronger! Keep it up!" 
            : "Don't worry! Memory gets better with practice. Let's try again!"}
        </p>
        
        <Button 
          onClick={onContinue}
          className={cn(
            "game-button mt-4",
            isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-game-pink hover:bg-pink-600"
          )}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
