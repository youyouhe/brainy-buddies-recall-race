
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SettingsProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
  displayTime: number;
  setDisplayTime: (value: number) => void;
  delayTime: number;
  setDelayTime: (value: number) => void;
  useUppercase: boolean;
  setUseUppercase: (value: boolean) => void;
  useLowercase: boolean;
  setUseLowercase: (value: boolean) => void;
  useNumbers: boolean;
  setUseNumbers: (value: boolean) => void;
  excludeSimilarChars: boolean;
  setExcludeSimilarChars: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({
  difficulty,
  setDifficulty,
  displayTime,
  setDisplayTime,
  delayTime,
  setDelayTime,
  useUppercase,
  setUseUppercase,
  useLowercase,
  setUseLowercase,
  useNumbers,
  setUseNumbers,
  excludeSimilarChars,
  setExcludeSimilarChars,
}) => {
  return (
    <div className="game-card bg-game-soft-yellow my-6">
      <h2 className="text-2xl font-bold mb-4 text-game-orange">Game Settings</h2>
      
      <div className="slider-container">
        <div className="flex justify-between mb-2">
          <Label htmlFor="difficulty">Difficulty (Characters)</Label>
          <span className="font-bold">{difficulty}</span>
        </div>
        <Slider
          id="difficulty"
          min={3}
          max={10}
          step={1}
          value={[difficulty]}
          onValueChange={(value) => setDifficulty(value[0])}
          className="my-4"
        />
      </div>
      
      <div className="slider-container">
        <div className="flex justify-between mb-2">
          <Label htmlFor="displayTime">Display Time (seconds)</Label>
          <span className="font-bold">{displayTime}</span>
        </div>
        <Slider
          id="displayTime"
          min={1}
          max={10}
          step={1}
          value={[displayTime]}
          onValueChange={(value) => setDisplayTime(value[0])}
          className="my-4"
        />
      </div>
      
      <div className="slider-container">
        <div className="flex justify-between mb-2">
          <Label htmlFor="delayTime">Delay Time (seconds)</Label>
          <span className="font-bold">{delayTime}</span>
        </div>
        <Slider
          id="delayTime"
          min={1}
          max={15}
          step={1}
          value={[delayTime]}
          onValueChange={(value) => setDelayTime(value[0])}
          className="my-4"
        />
      </div>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-bold mb-2">Character Types</h3>
        
        <div className="checkbox-container">
          <Switch
            id="uppercase"
            checked={useUppercase}
            onCheckedChange={setUseUppercase}
            disabled={!useLowercase && !useNumbers && useUppercase}
          />
          <Label htmlFor="uppercase" className="ml-2">Include UPPERCASE letters</Label>
        </div>
        
        <div className="checkbox-container">
          <Switch
            id="lowercase"
            checked={useLowercase}
            onCheckedChange={setUseLowercase}
            disabled={!useUppercase && !useNumbers && useLowercase}
          />
          <Label htmlFor="lowercase" className="ml-2">Include lowercase letters</Label>
        </div>
        
        <div className="checkbox-container">
          <Switch
            id="numbers"
            checked={useNumbers}
            onCheckedChange={setUseNumbers}
            disabled={!useUppercase && !useLowercase && useNumbers}
          />
          <Label htmlFor="numbers" className="ml-2">Include numbers</Label>
        </div>
        
        <div className="checkbox-container">
          <Switch
            id="similar"
            checked={excludeSimilarChars}
            onCheckedChange={setExcludeSimilarChars}
          />
          <Label htmlFor="similar" className="ml-2">Exclude similar-looking characters (0/O, 1/I, etc.)</Label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
