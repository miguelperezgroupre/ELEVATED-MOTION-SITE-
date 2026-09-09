import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ImageZoomModalProps {
  imageUrl: string;
  altText: string;
  children?: React.ReactNode;
}

export default function ImageZoomModal({ imageUrl, altText, children }: ImageZoomModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hero Image Container - Clickable */}
      <motion.div
        className="relative cursor-pointer overflow-hidden group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-110"
        />
        {/* Dark gradient overlay (30% opacity) for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 pointer-events-none" />

        {/* Click to Expand Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#c9a24a]/90 text-[#0B0B0B] px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
            Click to Expand
          </div>
        </div>

        {children}
      </motion.div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/95 z-40 backdrop-blur-sm"
            />

            {/* Zoomed Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.320, 1] // cubic-bezier for smooth zoom
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={imageUrl}
                  alt={altText}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 text-white hover:text-[#c9a24a] transition-colors p-2 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close image"
                >
                  <X className="w-8 h-8" strokeWidth={1.5} />
                </motion.button>

                {/* Keyboard hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-[#ffd9a0]/60 text-sm mt-6 font-mono"
                >
                  Press ESC or click outside to close
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyboard handler for ESC */}
      {isOpen && (
        <KeyboardHandler onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

// Separate component to handle keyboard events
function KeyboardHandler({ onClose }: { onClose: () => void }) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return null;
}
