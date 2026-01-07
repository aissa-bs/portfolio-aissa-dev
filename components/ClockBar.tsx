import React, { useState, useEffect } from 'react';

export const ClockBar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format: Mon, Oct 25
  const dateStr = date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  // Format: 10:30 AM
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit' 
  });

  return (
    <div className="flex items-center gap-3 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:border-white/40 dark:hover:border-white/20 hover:scale-105 cursor-default select-none group pointer-events-auto h-full">
      <span className="text-zinc-600 dark:text-zinc-400 text-xs font-medium uppercase tracking-wider hidden sm:block group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
        {dateStr}
      </span>
      <div className="w-px h-3 bg-zinc-400/20 dark:bg-white/10 hidden sm:block group-hover:bg-zinc-400/40 dark:group-hover:bg-white/20 transition-colors" />
      <span className="text-zinc-800 dark:text-white/90 text-sm font-semibold tabular-nums group-hover:text-black dark:group-hover:text-white transition-colors">
        {timeStr}
      </span>
    </div>
  );
};