import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  isDarkMode?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isDarkMode = true }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500 bg-zinc-800 dark:bg-zinc-950">
      
      {/* Dark Mode: Abstract Digital Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
             backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
             opacity: isDarkMode ? 0.4 : 0,
             filter: 'blur(2px) brightness(0.7)',
             transform: isDarkMode ? 'scale(1)' : 'scale(1.1)'
        }}
      />

      {/* Light Mode: Spinning Earth Video */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-zinc-300"
        style={{
            opacity: isDarkMode ? 0 : 1,
            pointerEvents: 'none'
        }}
      >
         {!isDarkMode && (
             <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
            >
                <source src="https://cdn.pixabay.com/video/2020/07/04/43831-436446864_large.mp4" type="video/mp4" />
            </video>
         )}
      </div>
      
      {/* Mesh Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${isDarkMode ? 'from-zinc-950 via-zinc-950/80' : 'from-zinc-600/50 via-transparent'} to-transparent`} />
      
      {/* Animated Particles/Orbs - Only show in Dark Mode for cleaner Light Mode */}
      <motion.div 
        animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0, 0, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
            x: [0, -70, 0], 
            y: [0, 60, 0],
            opacity: isDarkMode ? [0.2, 0.5, 0.2] : [0, 0, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
      />
      
       {/* Grid Effect */}
       <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transition-colors duration-500`} />
    </div>
  );
};