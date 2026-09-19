'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    "cursor-pointer rounded-4xl font-medium text-white transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100";
  const defaultPadding = className.includes("px-") ? "" : "px-6";
  const defaultPy = className.includes("py-") ? "" : "py-3";
  const defaultText = className.includes("text-") ? "" : "text-sm";
  
  const buttonStyle = {
    background: variant === 'primary' ? 'var(--btn-bg)' : 'transparent',
    color: variant === 'primary' ? 'white' : 'var(--foreground)'
  };

  const hoverStyle = {
    background: variant === 'primary' ? 'var(--btn-bg-reverse)' : 'var(--btn-bg)',
    color: 'white'
  };

  const mergedClassName = [baseClasses, defaultPadding, defaultPy, defaultText, className]
    .filter(Boolean)
    .join(" ");

  // For secondary variant with gradient border
  if (variant === 'secondary') {
    const secondaryClasses = `${mergedClassName} btn-default btn-highlighted`;
    
    if (href) {
      return (
        <Link
          href={href}
          className={secondaryClasses}
          aria-disabled={disabled || undefined}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {children}
        </Link>
      );
    }

    return (
      <button 
        type={type}
        onClick={disabled ? undefined : onClick} 
        disabled={disabled} 
        className={secondaryClasses}
        style={disabled ? { opacity: 0.5 } : undefined}
      >
        {children}
      </button>
    );
  }

  // Primary variant (original behavior)
  if (href) {
    return (
      <Link
        href={href}
        className={mergedClassName}
        style={disabled ? { ...buttonStyle, opacity: 0.5, cursor: "not-allowed" } : buttonStyle}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        onMouseEnter={(e) => {
          if (!disabled) Object.assign(e.currentTarget.style, hoverStyle);
        }}
        onMouseLeave={(e) => {
          if (!disabled) Object.assign(e.currentTarget.style, buttonStyle);
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={mergedClassName}
      style={disabled ? { ...buttonStyle, opacity: 0.5 } : buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, buttonStyle);
        }
      }}
    >
      {children}
    </button>
  );
}
