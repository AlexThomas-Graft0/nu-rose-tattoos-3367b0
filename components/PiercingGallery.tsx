'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  alt_text: string;
  description: string | null;
  created_at: string;
}

const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: 'fallback-1',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Close up of a curated ear piercing with gold jewelry',
    description: 'Custom ear curation featuring solid gold seamless rings and gemstone studs.',
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 'fallback-2',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1590483736622-398541ce1a6a?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Multiple ear piercings including helix and lobe',
    description: 'Double helix and stacked lobe piercings.',
    created_at: '2024-01-02T11:00:00Z',
  },
  {
    id: 'fallback-3',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1606132717807-63bb3705ce95?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Delicate nostril piercing with a silver hoop',
    description: 'Classic nostril hoop in implant-grade titanium.',
    created_at: '2024-01-03T14:30:00Z',
  },
  {
    id: 'fallback-4',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Assortment of premium piercing jewelry',
    description: 'A selection of our premium, skin-safe jewelry options.',
    created_at: '2024-01-04T09:15:00Z',
  },
  {
    id: 'fallback-5',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1584844050720-d12eb049eb92?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Detailed view of a septum piercing',
    description: 'Septum piercing fitted with a seamless circular barbell.',
    created_at: '2024-01-05T16:45:00Z',
  },
  {
    id: 'fallback-6',
    category: 'Piercing',
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?auto=format&fit=crop&w=800&q=80',
    alt_text: 'Minimalist gold jewelry on display',
    description: 'Minimalist solid gold ends perfect for flat and conch piercings.',
    created_at: '2024-01-06T13:20:00Z',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      stiffness: 80,
      damping: 20,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
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

export function PiercingGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPiercingImages() {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('category', 'Piercing')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching piercing images:', error);
          setImages(FALLBACK_IMAGES);
        } else if (data && data.length > 0) {
          setImages(data);
        } else {
          setImages(FALLBACK_IMAGES);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setImages(FALLBACK_IMAGES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPiercingImages();
  }, []);

  return (
    <section id="piercing-gallery" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Header & Info Section */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h2 variants={textVariants} className="font-poppins text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Precision Ear, Nose, and Body Piercings
            </motion.h2>
            <motion.p variants={textVariants} className="text-lg text-gray-600 leading-relaxed mb-8 font-roboto">
              Explore our gallery of recent piercings. At Nu Rose Tattoos, your safety and comfort are our highest priorities. We operate in a spotless, clinical environment, using only single-use, sterilized needles and premium, skin-safe jewelry to ensure the best possible healing process.
            </motion.p>

            <motion.div variants={textVariants} className="space-y-6 mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Types of Piercings We Offer</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center mr-4 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  </span>
                  <div>
                    <strong className="block text-gray-900 font-medium">Ear Piercings</strong>
                    <span className="text-gray-600 text-sm">Lobes, Helix, Tragus, Daith, Rook, Industrial, and Custom Curations.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center mr-4 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  </span>
                  <div>
                    <strong className="block text-gray-900 font-medium">Facial Piercings</strong>
                    <span className="text-gray-600 text-sm">Nostril, Septum, Eyebrow, Lip, and Philtrum.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center mr-4 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  </span>
                  <div>
                    <strong className="block text-gray-900 font-medium">Body Piercings</strong>
                    <span className="text-gray-600 text-sm">Navel, Surface piercings, and Microdermals.</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={textVariants}>
              <a
                href="#contact-and-booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#3B82F6] rounded-md hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] shadow-sm hover:shadow group"
              >
                Request a Piercing Appointment
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Gallery Grid Section */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`bg-gray-100 rounded-2xl ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px]">
                {images.map((img, index) => (
                  <motion.div
                    key={img.id}
                    variants={itemVariants}
                    className={`relative group overflow-hidden rounded-2xl bg-gray-100 ${
                      index === 0 ? 'row-span-2 col-span-2 sm:col-span-1' : 
                      index === 3 ? 'row-span-2 col-span-2 sm:col-span-1' : 
                      'row-span-1 col-span-1'
                    }`}
                  >
                    {/* Using standard img tag with Unsplash/Supabase URLs for simplicity, 
                        assuming next/image config might not cover all domains in a raw component dump */}
                    <img
                      src={img.image_url}
                      alt={img.alt_text}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {img.description && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                          {img.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}