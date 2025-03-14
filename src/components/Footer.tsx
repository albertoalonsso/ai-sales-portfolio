
import React from 'react';
import { ArrowUp, Mail, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-midnight text-white py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-semibold">
              Alberto<span className="text-turquoise">.Alonso</span>
            </a>
            <p className="text-white/60 mt-2 text-sm max-w-xs">
              Connecting Artificial Intelligence, Finance and Sales Strategies
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a 
                href="mailto:contact@example.com"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <div>
            &copy; {new Date().getFullYear()} Alberto Alonso. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
