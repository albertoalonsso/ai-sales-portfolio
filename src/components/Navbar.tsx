
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Newsletter', href: '#newsletter' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="section-container h-full py-0">
        <nav className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-semibold">
            Alberto<span className="text-navy">.Alonso</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Button 
              variant="accent" 
              size="sm"
              onClick={() => window.location.href = '#contact'}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <ul className="flex flex-col py-4 px-8 gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block py-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <Button 
              variant="accent" 
              className="w-full"
              onClick={() => {
                window.location.href = '#contact';
                toggleMenu();
              }}
            >
              Let's Talk
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
