'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  alt_text: string;
  description: string | null;
  created_at: string;
}

const FILTERS = [
  'All Styles',
  'Black & Grey',
  'Colour',
  'Fine Line',
  'Traditional',
  'Cover-ups',
];

const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: 'fb-1',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1590246814883-578ae74db6ab?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Delicate fine line floral tattoo on forearm',
    description: 'Fine Line intricate floral design.',
    created_at: '2023-01-01T00:00:00Z',
  },
  {
    id: 'fb-2',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1611501271488-b22896627072?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Bold traditional style tattoo',
    description: 'Classic Traditional piece with bold outlines.',
    created_at: '2023-01-02T00:00:00Z',
  },
  {
    id: 'fb-3',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1562607185-3bc4b016e344?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Detailed black and grey realistic tattoo',
    description: 'Smooth Black & Grey realism.',
    created_at: '2023-01-03T00:00:00Z',
  },
  {
    id: 'fb-4',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Vibrant colour tattoo work in progress',
    description: 'Vibrant Colour custom design.',
    created_at: '2023-01-04T00:00:00Z',
  },
  {
    id: 'fb-5',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1532067784346-62da854b73cb?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Dense dark pattern tattoo suitable for cover up',
    description: 'Heavy saturation, ideal for Cover-ups.',
    created_at: '2023-01-05T00:00:00Z',
  },
  {
    id: 'fb-6',
    category: 'Tattoo',
    image_url: 'https://images.unsplash.com/photo-1568515387349-4972e90e668b?auto=format&fit=crop&q=80&w=800',
    alt_text: 'Large scale black and grey arm sleeve',
    description: 'Extensive Black & Grey sleeve work.',
    created_at: '2023-01-06T00:00:00Z',
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  }
};

export function TattooGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Styles');

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('category', 'Tattoo')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setImages(data);
        } else {
          setImages(FALLBACK_IMAGES);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        setImages(FALLBACK_IMAGES);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredImages = images.filter((img) => {
    if (activeFilter === 'All Styles') return true;
    
    const searchString = `${img.description || ''} ${img.alt_text || ''}`.toLowerCase();
    const filterTerm = activeFilter.toLowerCase();
    
    if (filterTerm === 'colour' || filterTerm === 'color') {
      return searchString.includes('colour') || searchString.includes('color');
    }
    
    return searchString.includes(filterTerm);
  });

  return (
    <section id="tattoo-gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 font-sans">
            View Our Custom Tattoo Portfolio
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Every tattoo tells a story. Browse our recent work to see the level of detail, creativity, and care we put into every piece. From delicate fine line and smooth black & grey to bold traditional and vibrant colour, our artists work closely with you to design a custom tattoo you will be proud to wear for a lifetime.
          </p>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
            Use the filters below to explore
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className={`bg-gray-100 animate-pulse rounded-2xl w-full break-inside-avoid ${i % 2 === 0 ? 'h-96' : 'h-72'}`}
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-medium text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.description || 'Custom Tattoo Design'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredImages.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-lg">No images found for this style yet.</p>
                <button 
                  onClick={() => setActiveFilter('All Styles')}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                >
                  View all styles
                </button>
              </div>
            )}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <a
            href="#contact-and-booking"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
          >
            Request a Tattoo Booking
            <svg 
              className="ml-2 -mr-1 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}