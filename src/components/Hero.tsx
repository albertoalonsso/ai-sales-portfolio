
import React, { useEffect, useRef } from 'react';
import Button from './ui/Button';
import { ArrowDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const Hero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          ref={backgroundRef}
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        >
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-navy/5 blur-[100px]" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-turquoise/5 blur-[100px]" />
        </div>
      </div>
      
      {/* Content */}
      <div className="section-container relative z-10 mt-10 md:mt-0 flex flex-col items-center justify-center text-center">
        {/* Professional Photo */}
        <Avatar className="w-32 h-32 border-4 border-white mb-6 shadow-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <AvatarImage src="/lovable-uploads/79bd5eb7-9170-4890-b422-c766a6135663.png" alt="Alberto Alonso" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        
        <div className="pill-accent mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Sales AI Engineer
        </div>
        
        {/* Smaller heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 max-w-3xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Connecting <span className="text-gradient">Artificial Intelligence</span>, Finance & Sales Strategies
        </h1>
        
        <p className="text-body-lg max-w-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Specialized in developing AI solutions for sales optimization and financial markets, 
          with research background in Deep Reinforcement Learning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            variant="accent" 
            size="lg" 
            withArrow
            onClick={() => window.location.href = '#newsletter'}
          >
            Subscribe to newsletter
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.location.href = '#projects'}
          >
            Discover my projects
          </Button>
        </div>
        
        {/* Technology Pills*/}
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="pill">Artificial Intelligence</div>
          <div className="pill">Deep Learning</div>
          <div className="pill">Reinforcement Learning</div>
          <div className="pill">Financial Markets</div>
          <div className="pill">NLP</div>
          <div className="pill">5G/IoT</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
