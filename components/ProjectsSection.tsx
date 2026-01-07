import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github, X } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5 }}
            className="bg-white/50 dark:bg-zinc-800/50 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 group hover:border-black/10 dark:hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/10"
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-40 overflow-hidden relative">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm font-medium border border-white/20">
                    View Details
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-zinc-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">{project.shortDesc}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-zinc-600 dark:text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal Overlay - Rendered inside the window context but effectively behaves like a sub-window */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
                <div>
                     <motion.h2 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-2xl font-bold text-zinc-900 dark:text-white mb-2"
                     >
                        {selectedProject.title}
                     </motion.h2>
                     <div className="flex gap-2">
                        {selectedProject.technologies.map((t) => (
                            <span key={t} className="text-xs text-blue-600 dark:text-blue-300 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">{t}</span>
                        ))}
                     </div>
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                    className="p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-zinc-800 dark:text-white"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-48 object-cover rounded-xl mb-6 shadow-xl border border-black/5 dark:border-white/10" />
                
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">About Project</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">{selectedProject.fullDesc}</p>

                <div className="flex gap-4">
                    <a href={selectedProject.demoUrl}  target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20">
                        <ExternalLink size={18} /> Live Demo
                    </a>
                    <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white py-3 rounded-lg font-medium transition-colors border border-black/5 dark:border-white/10">
                        <Github size={18} /> Source Code
                    </a>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};