
import React from 'react';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8">
      <GameContainer />
      
      <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        <p>Brainy Buddies Recall Race - A Memory Challenge Game for Kids</p>
      </footer>
    </div>
  );
};

export default Index;
