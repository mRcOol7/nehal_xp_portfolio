import React, { useEffect, useState } from 'react';
import { User, Briefcase, Code, FileText, Github, Linkedin, Globe, Mail, GraduationCap, Power, Terminal } from 'lucide-react';
import passportImage from '@/assets/Passport image.jpg';

interface XPStartMenuProps {
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  onShutdown?: () => void;
}

const XPStartMenu: React.FC<XPStartMenuProps> = ({ onClose, onOpenWindow, onShutdown }) => {
  console.log('XPStartMenu rendered');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openTime, setOpenTime] = useState(0);
  
  useEffect(() => {
    const now = Date.now();
    setOpenTime(now);
    setIsMenuOpen(true);
    console.log('Start menu opened, setting isMenuOpen to true at:', now);
  }, []);
  const leftItems = [
    { id: 'about', label: 'About Me', icon: <User className="w-8 h-8 text-blue-600" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-8 h-8 text-amber-600" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-8 h-8 text-green-600" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-8 h-8 text-purple-600" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-8 h-8 text-red-600" /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-8 h-8 text-gray-600" /> },
  ];

  const rightItems = [
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'contact', label: 'Contact Me', icon: <Mail className="w-6 h-6" /> },
  ];

  const socialLinks = [
    { label: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/mRcOol7' },
    { label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/in/nehal-chauhan19' },
    { label: 'Portfolio', icon: <Globe className="w-5 h-5" />, url: 'https://nehalchauhanportfolio.vercel.app' },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={(e) => {
          console.log('Backdrop clicked event triggered');
          console.log('Event target:', e.target);
          console.log('isMenuOpen:', isMenuOpen);
          console.log('openTime:', openTime);
          console.log('Current time:', Date.now());
          console.log('Time since open:', Date.now() - openTime);
          
          // Only close if menu has been open for more than 100ms
          if (isMenuOpen && (Date.now() - openTime) > 100) {
            console.log('Calling onClose() - menu has been open long enough');
            onClose();
          } else {
            console.log('Not closing - menu not fully opened yet or too recent');
          }
        }} 
      />
      <div 
        className="xp-start-menu animate-slide-up z-[70]"
        onClick={(e) => {
          console.log('Start menu clicked, preventing event bubbling');
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          console.log('Start menu mousedown, preventing event bubbling');
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-3 py-2 flex items-center gap-3">
          <img 
            src={passportImage} 
            alt="Nehal Chauhan" 
            className="w-12 h-12 rounded-sm object-cover border-2 border-white/50"
          />
          <span className="text-white font-bold text-lg">Nehal Chauhan</span>
        </div>

        <div className="xp-start-menu-content">
          {/* Left Column */}
          <div className="xp-start-menu-left border-r border-gray-300">
            {leftItems.map((item) => (
              <div
                key={item.id}
                className="xp-menu-item"
                onClick={() => onOpenWindow(item.id)}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="xp-start-menu-right">
            {rightItems.map((item) => (
              <div
                key={item.id}
                className="xp-menu-item"
                onClick={() => onOpenWindow(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}

            <div className="border-t border-blue-300 my-2" />

            <div className="px-3 py-1 text-xs text-gray-600 font-bold">Social Links</div>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="xp-menu-item"
                onClick={onClose}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-3 py-2 flex justify-between items-center">
          <button
            className="flex items-center gap-2 text-white text-sm hover:bg-blue-700/50 px-3 py-1 rounded"
            onClick={onShutdown}
          >
            <Power className="w-4 h-4" />
            <span>Turn Off Computer</span>
          </button>
          <button
            className="flex items-center gap-2 text-white text-sm hover:bg-blue-700/50 px-3 py-1 rounded"
            onClick={onClose}
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default XPStartMenu;
