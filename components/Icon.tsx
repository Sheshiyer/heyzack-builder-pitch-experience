
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} className={className} />;
};

export default Icon;
