'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 25,
      duration: 0.8,
    },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center bg-[#FFFFFF] text-[#111827] overflow-hidden selection:bg-[#3B82F6] selection:text-white"
    >
      {/* Subtle background pattern/gradient for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />

      <div className="container mx-auto px-6 py-20 md:py-32 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-[#3B82F6] text-sm font-semibold tracking-wide uppercase mb-6 border border-blue-100">
                Caerphilly's Premier Studio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Custom Tattoos & <br className="hidden md:block" />
              <span className="text-[#3B82F6]">Precision Piercings</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-light"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              Welcome to Nu Rose Tattoos. Located on the high street at 7 Clive Street, we are a modern, friendly studio dedicated to custom art, high-quality piercings, and professional tattoo removal.
            </motion.p>

            {/* Services Overview */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Custom Tattoos', desc: 'Tailored designs across all styles' },
                { title: 'Piercings', desc: 'Sterile, safe, and professional' },
                { title: 'Tattoo Removal', desc: 'Safe laser fading and removal' },
              ].map((service, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#3B82F6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 pl-7">{service.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Location & Hours Snapshot */}
            <motion.div variants={itemVariants} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Location</h4>
                  <p className="text-sm text-gray-600">7 Clive Street<br />Caerphilly, CF83 1GE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Hours</h4>
                  <p className="text-sm text-gray-600">Tue – Sat<br />10:30 – 18:00</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-and-booking"
                className="inline-flex justify-center items-center px-8 py-4 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium rounded-xl shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request a Booking
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#tattoo-gallery"
                className="inline-flex justify-center items-center px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                View Tattoo Gallery
              </a>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative lg:h-[700px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/5 group"
          >
            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 rounded-[2rem]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2000&auto=format&fit=crop"
              alt="Professional tattoo artist working in a clean, modern studio environment"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Decorative element over image */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl z-20 border border-white/20 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <p className="text-gray-900 font-medium text-sm md:text-base">
                "We believe getting tattooed or pierced should be a safe, comfortable, and exciting experience."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}