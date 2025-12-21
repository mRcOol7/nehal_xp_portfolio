import React, { useState, useEffect, useCallback } from 'react';
import windowsXPImage from '@/assets/images.png';

interface XPBootScreenProps {
  onComplete: () => void;
  duration?: number;
}

const XPBootScreen: React.FC<XPBootScreenProps> = ({ onComplete, duration = 2500 }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const handleComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  }, [onComplete]);


  // Show skip hint after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Progress animation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, handleComplete]);

  // ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleComplete]);

  // Click to skip on mobile
  const handleClick = () => {
    handleComplete();
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClick}
    >
      {/* XP Logo */}
      <div className="flex flex-col items-center mb-16 animate-pulse-subtle">
        {/* Windows XP Image */}
        <img 
          src={windowsXPImage} 
          alt="Windows XP" 
          className="w-32 h-32 md:w-48 md:h-48 object-contain mb-6"
        />

        {/* Windows XP Text */}
        <div className="mt-6 text-center">
          <div className="text-white text-2xl md:text-4xl font-light tracking-wider">
            Windows<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">XP</span>
          </div>
          <div className="text-gray-500 text-xs md:text-sm mt-1 italic">
            Professional
          </div>
        </div>
      </div>

      {/* Loading Bar Container */}
      <div className="w-48 md:w-64 h-4 bg-gray-900 border border-gray-700 rounded-sm overflow-hidden relative">
        {/* Loading bar background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        
        {/* Animated loading blocks */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div 
            className="flex gap-0.5 animate-loading-blocks"
            style={{ 
              animationDuration: '1.5s',
              width: '200%',
            }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-2.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-sm flex-shrink-0"
                style={{
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress overlay (clips the animation) */}
        <div 
          className="absolute inset-0 bg-black transition-all duration-100"
          style={{ 
            left: `${progress}%`,
            right: 0,
          }}
        />
      </div>

      {/* Loading text */}
      <div className="mt-6 text-gray-400 text-xs md:text-sm">
        Loading your personal files...
      </div>

      {/* Skip hint */}
      <div 
        className={`absolute bottom-8 text-gray-600 text-xs transition-opacity duration-500 ${
          showSkip ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Press ESC or tap to skip
      </div>

      {/* Copyright */}
      <div className="absolute bottom-4 left-4 text-gray-700 text-xs">
        © 2024 Nehal Chauhan Portfolio
      </div>

      {/* Microsoft Copyright (authentic look) */}
      <div className="absolute bottom-4 right-4 text-gray-700 text-xs">
        Microsoft® Windows XP Style
      </div>
    </div>
  );
};

export default XPBootScreen;
