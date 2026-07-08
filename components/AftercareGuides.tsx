'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { ArrowRight, Droplets, ShieldCheck } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: 'Tattoo' | 'Piercing' | 'Removal';
  content: string;
  created_at: string;
  updated_at: string;
}

const TATTOO_STEPS = [
  {
    step: 1,
    text: 'Leave your protective wrap on for the time advised by your artist (usually 2 to 4 hours).',
  },
  {
    step: 2,
    text: 'Wash the tattoo gently using clean hands, warm water, and an unscented, antibacterial soap. Pat dry with a clean paper towel.',
  },
  {
    step: 3,
    text: 'Apply a very thin layer of your artist-recommended aftercare balm.',
  },
  {
    step: 4,
    text: 'Keep it clean and do not pick, scratch, or submerge your healing tattoo in baths, pools, or the ocean.',
  },
];

const PIERCING_STEPS = [
  {
    step: 1,
    text: 'Clean your new piercing twice a day using a sterile saline wound wash.',
  },
  {
    step: 2,
    text: 'Do not twist, turn, or play with your jewelry. Moving the jewelry tears the healing tissue.',
  },
  {
    step: 3,
    text: 'Avoid sleeping directly on your new piercing to prevent irritation and shifting angles.',
  },
  {
    step: 4,
    text: 'Keep cosmetics, lotions, and harsh chemicals away from the healing area.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      type: 'spring',
      bounce: 0,
      duration: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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

export function AftercareGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const { data, error } = await supabase
          .from('aftercare_guides')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setGuides(data);
        }
      } catch (error) {
        // Silently fall back to placeholder
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuides();
  }, []);

  const showPlaceholder = isLoading || guides.length === 0;

  return (
    <section
      id="aftercare-guides"
      className="relative py-24 md:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Studio Standards
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 tracking-tight mb-6"
          >
            Aftercare Guides: Healing Made Simple
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 font-roboto leading-relaxed"
          >
            Proper aftercare is the single most important step in making sure
            your new tattoo or piercing looks incredible for years to come. We
            are here for you from consultation to fully healed.
          </motion.p>
        </motion.div>

        {showPlaceholder ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Tattoo Aftercare Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full"
            >
              <div className="h-64 sm:h-72 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598371839696-5e5bb00b059a?auto=format&fit=crop&q=80"
                  alt="Professional tattoo artist working"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-8 text-3xl font-bold font-poppins text-white">
                  Tattoo Aftercare
                </h3>
              </div>
              <div className="p-8 sm:p-10 flex-grow flex flex-col">
                <div className="space-y-8 flex-grow">
                  {TATTOO_STEPS.map((step, idx) => (
                    <div key={idx} className="flex items-start group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-poppins text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        {step.step}
                      </div>
                      <p className="ml-5 text-gray-600 font-roboto leading-relaxed pt-1">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <a
                    href="#about-and-faq"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg font-roboto group"
                  >
                    Read Full Tattoo Guide
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Piercing Aftercare Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full"
            >
              <div className="h-64 sm:h-72 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80"
                  alt="Close up of ear piercings and jewelry"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-8 text-3xl font-bold font-poppins text-white">
                  Piercing Aftercare
                </h3>
              </div>
              <div className="p-8 sm:p-10 flex-grow flex flex-col">
                <div className="space-y-8 flex-grow">
                  {PIERCING_STEPS.map((step, idx) => (
                    <div key={idx} className="flex items-start group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-poppins text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        {step.step}
                      </div>
                      <p className="ml-5 text-gray-600 font-roboto leading-relaxed pt-1">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <a
                    href="#about-and-faq"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200 shadow-sm hover:shadow font-roboto group"
                  >
                    Read Full Piercing Guide
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {guides.map((guide) => (
              <motion.div
                key={guide.id}
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide">
                    <Droplets className="w-4 h-4" />
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
                  {guide.title}
                </h3>
                <div className="text-gray-600 font-roboto leading-relaxed whitespace-pre-wrap flex-grow">
                  {guide.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}