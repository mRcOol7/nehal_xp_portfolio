import React, { useState, useEffect } from 'react';
import { Monitor, X, Maximize2, Minimize2 } from 'lucide-react';
import XPStartMenu from './XPStartMenu';
import windowsXPImage from '@/assets/images.png';

interface OpenWindow {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface XPTaskbarProps {
  openWindows: OpenWindow[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onOpenWindow: (id: string) => void;
  onShutdown?: () => void;
  onWindowClose?: (id: string) => void;
  onWindowMinimize?: (id: string) => void;
  onWindowRestore?: (id: string) => void;
}

const XPTaskbar: React.FC<XPTaskbarProps> = ({
  openWindows,
  activeWindowId,
  onWindowClick,
  onOpenWindow,
  onShutdown,
  onWindowClose,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ show: boolean; x: number; y: number; windowId: string | null }>({ show: false, x: 0, y: 0, windowId: null });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleContextMenu = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure menu stays within viewport
    const x = Math.min(e.clientX, window.innerWidth - 150); // 150px is approximate menu width
    const y = Math.min(e.clientY, window.innerHeight - 120); // 120px is approximate menu height
    
    setContextMenu({
      show: true,
      x,
      y,
      windowId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, windowId: null });
  };

  const handleContextMenuAction = (action: string) => {
    if (contextMenu.windowId) {
      switch (action) {
        case 'restore':
          onWindowRestore?.(contextMenu.windowId);
          break;
        case 'minimize':
          onWindowMinimize?.(contextMenu.windowId);
          break;
        case 'close':
          onWindowClose?.(contextMenu.windowId);
          break;
      }
    }
    closeContextMenu();
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't close if clicking on the context menu itself
      const target = e.target as Element;
      if (!target.closest('.context-menu')) {
        closeContextMenu();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {showStartMenu && (
        <XPStartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={(id) => {
            onOpenWindow(id);
            setShowStartMenu(false);
          }}
          onShutdown={() => {
            setShowStartMenu(false);
            onShutdown?.();
          }}
        />
      )}
      <div className="xp-taskbar fixed bottom-0 left-0 right-0 z-50">
        <button
          className="xp-start-btn"
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <img 
            src={windowsXPImage} 
            alt="Windows XP" 
            className="w-5 h-5 object-contain"
          />
          <span className="hidden sm:inline">start</span>
        </button>

        <div className="flex-1 flex items-center px-1 overflow-x-auto">
          {openWindows.map((window) => (
            <button
              key={window.id}
              className={`xp-taskbar-btn ${activeWindowId === window.id ? 'active' : ''}`}
              onClick={() => onWindowClick(window.id)}
              onContextMenu={(e) => handleContextMenu(e, window.id)}
              title={window.title}
            >
              {window.icon || <Monitor className="w-4 h-4" />}
              <span className="truncate hidden sm:inline">{window.title}</span>
            </button>
          ))}
        </div>

        <div className="xp-clock">
          {formatTime(time)}
        </div>
      </div>

      {/* Taskbar Context Menu */}
      {contextMenu.show && (
        <div
          className="context-menu fixed bg-white border border-gray-300 shadow-lg rounded py-1 z-[60] min-w-32"
          style={{ 
            left: `${contextMenu.x}px`, 
            top: `${contextMenu.y}px`,
            position: 'fixed'
          }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            className="w-full px-3 py-1 text-left text-sm hover:bg-blue-500 hover:text-white flex items-center gap-2"
            onClick={() => handleContextMenuAction('restore')}
          >
            <Maximize2 className="w-3 h-3" />
            Restore
          </button>
          <button
            className="w-full px-3 py-1 text-left text-sm hover:bg-blue-500 hover:text-white flex items-center gap-2"
            onClick={() => handleContextMenuAction('minimize')}
          >
            <Minimize2 className="w-3 h-3" />
            Minimize
          </button>
          <div className="border-t border-gray-300 my-1" />
          <button
            className="w-full px-3 py-1 text-left text-sm hover:bg-blue-500 hover:text-white flex items-center gap-2"
            onClick={() => handleContextMenuAction('close')}
          >
            <X className="w-3 h-3" />
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default XPTaskbar;
