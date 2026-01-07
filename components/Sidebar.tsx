import React, { useState } from 'react';
import { motion, Reorder, PanInfo } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { SectionId } from '../types';
import { GripHorizontal, GripVertical } from 'lucide-react';

interface SidebarProps {
  onOpen: (id: SectionId) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpen, constraintsRef }) => {
  const [items, setItems] = React.useState(NAV_ITEMS);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const getButtonStyles = (id: string) => {
    const base = "bg-gradient-to-br transition-all duration-300";
    
    switch (id) {
      case 'home':
        return `${base} from-blue-100/50 to-blue-200/50 dark:from-blue-900/30 dark:to-blue-400/30 text-blue-600 dark:text-blue-100/50 hover:from-blue-500 hover:to-blue-400 hover:text-white dark:hover:from-blue-900 dark:hover:to-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]`; 
      case 'about':
        return `${base} from-amber-100/50 to-amber-200/50 dark:from-amber-400/30 dark:to-amber-900/30 text-amber-700 dark:text-amber-100/50 hover:from-amber-400 hover:to-amber-900 hover:text-white dark:hover:from-amber-400 dark:hover:to-amber-900 hover:shadow-[0_0_20px_rgba(180,83,9,0.6)]`;
      case 'skills':
        return `${base} from-green-100/50 to-green-200/50 dark:from-green-900/30 dark:to-slate-300/30 text-green-700 dark:text-green-100/50 hover:from-green-600 hover:to-slate-400 hover:text-white dark:hover:from-green-900 dark:hover:to-slate-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]`;
      case 'projects':
        return `${base} from-purple-100/50 to-purple-200/50 dark:from-purple-900/30 dark:to-purple-400/30 text-purple-700 dark:text-purple-100/50 hover:from-purple-600 hover:to-purple-400 hover:text-white dark:hover:from-purple-900 dark:hover:to-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]`;
      case 'cv':
        return `${base} from-sky-100/50 to-slate-200/50 dark:from-slate-100/20 dark:to-sky-400/30 text-sky-700 dark:text-sky-100/70 hover:from-sky-500 hover:to-sky-400 hover:text-white dark:hover:from-slate-100 dark:hover:to-sky-400 dark:hover:text-sky-950 hover:shadow-[0_0_20px_rgba(224,242,254,0.6)]`;
      case 'contact':
        return `${base} from-yellow-100/50 to-red-100/50 dark:from-yellow-400/30 dark:to-red-600/30 text-red-600 dark:text-orange-100/50 hover:from-yellow-400 hover:to-red-600 hover:text-white dark:hover:from-yellow-400 dark:hover:to-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]`;
      default:
        return 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/20 hover:text-black dark:hover:text-white text-zinc-600 dark:text-white/40';
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    const y = info.point.y;
    const windowHeight = window.innerHeight;
    const threshold = 100; // px from edge to trigger horizontal mode

    // Check if near top or bottom
    const nearEdge = y < threshold || y > windowHeight - threshold;

    if (nearEdge && !isHorizontal) {
      setIsHorizontal(true);
    } else if (!nearEdge && isHorizontal) {
      setIsHorizontal(false);
    }
  };

  return (
    <motion.div 
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        layout
        className="fixed z-[1000] hidden md:block touch-none"
        style={{ left: 24, top: 'calc(50% - 150px)' }} 
    >
        <motion.div 
            layout 
            className={`
                bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md border border-white/20 dark:border-white/5 p-3 rounded-2xl shadow-2xl flex gap-4 transition-colors duration-300
                ${isHorizontal ? 'flex-row items-center' : 'flex-col'}
            `}
        >
            {/* Drag Handle Indicator */}
            <div className={`flex justify-center text-zinc-500 dark:text-white/20 cursor-move ${isHorizontal ? 'order-last pl-2 border-l border-zinc-500/10 dark:border-white/5' : 'pb-2 border-b border-zinc-500/10 dark:border-white/5'}`}>
                {isHorizontal ? <GripVertical size={20} /> : <GripHorizontal size={20} />}
            </div>

            <Reorder.Group 
                axis={isHorizontal ? "x" : "y"} 
                values={items} 
                onReorder={setItems} 
                className={`flex gap-4 ${isHorizontal ? 'flex-row' : 'flex-col'}`}
            >
                {items.map((item) => (
                    <Reorder.Item key={item.id} value={item} style={{ listStyle: 'none' }}>
                    <motion.button
                        layout
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOpen(item.id)}
                        className={`relative w-14 h-14 flex items-center justify-center rounded-xl backdrop-blur-md group ${getButtonStyles(item.id)}`}
                        onPointerDown={(e) => e.stopPropagation()} 
                    >
                        <item.icon size={26} strokeWidth={1.5} />
                        
                        {/* Tooltip */}
                        <span className={`
                            absolute px-3 py-1.5 bg-zinc-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl z-50
                            ${isHorizontal ? '-top-10 left-1/2 -translate-x-1/2' : 'left-16 top-1/2 -translate-y-1/2 ml-2'}
                        `}>
                        {item.label}
                        </span>
                        
                        {/* Active Indicator Dot */}
                        <div className={`
                            absolute bg-zinc-800 dark:bg-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
                            ${isHorizontal ? '-bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 group-hover:w-8 rounded-t-full' : '-left-1 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-8 rounded-r-full'}
                        `} />
                    </motion.button>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </motion.div>
    </motion.div>
  );
};