// components/Button.tsx
import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  text: string;
  url: string;
  type?: 'button' | 'submit';
  variant?: 'light' | 'dark' | 'pink';
  size?: 'small' | 'default';
}

export const Button = ({ 
  text, 
  url, 
  type = 'button', 
  variant = 'light', 
  size = 'default' 
}: ButtonProps) => {
  // Variant classes
  const variantClasses = {
    'light': 'bg-[#FF90E8] text-black',
    'dark': 'bg-black text-white',
    'pink': 'bg-pink text-black'
  };

  // Size classes
  const sizeClasses = {
    'small': 'h-12 px-3 text-base lg:h-12 lg:px-6 lg:text-base',
    'default': 'h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl'
  };

  // Base button classes
  const buttonClasses = `relative inline-flex rounded no-underline items-center justify-center border border-black transition-all duration-150 group-hover:-translate-x-2 group-hover:-translate-y-2 z-30 w-full lg:w-auto ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <div className="relative inline-block group">
      <div className="absolute inset-0 rounded bg-yellow-400 border border-black transition-transform duration-150 z-20"></div>
      <div className="absolute inset-0 rounded bg-red-600 border border-black transition-transform duration-150 group-hover:translate-x-2 group-hover:translate-y-2 z-10"></div>
      
      {type === 'submit' ? (
        <button type="submit" className={buttonClasses}>
          {text}
        </button>
      ) : (
        <Link href={url} className={buttonClasses}>
          {text}
        </Link>
      )}
    </div>
  );
};