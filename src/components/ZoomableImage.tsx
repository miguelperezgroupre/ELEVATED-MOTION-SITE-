import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({ src, alt, className = '' }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <div 
        className={`image-card cursor-pointer overflow-hidden relative group ${className}`} 
        onClick={toggleZoom}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium">
            Zoom
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleZoom}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing if desired, or let it close
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
