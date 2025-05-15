import React from 'react';
import { getInitialsAvatar } from '../utils/avatar';

interface AvatarProps {
  fullName: string;
  className?: string;
  textSize?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  fullName, 
  className = 'w-10 h-10', 
  textSize = 'text-sm'
}) => {
  const { initials, bgColor } = getInitialsAvatar(fullName);
  
  return (
    <div 
      className={`${className} ${bgColor} rounded-full flex items-center justify-center text-white font-medium ${textSize}`}
      aria-label={`${fullName}'s avatar`}
    >
      {initials}
    </div>
  );
};

export default Avatar; 