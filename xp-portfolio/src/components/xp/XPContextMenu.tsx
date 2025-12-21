import React from 'react';
import { RefreshCw, FolderPlus, Image, Settings, ArrowUpDown, Monitor, User } from 'lucide-react';

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
  disabled?: boolean;
}

interface XPContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onOpenWindow: (id: string) => void;
}

const XPContextMenu: React.FC<XPContextMenuProps> = ({ x, y, onClose, onRefresh, onOpenWindow }) => {
  const menuItems: ContextMenuItem[] = [
    {
      label: 'View',
      icon: <ArrowUpDown className="w-4 h-4" />,
      onClick: () => {},
      disabled: true,
    },
    {
      label: 'Sort Icons By',
      icon: <ArrowUpDown className="w-4 h-4" />,
      onClick: () => {},
      disabled: true,
    },
    {
      label: 'Refresh',
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: () => {
        onRefresh();
        onClose();
      },
    },
    { label: '', onClick: () => {}, divider: true },
    {
      label: 'New Folder',
      icon: <FolderPlus className="w-4 h-4" />,
      onClick: () => {
        onClose();
      },
      disabled: true,
    },
    { label: '', onClick: () => {}, divider: true },
    {
      label: 'My Computer',
      icon: <Monitor className="w-4 h-4" />,
      onClick: () => {
        onOpenWindow('mycomputer');
        onClose();
      },
    },
    {
      label: 'About Me',
      icon: <User className="w-4 h-4" />,
      onClick: () => {
        onOpenWindow('about');
        onClose();
      },
    },
    { label: '', onClick: () => {}, divider: true },
    {
      label: 'Display Properties',
      icon: <Image className="w-4 h-4" />,
      onClick: () => {
        onClose();
      },
      disabled: true,
    },
    {
      label: 'Properties',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => {
        onClose();
      },
      disabled: true,
    },
  ];

  // Adjust position to keep menu on screen
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 350);

  return (
    <>
      {/* Backdrop to close menu */}
      <div className="fixed inset-0 z-[100]" onClick={onClose} onContextMenu={(e) => e.preventDefault()} />
      
      {/* Context Menu */}
      <div
        className="fixed z-[101] min-w-48 py-1 bg-white border border-gray-400 shadow-lg"
        style={{
          left: adjustedX,
          top: adjustedY,
          boxShadow: '2px 2px 5px rgba(0,0,0,0.3), inset 1px 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {menuItems.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={index}
                className="my-1 mx-1 border-t border-gray-300"
              />
            );
          }

          return (
            <button
              key={index}
              className={`w-full px-4 py-1 text-left text-sm flex items-center gap-3 ${
                item.disabled
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-800 hover:bg-blue-600 hover:text-white'
              }`}
              onClick={item.disabled ? undefined : item.onClick}
              disabled={item.disabled}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default XPContextMenu;
