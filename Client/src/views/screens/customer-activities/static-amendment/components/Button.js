import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  variant = 'primary', // 'primary', 'secondary', 'danger'
}) => {
  const baseClasses = `
    px-4 py-2 rounded-md font-medium
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
