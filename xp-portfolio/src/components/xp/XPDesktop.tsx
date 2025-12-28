import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, User, Briefcase, GraduationCap, Code, FolderOpen, FileText, Mail, Terminal } from 'lucide-react';
import blissWallpaper from '@/assets/bliss-wallpaper.jpg';
import XPIcon from './XPIcon';
import XPWindow from './XPWindow';
import XPTaskbar from './XPTaskbar';
import XPContextMenu from './XPContextMenu';
import XPBootScreen from './XPBootScreen';
import XPLoginScreen from './XPLoginScreen';
import XPShutdownDialog from './XPShutdownDialog';
import XPShutdownScreen from './XPShutdownScreen';
import AboutWindow from './windows/AboutWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import EducationWindow from './windows/EducationWindow';
import SkillsWindow from './windows/SkillsWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ResumeWindow from './windows/ResumeWindow';
import ContactWindow from './windows/ContactWindow';
import MyComputerWindow from './windows/MyComputerWindow';
import XPTerminal from './windows/XPTerminal';


interface WindowData {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
}

const XPDesktop: React.FC = () => {
  const [showBootScreen, setShowBootScreen] = useState(() => {
    const hasBooted = sessionStorage.getItem('xp-booted');
    const wasShutdown = sessionStorage.getItem('xpShutdownState');
    
    // Show boot screen if first time OR coming from shutdown
    if (!hasBooted || wasShutdown === 'true') {
      return true;
    }
    return false;
  });
  const [showLoginScreen, setShowLoginScreen] = useState(() => {
    const hasLoggedIn = localStorage.getItem('xp-logged-in');
    const wasShutdown = sessionStorage.getItem('xpShutdownState');
    
    // Show login screen if first time OR coming from shutdown
    if (!hasLoggedIn || wasShutdown === 'true') {
      return true;
    }
    return false;
  });
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [showShutdownScreen, setShowShutdownScreen] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowZIndex, setWindowZIndex] = useState<Record<string, number>>({});
  const [highestZ, setHighestZ] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ show: false, x: 0, y: 0 });
  
  const [iconsAnimated, setIconsAnimated] = useState(false);
  
  // Marquee selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const selectionStart = React.useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Clear login state when user closes browser (not when refreshing)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only clear if not refreshing (check for refresh vs close)
      // This is a best effort approach as browsers limit this functionality
      localStorage.removeItem('xp-logged-in');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBootComplete = useCallback(() => {
    const wasShutdown = sessionStorage.getItem('xpShutdownState');
    
    // If coming from shutdown, clear login state to show login screen
    if (wasShutdown === 'true') {
      localStorage.removeItem('xp-logged-in');
      // Clear shutdown state after boot completes
      sessionStorage.removeItem('xpShutdownState');
      sessionStorage.removeItem('xpIsRestart');
    }
    
    sessionStorage.setItem('xp-booted', 'true');
    setShowBootScreen(false);
  }, []);

  const handleLoginComplete = useCallback(() => {
    localStorage.setItem('xp-logged-in', 'true');
    setShowLoginScreen(false);
    
    // Delay to allow fade transition
    setTimeout(() => {
      setDesktopReady(true);
      // Animate icons appearing
      setTimeout(() => setIconsAnimated(true), 100);
    }, 100);
  }, []);

  // If already logged in, set desktop ready immediately
  useEffect(() => {
    if (!showBootScreen && !showLoginScreen) {
      setDesktopReady(true);
      setIconsAnimated(true);
    }
  }, [showBootScreen, showLoginScreen]);

  const windowsData: Record<string, WindowData> = {
    mycomputer: {
      id: 'mycomputer',
      title: 'My Computer',
      icon: <Monitor className="w-4 h-4" />,
      component: <MyComputerWindow />,
    },
    about: {
      id: 'about',
      title: 'About Me',
      icon: <User className="w-4 h-4" />,
      component: <AboutWindow />,
    },
    experience: {
      id: 'experience',
      title: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      component: <ExperienceWindow />,
    },
    education: {
      id: 'education',
      title: 'Education',
      icon: <GraduationCap className="w-4 h-4" />,
      component: <EducationWindow />,
    },
    skills: {
      id: 'skills',
      title: 'Skills',
      icon: <Code className="w-4 h-4" />,
      component: <SkillsWindow />,
    },
    projects: {
      id: 'projects',
      title: 'Projects',
      icon: <FolderOpen className="w-4 h-4" />,
      component: <ProjectsWindow />,
    },
    resume: {
      id: 'resume',
      title: 'Resume.pdf',
      icon: <FileText className="w-4 h-4" />,
      component: <ResumeWindow />,
    },
    contact: {
      id: 'contact',
      title: 'Contact Me',
      icon: <Mail className="w-4 h-4" />,
      component: <ContactWindow />,
    },
    terminal: {
      id: 'terminal',
      title: 'Terminal',
      icon: <Terminal className="w-4 h-4" />,
      component: <XPTerminal />,
    },
  };

  const desktopIcons = [
    { id: 'mycomputer', label: 'My Computer', icon: <Monitor className="w-10 h-10 text-yellow-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'about', label: 'About Me', icon: <User className="w-10 h-10 text-sky-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-10 h-10 text-amber-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-10 h-10 text-pink-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-10 h-10 text-green-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-10 h-10 text-yellow-200 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'resume', label: 'Resume.pdf', icon: <FileText className="w-10 h-10 text-red-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
    { id: 'contact', label: 'Contact Me', icon: <Mail className="w-10 h-10 text-cyan-300 drop-shadow-lg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} /> },
  ];

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    const newZ = highestZ + 1;
    setWindowZIndex({ ...windowZIndex, [id]: newZ });
    setHighestZ(newZ);
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows.filter((w) => w !== id)[0] || null);
    }
  };

  const focusWindow = (id: string) => {
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    const newZ = highestZ + 1;
    setWindowZIndex({ ...windowZIndex, [id]: newZ });
    setHighestZ(newZ);
    setActiveWindow(id);
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => [...prev, id]);
    const remainingWindows = openWindows.filter(w => w !== id && !minimizedWindows.includes(w));
    setActiveWindow(remainingWindows[remainingWindows.length - 1] || null);
  };

  const handleTaskbarClick = (id: string) => {
    const isMinimized = minimizedWindows.includes(id);
    if (activeWindow === id && !isMinimized) {
      // Minimize if clicking on active window
      minimizeWindow(id);
    } else {
      // Focus/restore window
      focusWindow(id);
    }
  };

  const getWindowPosition = (id: string, index: number) => {
    const offset = index * 30;
    return { x: 100 + offset, y: 50 + offset };
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // Don't show context menu if we're in the middle of a selection
    if (isSelecting) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Marquee selection handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only desktop background, allow both left (0) and right (2) clicks
    if ((e.button !== 0 && e.button !== 2) || (e.target as HTMLElement).closest('[data-icon]')) return;

    // Prevent context menu on right click
    if (e.button === 2) {
      e.preventDefault();
    }

    selectionStart.current = { x: e.clientX, y: e.clientY };
    setSelectionBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    setIsSelecting(true);
    setSelectedIcons([]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSelecting) return;

    const startX = selectionStart.current.x;
    const startY = selectionStart.current.y;

    setSelectionBox({
      x: Math.min(startX, e.clientX),
      y: Math.min(startY, e.clientY),
      width: Math.abs(e.clientX - startX),
      height: Math.abs(e.clientY - startY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isSelecting) return;

    // Prevent context menu if this was a right-click selection
    if (e.button === 2) {
      e.preventDefault();
    }

    const box = document.getElementById('marquee-box');
    if (!box) return;

    const boxRect = box.getBoundingClientRect();
    const icons = document.querySelectorAll('[data-icon]');
    const selected: string[] = [];

    // Only update selection if we've dragged a reasonable distance
    const minDragDistance = 5;
    const hasDragged = 
      Math.abs(selectionStart.current.x - e.clientX) > minDragDistance ||
      Math.abs(selectionStart.current.y - e.clientY) > minDragDistance;

    if (hasDragged) {
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const overlap =
          rect.left < boxRect.right &&
          rect.right > boxRect.left &&
          rect.top < boxRect.bottom &&
          rect.bottom > boxRect.top;

        if (overlap) {
          const id = icon.getAttribute('data-id');
          if (id) selected.push(id);
        }
      });

      setSelectedIcons(selected);
    } else if (e.button === 0) {
      // If it was just a click (not drag), clear selection
      setSelectedIcons([]);
    }

    setIsSelecting(false);
  };

  const handleRefresh = () => {
    // Refresh desktop only - close all windows and reset desktop state
    setOpenWindows([]);
    setMinimizedWindows([]);
    setActiveWindow(null);
    setWindowZIndex({});
    setHighestZ(1);
    setContextMenu({ show: false, x: 0, y: 0 });
    
    // Brief animation to indicate refresh
    setDesktopReady(false);
    setIconsAnimated(false);
    setTimeout(() => {
      setDesktopReady(true);
      setTimeout(() => setIconsAnimated(true), 100);
    }, 300);
  };

  const handleIconClick = (id: string) => {
    openWindow(id);
  };

  const handleIconDoubleClick = (id: string) => {
    if (!isMobile) {
      openWindow(id);
    }
  };

  const handleOpenShutdownDialog = () => {
    setShowShutdownDialog(true);
  };

  const handleShutdown = () => {
    setShowShutdownDialog(false);
    setIsRestarting(false);
    setShowShutdownScreen(true);
  };

  const handleRestart = () => {
    setShowShutdownDialog(false);
    setIsRestarting(true);
    setShowShutdownScreen(true);
  };

  const handleRestartComplete = () => {
    setShowShutdownScreen(false);
    sessionStorage.removeItem('xp-booted');
    sessionStorage.removeItem('xp-logged-in');
    setShowBootScreen(true);
    setShowLoginScreen(true);
    setDesktopReady(false);
    setIconsAnimated(false);
  };

  // Show shutdown screen
  if (showShutdownScreen) {
    return (
      <XPShutdownScreen 
        isRestart={isRestarting} 
        onComplete={isRestarting ? handleRestartComplete : undefined} 
      />
    );
  }

  // Show boot screen if not yet booted
  if (showBootScreen) {
    return <XPBootScreen onComplete={handleBootComplete} duration={2500} />;
  }

  // Show login screen after boot
  if (showLoginScreen) {
    return <XPLoginScreen onLogin={handleLoginComplete} />;
  }

  return (
    <div
      className={`fixed inset-0 font-tahoma overflow-hidden transition-opacity duration-500 ${
        desktopReady ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${blissWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setIsSelecting(false)}
    >
      {/* Desktop Icons */}
      <div 
        className={`p-2 pb-12 h-[calc(100%-40px)] overflow-y-auto ${isMobile ? 'grid grid-cols-3 gap-2 content-start' : 'flex flex-col flex-wrap gap-1 items-start content-start'}`}
        onClick={() => setContextMenu({ show: false, x: 0, y: 0 })}
      >
        {desktopIcons.map((icon, index) => (
          <div
            key={icon.id}
            data-icon
            data-id={icon.id}
            className={`${selectedIcons.includes(icon.id) ? 'ring-2 ring-blue-500 bg-blue-500/20' : ''}`}
          >
            <XPIcon
              icon={icon.icon}
              label={icon.label}
              onClick={() => isMobile ? handleIconClick(icon.id) : undefined}
              onDoubleClick={() => !isMobile ? handleIconDoubleClick(icon.id) : undefined}
              className={isMobile ? 'bg-black/20 rounded-lg p-3 w-full' : ''}
            />
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu.show && (
        <XPContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ show: false, x: 0, y: 0 })}
          onRefresh={handleRefresh}
          onOpenWindow={openWindow}
        />
      )}

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const windowData = windowsData[windowId];
        if (!windowData) return null;

        return (
          <XPWindow
            key={windowId}
            title={windowData.title}
            icon={windowData.icon}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onFocus={() => focusWindow(windowId)}
            zIndex={windowZIndex[windowId] || 1}
            isActive={activeWindow === windowId}
            isMinimized={minimizedWindows.includes(windowId)}
            initialPosition={getWindowPosition(windowId, index)}
            isMobile={isMobile}
          >
            {windowData.component}
          </XPWindow>
        );
      })}

      {/* Shutdown Dialog */}
      {showShutdownDialog && (
        <XPShutdownDialog
          onClose={() => setShowShutdownDialog(false)}
          onShutdown={handleShutdown}
          onRestart={handleRestart}
        />
      )}

      {/* Taskbar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${desktopReady ? 'translate-y-0' : 'translate-y-full'}`}>
        <XPTaskbar
          openWindows={openWindows.map((id) => ({
            id,
            title: windowsData[id]?.title || id,
            icon: windowsData[id]?.icon,
          }))}
          activeWindowId={activeWindow}
          onWindowClick={handleTaskbarClick}
          onOpenWindow={openWindow}
          onShutdown={handleOpenShutdownDialog}
          onWindowClose={closeWindow}
          onWindowMinimize={minimizeWindow}
          onWindowRestore={focusWindow}
        />
      </div>

      {/* Marquee selection box */}
      {isSelecting && (
        <div
          id="marquee-box"
          style={{
            position: 'fixed',
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            background: 'rgba(0, 120, 215, 0.2)',
            border: '1px dashed #0078d7',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default XPDesktop;
