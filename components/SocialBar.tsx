import React from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaBehance 
} from 'react-icons/fa';

export const SocialBar: React.FC = () => {
  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaBehance, url: 'https://behance.net', label: 'Behance' },
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <div className="flex items-center gap-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 px-5 py-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:border-white/40 dark:hover:border-white/20 pointer-events-auto">
      {socialLinks.map((item) => (
        <a 
          key={item.label} 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all transform hover:scale-110 hover:-translate-y-1"
          title={item.label}
        >
          <item.icon size={30} />
        </a>
      ))}
    </div>
  );
};

