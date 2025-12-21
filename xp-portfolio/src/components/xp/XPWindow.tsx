import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface XPWindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  isActive: boolean;
  isMinimized: boolean;
  initialPosition?: { x: number; y: number };
  isMobile?: boolean;
}

const XPWindow: React.FC<XPWindowProps> = ({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  isActive,
  isMinimized,
  initialPosition = { x: 100, y: 50 },
  isMobile = false,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) {
      setIsMaximized(true);
    }
  }, [isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    onFocus();
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: Math.max(0, e.clientY - dragOffset.y),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        zIndex,
      }
    : {
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex,
        minWidth: isMobile ? '100%' : '400px',
        maxWidth: isMobile ? '100%' : '600px',
      };

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`xp-window ${isMaximized ? 'rounded-none' : ''}`}
      style={windowStyle}
      onClick={onFocus}
    >
      <div
        className={`xp-title-bar ${!isActive ? 'opacity-70' : ''}`}
        onMouseDown={handleMouseDown}
        style={{ cursor: isMaximized ? 'default' : 'move' }}
      >
        <div className="xp-title-text">
          {icon}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-0.5">
          <button 
            className="xp-control-btn" 
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            className="xp-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!isMobile) setIsMaximized(!isMaximized);
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            className="xp-control-btn xp-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className={`xp-window-content xp-scrollbar overflow-auto ${isMaximized ? 'h-[calc(100%-32px)]' : 'max-h-[70vh]'}`}>
        {children}
      </div>
    </div>
  );
};

export default XPWindow;
