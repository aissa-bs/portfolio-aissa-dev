import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { SectionId } from '../types';

interface FloatingWindowProps {
  id: SectionId;
  title: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  onClose: (id: SectionId) => void;
  onFocus: (id: SectionId) => void;
  children: React.ReactNode;
  className?: string;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = ({
  id,
  title,
  isOpen,
  zIndex,
  position,
  onClose,
  onFocus,
  children,
  className = ""
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    onFocus(id);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20, x: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: isMaximized ? 0 : 0, 
        x: isMaximized ? 0 : 0, 
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? "100vw" : "auto",
        height: isMaximized ? "100vh" : "auto",
      }}
      exit={{ scale: 0.8, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{ zIndex, position: isMaximized ? 'fixed' : 'absolute' }}
      className={`fixed ${isMaximized ? 'inset-0' : ''}`}
      onMouseDown={() => onFocus(id)}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false} 
      dragMomentum={false}
    >
      <div className={`
        bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col transition-colors duration-300
        ${isMaximized ? 'w-full h-full rounded-none' : `w-[90vw] md:w-[600px] lg:w-[800px] rounded-xl ${className || 'max-h-[80vh]'}`}
      `}>
        {/* Window Header (Handle) */}
        <div 
          className="h-12 bg-zinc-100/50 dark:bg-white/5 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 select-none transition-colors duration-300"
          onPointerDown={(e) => !isMaximized && dragControls.start(e)}
          style={{ cursor: isMaximized ? 'default' : 'grab' }}
        >
          <div className="flex items-center gap-4">
             <div className="flex gap-2 group">
                <button 
                    onClick={(e) => { e.stopPropagation(); onClose(id); }}
                    className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center shadow-md"
                >
                    <X size={12} className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="w-5 h-5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-md">
                    <Minus size={12} className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                    onClick={toggleMaximize}
                    className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center shadow-md"
                >
                    {isMaximized ? (
                        <Minimize2 size={12} className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <Maximize2 size={12} className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </button>
             </div>
             <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 tracking-wide uppercase shadow-sm transition-colors">{title}</span>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto custom-scrollbar bg-zinc-50/50 dark:bg-black/50 p-6 relative transition-colors duration-300">
             {children}
        </div>
      </div>
    </motion.div>
  );
};