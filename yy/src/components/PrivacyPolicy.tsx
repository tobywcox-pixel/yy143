import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 bg-studio-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[80vh] bg-studio-white/5 border border-studio-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-studio-white/10 flex justify-between items-center bg-studio-white/[0.02]">
              <div>
                <h2 className="text-2xl font-syne font-bold text-studio-white uppercase tracking-tight">Privacy Policy</h2>
                <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-studio-white/30 mt-1">Last Updated: April 2026</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-studio-white/40 hover:text-red-500 transition-colors cursor-none"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 no-scrollbar">
              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">1. Introduction</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  At our studio, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">2. Information Collection</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as your name, email address, and project details via our contact form.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">3. Use of Information</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to respond to your inquiries. We do not sell or share your personal information with third parties for their marketing purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">4. Data Security</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  We implement reasonable security measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">5. Your Rights</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at hello@yourstudio.com.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-syne font-bold text-studio-white uppercase tracking-widest text-red-500">6. Contact Us</h3>
                <p className="text-sm font-light text-studio-white/60 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at hello@yourstudio.com.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-studio-white/10 bg-studio-white/[0.02] flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-2 bg-red-600 text-white text-[10px] font-syne font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-red-500 transition-colors cursor-none"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
