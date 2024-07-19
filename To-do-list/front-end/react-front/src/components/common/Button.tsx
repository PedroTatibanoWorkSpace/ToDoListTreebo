import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'red' | 'gray' | 'green';
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, color = 'green' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  let backgroundColor: string;
  let hoverColor: string;

  switch (color) {
    case 'red':
      backgroundColor = '#680C0C';
      hoverColor = '#8B0000'; 
      break;
    case 'gray':
      backgroundColor = '#302E2E';
      hoverColor = '#484848'; 
      break;
    case 'green':
      backgroundColor = '#90D976';
      hoverColor = '#7CE956'; 
      break;
    default:
      backgroundColor = '#F4C34A'; 
      hoverColor = '#E6B800'; 
      break;
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white font-bold py-2 px-4 rounded shadow-md inline-flex items-center mt-4 ${className}`}
      style={{
        backgroundColor,
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
    >
      {children}
    </button>
  );
};

export default Button;
