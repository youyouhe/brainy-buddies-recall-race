
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import SoundEffects from '@/utils/SoundEffects';

const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Initialize sounds when component mounts
    SoundEffects.init();
    setMuted(SoundEffects.isMuted());
  }, []);

  const toggleSound = () => {
    const isMuted = SoundEffects.toggleMute();
    setMuted(isMuted);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSound}
      className="rounded-full w-10 h-10 border-2 border-game-purple text-game-purple hover:bg-game-soft-blue"
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </Button>
  );
};

export default SoundToggle;
