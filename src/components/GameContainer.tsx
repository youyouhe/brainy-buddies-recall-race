
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Mascot from './Mascot';
import MemoryDisplay from './MemoryDisplay';
import CountdownTimer from './CountdownTimer';
import InputField from './InputField';
import FeedbackDisplay from './FeedbackDisplay';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import { cn } from '@/lib/utils';

// Game phases
enum GamePhase {
  Intro,
  Settings,
  Display,
  Delay,
  Input,
  Feedback
}

const GameContainer: React.FC = () => {
  // Game settings
  const [difficulty, setDifficulty] = useState(5);
  const [displayTime, setDisplayTime] = useState(3);
  const [delayTime, setDelayTime] = useState(3);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [excludeSimilarChars, setExcludeSimilarChars] = useState(true);
  
  // Game state
  const [currentPhase, setCurrentPhase] = useState<GamePhase>(GamePhase.Intro);
  const [currentSequence, setCurrentSequence] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const generateSequence = useCallback(() => {
    let chars = '';
    
    if (useUppercase) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (useLowercase) chars += 'abcdefghjkmnpqrstuvwxyz';
    if (useNumbers) chars += '23456789';
    
    // If not excluding similar chars, add them back
    if (!excludeSimilarChars) {
      if (useUppercase) chars += 'IO';
      if (useLowercase) chars += 'ilo';
      if (useNumbers) chars += '01';
    }
    
    // Fallback if no character types selected
    if (chars.length === 0) chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    
    let result = '';
    const charsLength = chars.length;
    
    for (let i = 0; i < difficulty; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    
    return result;
  }, [difficulty, useUppercase, useLowercase, useNumbers, excludeSimilarChars]);
  
  const startGame = () => {
    const sequence = generateSequence();
    setCurrentSequence(sequence);
    setCurrentPhase(GamePhase.Display);
    setIsCorrect(null);
  };
  
  const handleDisplayEnd = () => {
    setCurrentPhase(GamePhase.Delay);
  };
  
  const handleDelayEnd = () => {
    setCurrentPhase(GamePhase.Input);
  };
  
  const handleAnswerSubmit = (answer: string) => {
    const isAnswerCorrect = answer === currentSequence;
    setIsCorrect(isAnswerCorrect);
    setTotalAttempts(prev => prev + 1);
    
    if (isAnswerCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    setCurrentPhase(GamePhase.Feedback);
  };
  
  const handleContinue = () => {
    setCurrentPhase(GamePhase.Intro);
  };
  
  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };
  
  return (
    <div className="game-container">
      <div className="relative">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-game-purple mb-2 animate-rotate-swing inline-block">
            Brainy Buddies
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">Memory Challenge</p>
        </div>
        
        {/* Score Board */}
        <ScoreBoard correctCount={correctCount} totalAttempts={totalAttempts} />
        
        {/* Main Game Area */}
        <div className="game-card relative mb-6">
          {currentPhase === GamePhase.Intro && (
            <div className="text-center animate-fade-in">
              <Mascot mood="happy" className="mx-auto mb-6" />
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-game-purple">
                Welcome to Memory Challenge!
              </h2>
              
              <p className="text-lg mb-6">
                I'll show you some letters and numbers. 
                Try to remember them, and after they disappear, 
                type what you saw!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={startGame}
                  className="game-button bg-game-purple hover:bg-purple-700"
                >
                  Start Game
                </Button>
                
                <Button
                  onClick={toggleSettings}
                  variant="outline"
                  className="border-2 border-game-purple text-game-purple hover:bg-game-soft-blue"
                >
                  {showSettings ? "Hide Settings" : "Show Settings"}
                </Button>
              </div>
            </div>
          )}
          
          {(currentPhase === GamePhase.Display || currentPhase === GamePhase.Delay || currentPhase === GamePhase.Input) && (
            <div className="text-center">
              {currentPhase === GamePhase.Display && (
                <div className="mb-4">
                  <Mascot mood="thinking" className="mx-auto mb-4" />
                  <p className="text-xl font-bold text-game-blue mb-2">Memorize these!</p>
                </div>
              )}
              
              {currentPhase === GamePhase.Delay && (
                <div className="mb-4">
                  <Mascot mood="thinking" className="mx-auto mb-4" />
                  <p className="text-xl font-bold text-game-orange mb-2">Get ready to recall...</p>
                </div>
              )}
              
              {currentPhase === GamePhase.Input && (
                <div className="mb-4">
                  <Mascot mood="thinking" className="mx-auto mb-4" />
                  <p className="text-xl font-bold text-game-pink mb-2">What did you see?</p>
                </div>
              )}
              
              <MemoryDisplay
                characters={currentSequence}
                isDisplaying={currentPhase === GamePhase.Display}
                displayTime={displayTime}
                onDisplayEnd={handleDisplayEnd}
              />
              
              {currentPhase === GamePhase.Delay && (
                <CountdownTimer
                  duration={delayTime}
                  isActive={currentPhase === GamePhase.Delay}
                  onComplete={handleDelayEnd}
                />
              )}
              
              <InputField
                onSubmit={handleAnswerSubmit}
                isActive={currentPhase === GamePhase.Input}
              />
            </div>
          )}
          
          {currentPhase === GamePhase.Feedback && (
            <FeedbackDisplay
              isCorrect={isCorrect}
              correctAnswer={currentSequence}
              onContinue={handleContinue}
            />
          )}
        </div>
        
        {/* Settings Section */}
        {showSettings && (
          <Settings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            delayTime={delayTime}
            setDelayTime={setDelayTime}
            useUppercase={useUppercase}
            setUseUppercase={setUseUppercase}
            useLowercase={useLowercase}
            setUseLowercase={setUseLowercase}
            useNumbers={useNumbers}
            setUseNumbers={setUseNumbers}
            excludeSimilarChars={excludeSimilarChars}
            setExcludeSimilarChars={setExcludeSimilarChars}
          />
        )}
      </div>
    </div>
  );
};

export default GameContainer;
