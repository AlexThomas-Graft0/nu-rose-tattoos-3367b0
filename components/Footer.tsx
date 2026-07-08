'use client';

import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 20,
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

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-200 pt-16 pb-8 font-['Roboto',sans-serif] text-[#111827]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand & Intro */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <a
              href="#hero"
              className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm inline-block w-max"
            >
              Nu Rose Tattoos
            </a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Custom tattoos, precision piercings, and professional laser removal
              in a clean, welcoming environment on the Caerphilly high street.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-['Poppins',sans-serif] font-semibold text-lg tracking-wide">
              Explore
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Tattoo Gallery', href: '#tattoo-gallery' },
                { label: 'Piercing Gallery', href: '#piercing-gallery' },
                { label: 'Tattoo Removal', href: '#tattoo-removal' },
                { label: 'Aftercare Guides', href: '#aftercare-guides' },
                { label: 'About & FAQ', href: '#about-and-faq' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-[#3B82F6] text-sm transition-colors duration-200 w-max focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-['Poppins',sans-serif] font-semibold text-lg tracking-wide">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3 text-sm text-gray-600">
              <p>7 Clive Street<br />Caerphilly, CF83 1GE</p>
              <a
                href="tel:02920850571"
                className="hover:text-[#3B82F6] transition-colors duration-200 w-max focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm"
              >
                02920 850571
              </a>
              <a
                href="mailto:nurosetattoos@gmail.com"
                className="hover:text-[#3B82F6] transition-colors duration-200 w-max focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm"
              >
                nurosetattoos@gmail.com
              </a>
            </address>
            <a
              href="#contact-and-booking"
              className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3B82F6] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] transition-colors shadow-sm w-max"
            >
              Request a Booking
            </a>
          </motion.div>

          {/* Hours */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-['Poppins',sans-serif] font-semibold text-lg tracking-wide">
              Hours
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <li className="flex justify-between max-w-[200px]">
                <span>Monday</span>
                <span>Closed</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Tue &ndash; Sat</span>
                <span>10:30 &ndash; 18:00</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-500">
            &copy; 2024 Nu Rose Tattoos. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/nurosetattoos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#3B82F6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm p-1"
              aria-label="Follow us on Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com/NuRoseTattoos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#3B82F6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-sm p-1"
              aria-label="Follow us on Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}