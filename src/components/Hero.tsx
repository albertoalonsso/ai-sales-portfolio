
import React, { useEffect, useRef } from 'react';
import Button from './ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Calendar, MessageSquare, Share2 } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';

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
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-6">
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
      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center">
        {/* Hero Media Section - Multiple Photos */}
        <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <AspectRatio ratio={1/1} className="bg-muted">
              <img 
                src="/lovable-uploads/51b8e032-4dd3-4ab5-983b-c77fcd3cce6a.png" 
                alt="Alberto Alonso" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <AspectRatio ratio={1/1} className="bg-muted">
              <img 
                src="/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png" 
                alt="Alberto Alonso with microphone" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
        
        <div className="pill-accent mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Sales AI Engineer
        </div>
        
        {/* Heading */}
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

        {/* Featured Blog Posts */}
        <div className="mt-10 w-full max-w-5xl">
          <FeaturedPosts />
        </div>
      </div>
    </section>
  );
};

// Component for featured posts to keep Hero component cleaner
const FeaturedPosts = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Reinforcement Learning in Financial Markets: Current Applications",
      excerpt: "Exploring how RL is transforming portfolio optimization and trading strategies in today's dynamic markets.",
      date: "June 15, 2024",
      category: "AI & Finance",
      commentCount: 8,
      shareCount: 23
    },
    {
      id: 2,
      title: "The Future of 5G and IoT in Industrial Environments",
      excerpt: "How next-generation connectivity is enabling unprecedented automation and data analytics in manufacturing.",
      date: "June 2, 2024",
      category: "Technology",
      commentCount: 5,
      shareCount: 17
    },
    {
      id: 3,
      title: "NLP Analysis: Extracting Value from Financial Communications",
      excerpt: "Techniques for analyzing earnings calls and financial reports to gain market insights using natural language processing.",
      date: "May 23, 2024",
      category: "AI & Finance",
      commentCount: 12,
      shareCount: 31
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogPosts.map((post) => (
        <div key={post.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <div className="p-5">
            <div className="pill mb-3">{post.category}</div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{post.commentCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  <span>{post.shareCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
