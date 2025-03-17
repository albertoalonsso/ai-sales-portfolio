
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Section = ({ id, children, className, fullWidth = false, ...props }: SectionProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={cn(
        'py-2', // Reduced spacing
        isVisible ? 'animate-fade-in-up' : 'opacity-0',
        className
      )}
      {...props}
    >
      <div className={fullWidth ? 'w-full' : 'section-container'}>
        {children}
      </div>
    </section>
  );
};

export default Section;
