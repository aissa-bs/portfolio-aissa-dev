import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    emailjs
      .send(
        'service_is2iey5',
        'template_zzis4sb',
        {
          name,
          email,
          message,
        },
        'ovp4ebwUu_x7yijP4'
      )
      .then(() => {
        setFormState('sent');
        setName('');
        setEmail('');
        setMessage('');

        setTimeout(() => setFormState('idle'), 3000);
      })
      .catch(() => {
        setFormState('idle');
        alert('Failed to send message');
      });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full">
      {/* Contact Info */}
      <div className="flex flex-col justify-center space-y-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Let's create something amazing together.
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400">
          Available for freelance opportunities and full-time roles. Drop me a line!
        </p>

        <div className="space-y-4">
          <SocialLink icon={Mail} text="aissabensadia2@gmail.com" href="mailto:aissabensadia@gmail.com" />
          <SocialLink icon={Phone} text="+213 794834084" href="tel:+213794834084" />
          <SocialLink icon={Linkedin} text="linkedin.com/in/aissa-bensadia" href="https://www.linkedin.com/in/aissa-bensadia" />
          <SocialLink icon={Github} text="github.com/aissa-bs" href="https://github.com/aissa-bs" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3"
              placeholder="john@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState !== 'idle'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-60"
          >
            {formState === 'idle' && (
              <>
                <Send size={18} /> Send Message
              </>
            )}
            {formState === 'sending' && <span className="animate-pulse">Sending...</span>}
            {formState === 'sent' && <span className="text-green-300">Message Sent!</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

const SocialLink = ({
  icon: Icon,
  text,
  href,
}: {
  icon: any;
  text: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
  >
    <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-zinc-600 dark:text-zinc-400 transition-colors">
      <Icon size={20} />
    </div>
    <span className="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
      {text}
    </span>
  </a>
);
