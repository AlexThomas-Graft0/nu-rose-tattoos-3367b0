'use client';

import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface GalleryImage {
  id: string;
  category: 'Tattoo' | 'Piercing' | 'Removal';
  image_url: string;
  alt_text: string;
  description: string | null;
  created_at: string;
}

const steps = [
  {
    title: 'Consultation',
    description: "We assess your tattoo's age, ink colors, and your skin type to create a tailored removal plan.",
    icon: ShieldCheck,
  },
  {
    title: 'The Treatment',
    description: 'We use advanced laser technology to safely break down the ink particles trapped in your skin.',
    icon: Zap,
  },
  {
    title: 'The Healing',
    description: 'Your body’s immune system naturally flushes out the broken-down ink over the weeks following your session. Multiple sessions are required for the best results.',
    icon: Sparkles,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

export function TattooRemoval() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRemovalImages() {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('category', 'Removal')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching removal images:', error);
          return;
        }

        if (data) {
          setImages(data as GalleryImage[]);
        }
      } catch (err) {
        console.error('Unexpected error fetching images:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRemovalImages();
  }, []);

  return (
    <section id="tattoo-removal" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Educational Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-2xl"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide mb-6"
            >
              Professional Service
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
            >
              Safe and Professional Tattoo Removal
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              Whether you want to completely remove an old tattoo or simply fade it down to make room for a beautiful new cover-up, we can help. Tattoo removal is a journey, and our professional laser removal service in Caerphilly is designed to be as safe, effective, and comfortable as possible. We will walk you through the entire process, answer all your questions, and set clear, realistic expectations for your results.
            </motion.p>

            <div className="space-y-8 mb-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={step.title} 
                    variants={itemVariants}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-400">0{index + 1}</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants}>
              <a 
                href="#contact-and-booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#3B82F6] hover:bg-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                Book a Removal Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Visuals / Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[600px] lg:min-h-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100 ring-1 ring-gray-900/5"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                <ImageIcon className="w-12 h-12 mb-4 animate-pulse opacity-50" />
                <span className="text-sm font-medium">Loading gallery...</span>
              </div>
            ) : images.length > 0 ? (
              <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 bg-white">
                {images.map((img, idx) => (
                  <div key={img.id} className={`relative overflow-hidden rounded-xl ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <img
                      src={img.image_url}
                      alt={img.alt_text}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {img.description && (
                        <p className="text-white text-sm font-medium">{img.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Modern clinical laser treatment room"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-8 md:p-12">
                  <div className="max-w-md">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-blue-100 text-sm font-medium uppercase tracking-wider">Clinical Environment</span>
                    </div>
                    <p className="text-white text-lg font-medium leading-snug">
                      We operate in a spotless, highly controlled environment using state-of-the-art laser technology to ensure your safety and the best possible fading results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}