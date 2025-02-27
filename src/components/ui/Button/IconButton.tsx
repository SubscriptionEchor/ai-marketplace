import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({ icon, label, onClick, className = '' }: IconButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center text-gray-500 hover:text-gray-700 ${className}`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}