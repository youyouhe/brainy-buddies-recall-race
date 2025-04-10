
import React, { useEffect } from 'react';
import GameContainer from '@/components/GameContainer';
import SoundEffects from '@/utils/SoundEffects';

const Index = () => {
  useEffect(() => {
    // Initialize sound effects when the page loads
    SoundEffects.init();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8">
      <GameContainer />
      
      <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        <p>Brainy Buddies Recall Race - A Memory Challenge Game for Kids</p>
        <p className="text-xs mt-1">Sound effects courtesy of freesound.org</p>
      </footer>
    </div>
  );
};

export default Index;
