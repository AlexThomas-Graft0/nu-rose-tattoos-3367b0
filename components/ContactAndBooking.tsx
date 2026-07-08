'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

type ServiceType = 'Tattoo' | 'Piercing' | 'Removal' | 'General';

interface EnquiryFormData {
  client_name: string;
  email: string;
  phone: string;
  service_type: ServiceType;
  description: string;
  reference_image_url: string;
}

export function ContactAndBooking() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    client_name: '',
    email: '',
    phone: '',
    service_type: 'Tattoo',
    description: '',
    reference_image_url: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('enquiries').insert([{
        client_name: formData.client_name,
        email: formData.email,
        phone: formData.phone || null,
        service_type: formData.service_type,
        description: formData.description,
        reference_image_url: formData.reference_image_url || null
      }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact-and-booking" className="relative w-full bg-[#FFFFFF] py-24 lg:py-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-2xl text-center mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] mb-6">
            Ready for Your Next Piece? Request a Booking
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Fill out the enquiry form below to get the process started. Please include as much detail as possible about what you are looking for. Our team reviews all enquiries and will get back to you shortly to discuss availability, pricing, and next steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            {/* Image Feature */}
            <motion.div variants={fadeInUp} className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2000&auto=format&fit=crop" 
                alt="Tattoo artist working in a clean studio environment" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-[#111827] mb-6">Our Details</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#3B82F6]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#111827] mb-1">Address</span>
                    <span className="text-gray-600 leading-relaxed">7 Clive Street<br />Caerphilly, CF83 1GE</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#3B82F6]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#111827] mb-1">Phone</span>
                    <a href="tel:02920850571" className="text-gray-600 hover:text-[#3B82F6] transition-colors">02920 850571</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#3B82F6]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#111827] mb-1">Email</span>
                    <a href="mailto:nurosetattoos@gmail.com" className="text-gray-600 hover:text-[#3B82F6] transition-colors">nurosetattoos@gmail.com</a>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#3B82F6]" />
                Opening Hours
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Monday</span>
                  <span className="font-medium text-gray-400">Closed</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Tuesday</span>
                  <span className="font-medium text-[#111827]">10:30 – 18:00</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Wednesday</span>
                  <span className="font-medium text-[#111827]">10:30 – 18:00</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Thursday</span>
                  <span className="font-medium text-[#111827]">10:30 – 18:00</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Friday</span>
                  <span className="font-medium text-[#111827]">10:30 – 18:00</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-gray-200/50">
                  <span>Saturday</span>
                  <span className="font-medium text-[#111827]">10:30 – 18:00</span>
                </li>
                <li className="flex justify-between items-center py-1">
                  <span>Sunday</span>
                  <span className="font-medium text-gray-400">Closed</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/nurosetattoos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 text-[#111827] hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                >
                  <Instagram className="w-5 h-5 text-[#3B82F6]" />
                  <span className="font-medium text-sm">Instagram</span>
                </a>
                <a 
                  href="https://facebook.com/NuRoseTattoos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 text-[#111827] hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                >
                  <Facebook className="w-5 h-5 text-[#3B82F6]" />
                  <span className="font-medium text-sm">Facebook</span>
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Enquiry Received</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    Thank you for reaching out to Nu Rose Tattoos. We have received your details and will be in touch shortly to discuss your booking.
                  </p>
                  <button 
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        client_name: '', email: '', phone: '', service_type: 'Tattoo', description: '', reference_image_url: ''
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-[#111827] font-medium hover:bg-gray-100 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="client_name" className="block text-sm font-medium text-[#111827]">
                          Full Name <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="text"
                          id="client_name"
                          name="client_name"
                          required
                          value={formData.client_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827]"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#111827]">
                          Email Address <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827]"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-[#111827]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827]"
                          placeholder="07000 000000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="service_type" className="block text-sm font-medium text-[#111827]">
                          Service Required <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                          id="service_type"
                          name="service_type"
                          required
                          value={formData.service_type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827] appearance-none"
                        >
                          <option value="Tattoo">Custom Tattoo</option>
                          <option value="Piercing">Piercing</option>
                          <option value="Removal">Tattoo Removal</option>
                          <option value="General">General Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-sm font-medium text-[#111827]">
                        Description <span className="text-[#DC2626]">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">Please tell us about the placement, size, and style of your requested service.</p>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827] resize-y"
                        placeholder="I'm looking to get a traditional style rose on my left forearm, roughly 10cm by 10cm..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="reference_image_url" className="block text-sm font-medium text-[#111827]">
                        Reference Image Link <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">If you have a reference image hosted online (e.g., Pinterest, Imgur, Google Drive), paste the link here.</p>
                      <input
                        type="url"
                        id="reference_image_url"
                        name="reference_image_url"
                        value={formData.reference_image_url}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all outline-none text-[#111827]"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">
                        There was a problem submitting your enquiry. Please try again or contact us directly via phone or email.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#3B82F6] text-white font-semibold text-lg overflow-hidden transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Booking Enquiry</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting this form, you agree to our studio policies. Must be 18+ for tattoos.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}