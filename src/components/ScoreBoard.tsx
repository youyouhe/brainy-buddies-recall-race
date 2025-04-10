
import React from 'react';

interface ScoreBoardProps {
  correctCount: number;
  totalAttempts: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ correctCount, totalAttempts }) => {
  const accuracy = totalAttempts > 0 
    ? Math.round((correctCount / totalAttempts) * 100) 
    : 0;
    
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 my-6">
      <div className="game-card bg-game-soft-blue flex-1 text-center">
        <h3 className="text-lg font-semibold text-game-blue mb-1">Correct</h3>
        <p className="text-3xl font-bold text-game-blue">{correctCount}</p>
      </div>
      
      <div className="game-card bg-game-soft-pink flex-1 text-center">
        <h3 className="text-lg font-semibold text-game-pink mb-1">Attempts</h3>
        <p className="text-3xl font-bold text-game-pink">{totalAttempts}</p>
      </div>
      
      <div className="game-card bg-game-soft-yellow flex-1 text-center">
        <h3 className="text-lg font-semibold text-game-orange mb-1">Accuracy</h3>
        <p className="text-3xl font-bold text-game-orange">{accuracy}%</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
