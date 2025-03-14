
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
}

const Card = ({ children, className, hoverable = false, glass = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm',
        hoverable && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1',
        glass && 'glass',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={cn('text-xl font-semibold', className)} {...props}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mt-4 flex items-center', className)} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
