import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);
  
  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-black/5 dark:border-white/10 pb-4 overflow-x-auto">
        {SKILL_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
              activeTab === category.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {activeTab === category.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {category.title}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {activeCategory?.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)"
                }}
                className="bg-white/60 dark:bg-zinc-800/40 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group hover:bg-white/80 dark:hover:bg-zinc-800/60 transition-colors relative overflow-hidden shadow-sm"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-black/5 dark:border-white/5 group-hover:border-black/10 dark:group-hover:border-white/20 transition-colors">
                    <img 
                        src={`https://cdn.simpleicons.org/${skill.slug}`} 
                        alt={skill.name}
                        className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                {/* Text Info */}
                <div className="relative z-10 text-center mt-2">
                    <h3 className="text-zinc-700 dark:text-zinc-200 font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition-colors">{skill.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};