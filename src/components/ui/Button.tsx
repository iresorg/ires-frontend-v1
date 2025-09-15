'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-4xl font-medium text-white transition-all duration-200 hover:scale-105";
  
  const buttonStyle = {
    background: variant === 'primary' ? 'var(--btn-bg)' : 'transparent',
    color: variant === 'primary' ? 'white' : 'var(--foreground)'
  };

  const hoverStyle = {
    background: variant === 'primary' ? 'var(--btn-bg-reverse)' : 'var(--btn-bg)',
    color: 'white'
  };

  // For secondary variant with gradient border
  if (variant === 'secondary') {
    const secondaryClasses = `${baseClasses} btn-default btn-highlighted ${className}`;
    
    if (href) {
      return (
        <Link href={href} className={secondaryClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button onClick={onClick} className={secondaryClasses}>
        {children}
      </button>
    );
  }

  // Primary variant (original behavior)
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        style={buttonStyle}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, buttonStyle);
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, buttonStyle);
      }}
    >
      {children}
    </button>
  );
}
