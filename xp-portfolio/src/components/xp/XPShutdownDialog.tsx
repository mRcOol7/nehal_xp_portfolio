import React, { useState } from 'react';
import { Power, RotateCcw, Moon, X } from 'lucide-react';

interface XPShutdownDialogProps {
  onClose: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

type ShutdownOption = 'shutdown' | 'restart' | 'standby';

const XPShutdownDialog: React.FC<XPShutdownDialogProps> = ({ onClose, onShutdown, onRestart }) => {
  const [selectedOption, setSelectedOption] = useState<ShutdownOption>('shutdown');
  const [isClosing, setIsClosing] = useState(false);

  const handleOptionSelect = (option: ShutdownOption) => {
    setSelectedOption(option);
  };

  const handleOk = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (selectedOption === 'shutdown') {
        onShutdown();
      } else if (selectedOption === 'restart') {
        onRestart();
      } else {
        onClose();
      }
    }, 200);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  };

  const options = [
    { id: 'standby' as const, label: 'Stand By', icon: Moon, color: 'from-yellow-500 to-orange-500' },
    { id: 'shutdown' as const, label: 'Turn Off', icon: Power, color: 'from-red-500 to-red-600' },
    { id: 'restart' as const, label: 'Restart', icon: RotateCcw, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div 
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Dialog Box */}
      <div 
        className="relative animate-scale-in"
        style={{
          background: 'linear-gradient(180deg, #1A3B6D 0%, #0D2847 100%)',
          borderRadius: '16px',
          padding: '2px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Inner content */}
        <div 
          className="rounded-[14px] px-8 py-6 md:px-12 md:py-8"
          style={{
            background: 'linear-gradient(180deg, #3A6EA5 0%, #1E4B7A 50%, #0D2847 100%)',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-white text-lg md:text-xl font-medium">
              Turn off computer
            </h2>
          </div>

          {/* Options */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            {options.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedOption === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    isSelected 
                      ? 'bg-white/10 scale-105' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Icon Circle */}
                  <div 
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all bg-gradient-to-br ${option.color} ${
                      isSelected ? 'shadow-lg ring-2 ring-white/30' : ''
                    }`}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-sm font-medium transition-colors ${
                    isSelected ? 'text-white' : 'text-white/70'
                  }`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleOk}
              className="px-6 py-1.5 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-white hover:to-gray-100 text-gray-800 text-sm font-medium rounded border border-gray-400 shadow-sm transition-all min-w-[80px]"
            >
              OK
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-1.5 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-white hover:to-gray-100 text-gray-800 text-sm font-medium rounded border border-gray-400 shadow-sm transition-all min-w-[80px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XPShutdownDialog;
