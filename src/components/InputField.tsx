
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface InputFieldProps {
  onSubmit: (answer: string) => void;
  isActive: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ onSubmit, isActive }) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
    
    if (!isActive) {
      setAnswer('');
    }
  }, [isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-8">
      <div className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type what you remember..."
          disabled={!isActive}
          className="input-field w-full border-game-pink focus:border-game-purple focus:ring-game-purple"
        />
        <Button
          type="submit"
          disabled={!isActive || !answer.trim()}
          className="game-button bg-game-pink hover:bg-pink-500 w-full md:w-auto"
        >
          Check My Answer!
        </Button>
      </div>
    </form>
  );
};

export default InputField;
