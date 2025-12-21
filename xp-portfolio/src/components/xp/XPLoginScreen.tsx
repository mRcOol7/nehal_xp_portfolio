import React, { useState, useEffect } from 'react';
import { User, ArrowRight, Power, HelpCircle } from 'lucide-react';
import passportImage from '@/assets/Passport image.jpg';
import startupSound from '@/assets/Microsoft Windows XP Startup Sound.mp3';

interface XPLoginScreenProps {
  onLogin: () => void;
}

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  hasPassword: boolean;
}

const XPLoginScreen: React.FC<XPLoginScreenProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState('');

  // Play startup sound on successful login
  const playStartupSound = () => {
    try {
      const audio = new Audio(startupSound);
      audio.volume = 0.7; // Set volume to 70%
      audio.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  };

  const users: UserProfile[] = [
    { id: 'nehal', name: 'Nehal Chauhan', avatar: passportImage, hasPassword: false },
  ];

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleUserSelect = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(userId);
    setPassword('');
    setError('');
    
    if (user && !user.hasPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleLogin = () => {
    if (!selectedUser) return;
    
    const user = users.find(u => u.id === selectedUser);
    
    // If user has password, validate (for demo, any password works)
    if (user?.hasPassword && password.length === 0) {
      setError('Please enter your password');
      return;
    }

    // Play startup sound before fading out
    playStartupSound();

    setFadeOut(true);
    
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleTurnOff = () => {
    // Navigate to shutdown screen or trigger shutdown
    window.location.reload(); // For now, just reload the page
  };

  const handleHelp = () => {
    // Show help information
    alert('Windows XP Login Help:\n\n' +
          '• Click on your user name to log in\n' +
          '• If your account has a password, enter it and press Enter\n' +
          '• Press ESC to go back\n' +
          '• Click "Turn off computer" to shutdown\n\n' +
          'Portfolio Edition by Nehal Chauhan');
  };

  return (
    <div
      className={`fixed inset-0 z-[150] flex flex-col transition-opacity duration-500 ${
        fadeIn && !fadeOut ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(180deg, #1E3A5F 0%, #0F1C2E 50%, #000000 100%)',
      }}
    >
      {/* Top blue bar */}
      <div 
        className="h-2"
        style={{
          background: 'linear-gradient(90deg, #245EDC 0%, #3B7BD8 50%, #245EDC 100%)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center gap-2">
          {/* Windows Logo */}
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-tl-sm transform -skew-x-3" />
              <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-green-600 rounded-tr-sm transform skew-x-3" />
            </div>
            <div className="flex gap-0.5">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-sm transform -skew-x-3" />
              <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-sm transform skew-x-3" />
            </div>
          </div>
          <span className="text-white text-sm md:text-base font-light tracking-wide">
            Windows<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">XP</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span className="hidden md:inline">Portfolio Edition</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Welcome Text */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-white text-2xl md:text-4xl font-light tracking-wide mb-2">
            To begin, click your user name
          </h1>
        </div>

        {/* User Selection Area */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={`group flex items-center gap-4 p-4 rounded-lg transition-all duration-200 w-full md:w-auto ${
                  selectedUser === user.id
                    ? 'bg-white/10 shadow-lg shadow-blue-500/20'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Avatar */}
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover transition-all ${
                      selectedUser === user.id
                        ? 'shadow-lg shadow-blue-500/30'
                        : 'group-hover:shadow-lg group-hover:shadow-blue-500/20'
                    }`}
                  />
                ) : (
                  <div 
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center transition-all ${
                      selectedUser === user.id
                        ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30'
                        : 'bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-blue-500 group-hover:to-blue-600'
                    }`}
                  >
                    <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                )}

                {/* Name */}
                <div className="text-left flex-1">
                  <div className={`text-lg md:text-xl font-medium transition-colors ${
                    selectedUser === user.id ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}>
                    {user.name}
                  </div>
                  {user.hasPassword && (
                    <div className="text-white/40 text-xs">Password protected</div>
                  )}
                </div>

                {/* Arrow */}
                {selectedUser === user.id && (
                  <div className="hidden md:block">
                    <ArrowRight className="w-5 h-5 text-white/60" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Password Input (if needed) */}
          {selectedUser && showPassword && (
            <div className="mt-6 flex flex-col items-center animate-fade-in">
              <div className="flex items-center gap-2 bg-white rounded px-3 py-2">
                <input
                  type="password"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none text-gray-800 text-sm w-48"
                  autoFocus
                />
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-3 py-1 rounded text-sm transition-all"
                >
                  →
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-400 text-xs">{error}</div>
              )}
            </div>
          )}

          {/* Login Button (for users without password) */}
          {selectedUser && !showPassword && (
            <div className="mt-6 flex justify-center animate-fade-in">
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-gradient-to-b from-[#3B82F6] to-[#1E40AF] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white px-6 py-2 rounded shadow-lg shadow-blue-500/30 transition-all text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4" />
                Log On
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
            onClick={handleTurnOff}
          >
            <Power className="w-4 h-4" />
            <span className="hidden md:inline">Turn off computer</span>
          </button>
        </div>

        <div className="text-white/40 text-xs">
          After you log on, you can add or change accounts.
        </div>

        <button 
          className="flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors"
          onClick={handleHelp}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline">Help</span>
        </button>
      </div>

      {/* Bottom blue bar */}
      <div 
        className="h-2"
        style={{
          background: 'linear-gradient(90deg, #245EDC 0%, #3B7BD8 50%, #245EDC 100%)',
        }}
      />
    </div>
  );
};

export default XPLoginScreen;
