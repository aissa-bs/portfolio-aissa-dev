import React, { useState } from 'react';
import { Download, ZoomIn, ZoomOut, FileText } from 'lucide-react';

export const CVSection: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  // Using a sample PDF for demonstration. Replace with your actual CV URL.
  const cvUrl ="./cv.pdf"; 

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 bg-white/50 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 dark:bg-sky-500/20 rounded-lg text-sky-600 dark:text-sky-400">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-white">Curriculum Vitae</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">PDF Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center bg-zinc-200/50 dark:bg-black/30 rounded-lg border border-black/5 dark:border-white/10 p-1 mr-2">
               <button 
                  onClick={handleZoomOut}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors"
                  title="Zoom Out"
               >
                  <ZoomOut size={16} />
               </button>
               <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300 w-12 text-center select-none">
                  {Math.round(zoom * 100)}%
               </span>
               <button 
                  onClick={handleZoomIn}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors"
                  title="Zoom In"
               >
                  <ZoomIn size={16} />
               </button>
           </div>

           <a 
              href={cvUrl} 
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-sky-500/20"
           >
              <Download size={14} /> Download
           </a>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div className="flex-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-black/5 dark:border-white/10 overflow-auto custom-scrollbar relative flex items-center justify-center p-4">
          <div 
             className="shadow-2xl transition-transform duration-200 ease-out origin-top border border-zinc-200 dark:border-transparent rounded-lg"
             style={{ 
                 width: '100%', 
                 height: '100%',
                 minHeight: '500px', 
                 minWidth: '1000px',
                 transform: `scale(${zoom})` 
             }}
          >
             <iframe
                 src={cvUrl}
                 title="CV Preview"
                 className="w-full h-full rounded-lg bg-white"
             />
          </div>
      </div>
    </div>
  );
};