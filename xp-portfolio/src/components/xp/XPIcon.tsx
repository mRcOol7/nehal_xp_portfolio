import React from 'react';

interface XPIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
}

const XPIcon: React.FC<XPIconProps> = ({ icon, label, onClick, onDoubleClick, className = '' }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClick = () => {
    setIsSelected(true);
    if (onClick) {
      onClick();
    }
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  return (
    <div
      className={`xp-icon ${isSelected ? 'xp-icon-selected' : ''} ${className}`}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <span className="xp-icon-text">{label}</span>
    </div>
  );
};

export default XPIcon;
