import React, { useState, useEffect } from 'react';
import windowsXPImage from '@/assets/images.png';

interface XPShutdownScreenProps {
  isRestart?: boolean;
  onComplete?: () => void;
}

const XPShutdownScreen: React.FC<XPShutdownScreenProps> = ({ isRestart = false, onComplete }) => {
  const [stage, setStage] = useState<'saving' | 'shuttingdown' | 'off'>('saving');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    
    // Stage transitions
    const savingTimer = setTimeout(() => {
      setStage('shuttingdown');
    }, 1500);

    const shutdownTimer = setTimeout(() => {
      setStage('off');
      if (isRestart && onComplete) {
        setTimeout(onComplete, 1000);
      }
    }, 3000);

    return () => {
      clearTimeout(savingTimer);
      clearTimeout(shutdownTimer);
    };
  }, [isRestart, onComplete]);

  const getMessage = () => {
    if (stage === 'saving') {
      return 'Saving your settings...';
    }
    if (stage === 'shuttingdown') {
      return isRestart ? 'Windows is restarting...' : 'Windows is shutting down...';
    }
    return '';
  };

  return (
    <div 
      className={`fixed inset-0 z-[400] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: stage === 'off' ? '#000000' : 'linear-gradient(180deg, #1E3A5F 0%, #0A1929 100%)',
      }}
    >
      {stage !== 'off' && (
        <>
          {/* Windows Logo */}
          <div className="flex flex-col items-center mb-8 animate-pulse-subtle">
            <img 
              src={windowsXPImage} 
              alt="Windows XP" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4"
            />
          </div>

          {/* Message */}
          <div className="text-white text-lg md:text-xl font-light tracking-wide text-center">
            {getMessage()}
          </div>

          {/* Loading dots */}
          <div className="flex gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </>
      )}

      {/* "It is now safe" message for shutdown */}
      {stage === 'off' && !isRestart && (
        <div className="text-center animate-fade-in">
          <div className="text-orange-400 text-xl md:text-2xl font-medium mb-2">
            It's now safe to turn off
          </div>
          <div className="text-orange-400/70 text-sm">
            your computer.
          </div>
          <div className="mt-8 text-gray-500 text-xs">
            (Refresh the page to restart)
          </div>
        </div>
      )}
    </div>
  );
};

export default XPShutdownScreen;
