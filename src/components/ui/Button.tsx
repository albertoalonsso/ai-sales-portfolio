
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  ...props
}: ButtonProps) => {
  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-6',
  };

  return (
    <button
      className={cn(
        'btn relative overflow-hidden group',
        `btn-${variant}`,
        sizes[size],
        'transition-all duration-300 ease-out',
        withArrow ? 'pr-12' : '',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {withArrow && (
          <ArrowRight className="absolute right-5 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_forwards]"></span>
    </button>
  );
};

export default Button;
