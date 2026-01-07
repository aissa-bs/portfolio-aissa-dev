import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Background } from './components/Background';
import { Sidebar } from './components/Sidebar';
import { FloatingWindow } from './components/FloatingWindow';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { CVSection } from './components/CVSection';
import { ClockBar } from './components/ClockBar';
import { SocialBar } from './components/SocialBar';
import { SectionId, WindowState } from './types';
import { NAV_ITEMS } from './constants';
import { Menu, Sun, Moon } from 'lucide-react';
import profileImg from './Assets/Gemini_Generated_Image_cf1bddcf1bddcf1b.png';


const INITIAL_WINDOWS: Record<SectionId, WindowState> = {
  home: { id: 'home', isOpen: false, zIndex: 0, position: { x: 0, y: 0 } },
  about: { id: 'about', isOpen: false, zIndex: 1, position: { x: 100, y: 50 } },
  skills: { id: 'skills', isOpen: false, zIndex: 1, position: { x: 150, y: 80 } },
  projects: { id: 'projects', isOpen: false, zIndex: 1, position: { x: 200, y: 110 } },
  cv: { id: 'cv', isOpen: false, zIndex: 1, position: { x: 225, y: 125 } },
  contact: { id: 'contact', isOpen: false, zIndex: 1, position: { x: 250, y: 140 } },
};

function App() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarConstraintsRef = useRef<HTMLDivElement>(null);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setWindows((prev) => {
        const next = { ...prev };
        (Object.keys(next) as SectionId[]).forEach((key) => {
             if (isMobile) {
                next[key].position = { x: 20, y: 80 };
             }
        });
        return next;
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOpenWindow = (id: SectionId) => {
    if (id === 'home') {
      setWindows((prev) => {
        const newState = { ...prev };
        (Object.keys(newState) as SectionId[]).forEach((k) => {
           newState[k].isOpen = false;
        });
        return newState;
      });
      return;
    }

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        zIndex: maxZIndex + 1,
      },
    }));
    setMaxZIndex((prev) => prev + 1);
    setMobileMenuOpen(false);
  };

  const handleCloseWindow = (id: SectionId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const handleFocusWindow = (id: SectionId) => {
    if (windows[id].zIndex === maxZIndex) return;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1 },
    }));
    setMaxZIndex((prev) => prev + 1);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/30 transition-colors duration-500" ref={containerRef}>
      <Background isDarkMode={isDarkMode} />
      
      {/* Constraints Container */}
      <div ref={sidebarConstraintsRef} className="absolute top-4 left-4 right-4 bottom-4 pointer-events-none z-0 hidden md:block" />

      {/* Theme Toggle Button (Top Right) */}
      <div className="absolute top-6 right-6 z-[2000]">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 text-zinc-800 dark:text-zinc-100 hover:bg-white/30 dark:hover:bg-white/10 transition-all shadow-lg hover:scale-105"
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDarkMode ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragMomentum={false}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center space-y-4 p-10 pointer-events-auto cursor-move bg-white/40 dark:bg-zinc-900/10 backdrop-blur-md rounded-[3rem] border border-white/20 dark:border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/50 dark:hover:bg-zinc-900/20 transition-colors"
         >
             <div className="inline-block p-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-2 shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                 <img 
                    src={profileImg} 
                    alt="Profile" 
                    className="w-full h-full object-cover md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-900 pointer-events-none" 
                 />
             </div>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-white/40 drop-shadow-sm select-none">
                 Aissa Dev.
             </h1>
             <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-light select-none">
                 Full Stack Developer | Creative Coder | Graphic Designer
             </p>
             <div className="flex justify-center gap-4 pt-4 md:hidden">
                 <button 
                    onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true); }}
                    className="px-6 py-2 bg-black/5 dark:bg-white/10 backdrop-blur rounded-full text-sm font-medium border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer text-zinc-800 dark:text-white"
                 >
                     Open Menu
                 </button>
             </div>
         </motion.div>
      </div>

      <Sidebar onOpen={handleOpenWindow} constraintsRef={sidebarConstraintsRef} />
      
      {/* Bottom Right Bar: Socials + Clock */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[2000] flex flex-col-reverse md:flex-row items-end md:items-center gap-3">
        <SocialBar />
        <ClockBar />
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden transition-colors duration-300">
                <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 bg-black/5 dark:bg-white/10 rounded-full text-zinc-900 dark:text-white">
                    <Menu />
                </button>
                {NAV_ITEMS.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => handleOpenWindow(item.id)}
                        className="text-2xl font-semibold text-zinc-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <FloatingWindow
          id="about"
          title="About Me"
          isOpen={windows.about.isOpen}
          zIndex={windows.about.zIndex}
          position={windows.about.position}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
        >
          <AboutSection />
        </FloatingWindow>

        <FloatingWindow
          id="skills"
          title="Technical Skills"
          isOpen={windows.skills.isOpen}
          zIndex={windows.skills.zIndex}
          position={windows.skills.position}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
        >
          <SkillsSection />
        </FloatingWindow>

        <FloatingWindow
          id="projects"
          title="Featured Projects"
          isOpen={windows.projects.isOpen}
          zIndex={windows.projects.zIndex}
          position={windows.projects.position}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
        >
          <ProjectsSection />
        </FloatingWindow>

        <FloatingWindow
          id="cv"
          title="Resume"
          isOpen={windows.cv.isOpen}
          zIndex={windows.cv.zIndex}
          position={windows.cv.position}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
          className="h-[80vh] max-h-[85vh] w-[80vh] max-w-[600vh]"
        >
          <CVSection />
        </FloatingWindow>

        <FloatingWindow
          id="contact"
          title="Contact"
          isOpen={windows.contact.isOpen}
          zIndex={windows.contact.zIndex}
          position={windows.contact.position}
          onClose={handleCloseWindow}
          onFocus={handleFocusWindow}
        >
          <ContactSection />
        </FloatingWindow>
      </AnimatePresence>

    </div>
  );
}

export default App;