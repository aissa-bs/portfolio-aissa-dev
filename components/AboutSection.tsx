import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, BookOpen, UserCheck, ArrowRight, ChevronLeft, GraduationCap, Briefcase } from 'lucide-react';
import { EDUCATION_HISTORY, EXPERIENCE_HISTORY } from '../constants';
import profileImg from '../Assets/Gemini_Generated_Image_cf1bddcf1bddcf1b.png';


type DetailView = 'none' | 'education' | 'experience';

export const AboutSection: React.FC = () => {
  const [detailView, setDetailView] = useState<DetailView>('none');

  return (
    <div className="relative h-full">
      {/* Main Content */}
      <div className="grid md:grid-cols-[250px_1fr] gap-8 h-full">
        <div className="flex flex-col items-center">
          <motion.div 
            className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={profileImg} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="w-full space-y-3">
            <InfoItem 
                icon={UserCheck} 
                label="Role & Experience " 
                value="Full Stack Dev @ Omran Software" 
                onViewMore={() => setDetailView('experience')}
            />
            <InfoItem 
                icon={BookOpen} 
                label="Education" 
                value="Master's in Computer Science" 
                onViewMore={() => setDetailView('education')}
            />
            <InfoItem icon={MapPin} label="Location" value="Chlef, Algeria" />
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Hello, I'm Aissa Bensadia.
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg transition-colors">
              I am a passionate creative developer who bridges the gap between engineering and design. 
              I specialize in building accessible, pixel-perfect, and performant web and Mobile experiences.
            </p>
            <br />
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors">
              With a strong foundation in algorithmic problem solving and a keen eye for aesthetics, 
              I create digital products that not only work seamlessly but also provide an immersive user experience.
              I'm currently obsessed with Mobile Dev ,UI/UX , AI integration, and data science .
            </p>
          </div>
        </div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {detailView !== 'none' && (
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl z-20 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center gap-4 p-6 border-b border-zinc-200 dark:border-white/10">
                    <button 
                        onClick={() => setDetailView('none')}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors group"
                    >
                        <ChevronLeft className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                    </button>
                    <h2 className="text-xl font-bold text-zinc-800 dark:text-white flex items-center gap-2">
                        {detailView === 'education' ? (
                            <>
                                <GraduationCap className="text-blue-500 dark:text-blue-400" /> Education History
                            </>
                        ) : (
                            <>
                                <Briefcase className="text-purple-500 dark:text-purple-400" /> Professional Experience
                            </>
                        )}
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-2xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 dark:before:via-white/10 before:to-transparent">
                        
                        {detailView === 'education' ? (
                            EDUCATION_HISTORY.map((item, index) => (
                                <TimelineItem key={item.id} isEven={index % 2 === 0}>
                                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1 block">{item.year}</span>
                                    <h3 className="text-zinc-800 dark:text-white font-semibold text-lg">{item.degree}</h3>
                                    <div className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2">{item.institution}</div>
                                    <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">{item.details}</p>
                                </TimelineItem>
                            ))
                        ) : (
                            EXPERIENCE_HISTORY.map((item, index) => (
                                <TimelineItem key={item.id} isEven={index % 2 === 0}>
                                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm mb-1 block">{item.period}</span>
                                    <h3 className="text-zinc-800 dark:text-white font-semibold text-lg">{item.role}</h3>
                                    <div className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2">{item.company}</div>
                                    <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                                </TimelineItem>
                            ))
                        )}

                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value, onViewMore }: { icon: any, label: string, value: string, onViewMore?: () => void }) => (
  <div className="flex flex-col p-3 bg-white/50 dark:bg-white/5 rounded-lg w-full border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors group shadow-sm">
    <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-md text-blue-600 dark:text-blue-400">
            <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 uppercase font-semibold">{label}</p>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium truncate" title={value}>{value}</p>
        </div>
    </div>
    {onViewMore && (
        <button 
            onClick={onViewMore}
            className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1 self-end font-medium opacity-80 hover:opacity-100 transition-opacity"
        >
            View Details <ArrowRight size={10} />
        </button>
    )}
  </div>
);

const TimelineItem = ({ children, isEven }: { children: React.ReactNode, isEven: boolean }) => (
    <div className={`relative flex items-center justify-between md:justify-normal group is-active ${!isEven ? 'md:flex-row-reverse' : ''}`}>
        {/* Dot */}
        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-zinc-100 dark:bg-zinc-900 border-2 border-blue-500 rounded-full -translate-x-1.5 md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
        
        {/* Content Box */}
        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] ml-8 md:ml-0 p-4 bg-white/50 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:border-black/10 dark:hover:border-white/10 transition-all hover:-translate-y-1 shadow-lg">
            {children}
        </div>
    </div>
);