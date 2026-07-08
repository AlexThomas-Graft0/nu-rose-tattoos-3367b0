'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30 
    } 
  }
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto', 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30,
      staggerChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    height: 0, 
    transition: { duration: 0.2 } 
  }
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tattoos', href: '#tattoo-gallery' },
    { name: 'Piercings', href: '#piercing-gallery' },
    { name: 'Removal', href: '#tattoo-removal' },
    { name: 'Aftercare', href: '#aftercare-guides' },
    { name: 'Studio & FAQ', href: '#about-and-faq' },
  ];

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero" 
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-sm"
            aria-label="Nu Rose Tattoos Home"
          >
            <span className="font-['Poppins',_sans-serif] font-bold text-xl md:text-2xl text-[#111827] tracking-tight group-hover:text-[#3B82F6] transition-colors">
              Nu Rose
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-['Roboto',_sans-serif] text-sm font-medium text-[#111827]/70 hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact-and-booking"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-['Roboto',_sans-serif] text-sm font-semibold rounded-md shadow-sm transition-all hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6]"
            >
              Request a Booking
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-[#111827] hover:bg-gray-100 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={mobileItemVariants}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 font-['Roboto',_sans-serif] text-base font-medium text-[#111827]/80 hover:text-[#111827] hover:bg-gray-50 rounded-md transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={mobileItemVariants} className="pt-4 pb-2 px-4">
                <a
                  href="#contact-and-booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-['Roboto',_sans-serif] text-base font-semibold rounded-md shadow-sm transition-all"
                >
                  Request a Booking
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}