'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How old do I have to be to get a tattoo or piercing?",
    answer: "You must be 18 years or older to get a tattoo, no exceptions. For piercings, age requirements vary depending on the placement, and government-issued photo ID is required. Please contact us for specific piercing age limits."
  },
  {
    question: "How should I prepare for my appointment?",
    answer: "Get a good night's sleep, eat a solid meal before you arrive, and stay hydrated. Wear loose, comfortable clothing that allows easy access to the area getting tattooed or pierced."
  },
  {
    question: "What are your hygiene and safety standards?",
    answer: "We maintain a spotless, clinical environment. We use hospital-grade sterilization techniques, 100% single-use disposable needles, and premium vegan inks. All surfaces are thoroughly sanitized between every single client."
  },
  {
    question: "Do you accept walk-ins?",
    answer: "We highly recommend requesting a booking in advance to secure your spot. However, if we have a cancellation or free time, we are always happy to accommodate walk-ins."
  }
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', bounce: 0, duration: 0.8 }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const accordionVariants: Variants = {
  open: { 
    opacity: 1, 
    height: "auto", 
    marginTop: 16,
    transition: { type: 'spring', bounce: 0, duration: 0.4 } 
  },
  collapsed: { 
    opacity: 0, 
    height: 0, 
    marginTop: 0,
    transition: { type: 'spring', bounce: 0, duration: 0.4 } 
  }
};

const iconVariants: Variants = {
  open: { 
    rotate: 180,
    transition: { type: 'spring', bounce: 0, duration: 0.4 }
  },
  collapsed: { 
    rotate: 0,
    transition: { type: 'spring', bounce: 0, duration: 0.4 }
  }
};

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={fadeUpVariants}
      className="border-b border-gray-200 last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-4 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium tracking-tight text-[#111827] pr-8">
          {faq.question}
        </span>
        <motion.span 
          variants={iconVariants}
          initial="collapsed"
          animate={isOpen ? "open" : "collapsed"}
          className="flex-shrink-0 text-[#3B82F6]"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={accordionVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-gray-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AboutAndFaq() {
  return (
    <section id="about-and-faq" className="relative w-full bg-[#FFFFFF] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          
          {/* Left Column: About */}
          <div className="flex flex-col space-y-8">
            <motion.div variants={fadeUpVariants} className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827]">
                About the Studio & Frequently Asked Questions
              </h2>
              <div className="w-16 h-1 bg-[#3B82F6] rounded-full" />
            </motion.div>
            
            <motion.div variants={fadeUpVariants} className="prose prose-lg text-gray-600">
              <p>
                Nu Rose Tattoos is a clean, comfortable, and safe environment located in the heart of Caerphilly. We actively distance ourselves from the intimidating "biker" tattoo parlor stereotypes of the past.
              </p>
              <p>
                Our studio is an inclusive space where everyone is treated with respect, and where artistic quality and strict hygiene standards are never compromised.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm mt-4">
              <img 
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Clean and professional tattoo studio environment at Nu Rose Tattoos" 
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </motion.div>
          </div>

          {/* Right Column: FAQs */}
          <div className="flex flex-col h-full justify-center">
            <motion.div variants={fadeUpVariants} className="bg-gray-50/50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-tight text-[#111827] mb-8">
                Common Questions
              </h3>
              
              <div className="flex flex-col">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} index={index} />
                ))}
              </div>

              <motion.div 
                variants={fadeUpVariants}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <p className="text-gray-600 mb-6">
                  Have a different question about our services, artists, or availability?
                </p>
                <a 
                  href="#contact-and-booking"
                  className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] active:scale-95"
                >
                  Contact Us
                  <svg 
                    className="ml-2 -mr-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}