
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Initialize fade-in sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Newsletter />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
