
import React, { useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { Link } from 'react-router-dom';
import BlogPostCard from './newsletter/BlogPostCard';
import Button from './ui/Button';

// Enhanced blog posts with more data
const featuredPosts = [
  {
    id: 1,
    title: "Reinforcement Learning in Financial Markets: Current Applications",
    excerpt: "Exploring how RL is transforming portfolio optimization and trading strategies in today's dynamic markets.",
    content: "Reinforcement Learning has emerged as a powerful technique for optimizing trading strategies in volatile markets. By leveraging historical data and real-time feedback, AI models can adapt to changing market conditions and maximize returns while managing risk exposure.",
    date: "June 15, 2024",
    category: "AI & Finance",
    commentCount: 8,
    shareCount: 23,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  },
  {
    id: 2,
    title: "The Future of 5G and IoT in Industrial Environments",
    excerpt: "How next-generation connectivity is enabling unprecedented automation and data analytics in manufacturing.",
    content: "The convergence of 5G networks and IoT devices is creating new possibilities for industrial automation. With ultra-low latency connections and massive device density support, factories can deploy thousands of sensors to create digital twins and optimize operations in real-time.",
    date: "June 2, 2024",
    category: "Technology",
    commentCount: 5,
    shareCount: 17,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  },
  {
    id: 3,
    title: "NLP Analysis: Extracting Value from Financial Communications",
    excerpt: "Techniques for analyzing earnings calls and financial reports to gain market insights using natural language processing.",
    content: "Natural Language Processing techniques are revolutionizing how investors analyze corporate communications. By applying sentiment analysis and entity recognition to earnings calls and financial reports, analysts can identify subtle signals that might indicate future performance changes.",
    date: "May 23, 2024",
    category: "AI & Finance",
    commentCount: 12,
    shareCount: 31,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  },
  {
    id: 4,
    title: "AI-Powered Sales Forecasting: Beyond Traditional Methods",
    excerpt: "How machine learning models are delivering more accurate sales predictions by incorporating diverse data sources.",
    content: "Traditional sales forecasting methods often fall short in volatile markets. Modern AI approaches can ingest data from CRM systems, market trends, social media sentiment, and even weather patterns to create more robust predictions with quantifiable confidence intervals.",
    date: "May 10, 2024",
    category: "Sales & AI",
    commentCount: 7,
    shareCount: 19,
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      initials: "AA"
    }
  }
];

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
    <section id="home" className="relative w-full min-h-screen overflow-hidden pt-20 pb-0">
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
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        {/* Main heading bordered as in wireframe */}
        <div className="w-full max-w-3xl mx-auto border border-gold/50 py-4 px-6 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            Connecting <span className="text-gradient">Artificial Intelligence</span>, Finance & Sales Strategies
          </h1>
        </div>
        
        {/* Hero Section with Image and Featured Posts side by side */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Profile Image - Takes 4/12 columns in desktop */}
          <div className="lg:col-span-4 flex justify-center mb-6 lg:mb-0">
            <div className="w-full max-w-xs overflow-hidden rounded-lg border border-gold/30 transition-all duration-300 hover:scale-[1.02] hover:border-gold/70">
              <AspectRatio ratio={3/4} className="bg-muted">
                <img 
                  src="/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png" 
                  alt="Alberto Alonso with microphone" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
          
          {/* Featured Posts - Takes 8/12 columns in desktop */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border border-navy/50 p-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">LAST NEWS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredPosts.map((post, index) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="transition-transform duration-300 hover:-translate-y-1">
                  <BlogPostCard post={{...post, index}} index={index} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Specialization Description */}
        <div className="border border-navy/50 p-6 max-w-4xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-body-lg text-muted-foreground">
            Specialized in developing AI solutions for sales optimization and financial markets, 
            with research background in Deep Reinforcement Learning.
          </p>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            variant="accent" 
            size="lg" 
            onClick={() => window.location.href = '#newsletter'}
          >
            Subscribe to Newsletter
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.location.href = '#projects'}
          >
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
