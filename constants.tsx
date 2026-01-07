import { Home, User, Code2, Briefcase, Mail, FileText } from 'lucide-react';
import { NavItem, Project, SkillCategory, EducationItem, ExperienceItem } from './types';
import enthusImg from './Assets/enthus.jpg';
import enthusnotesImg from './Assets/enthusnotes.png';
import pdfImg from './Assets/pdfservice.png';
import sentizerImg from './Assets/sentiment.png';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'cv', label: 'Resume', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Enthus App",
    shortDesc: "An all-in-one mobile app for sports training, nutrition, and physiotherapy with professional coaches. .",
    fullDesc: "A mobile app that connects users with professional coaches to access personalized sport training programs, nutrition plans, and physiotherapy services—all in one platform. Features include video consultations, progress tracking, workout libraries, meal planning, and injury rehabilitation exercises.",
    technologies: ["Flutter", "Dart", "Firebase"],
    imageUrl: enthusImg,
    demoUrl: "https://github.com/aissa-bs/ENTHUS-",
    repoUrl: "https://github.com/aissa-bs/ENTHUS-"
  },
  {
    id: 2,
    title: "eENthus notes",
    shortDesc: "Enthus Notes is a clean and powerful notes app that helps you capture ideas, organize thoughts, and stay productive effortlessly.",
    fullDesc: "Enthus Notes is a modern note-taking app designed to keep your ideas, tasks, and thoughts organized in one simple place. Whether you’re jotting down quick ideas, planning projects, or managing daily notes, Enthus Notes offers a smooth and distraction-free experience.",
    technologies: ["Flutter", "Dart", "Firebase"],
    imageUrl: enthusnotesImg,
    demoUrl: "https://github.com/aissa-bs/ENTHUS-NOTES",
    repoUrl: "https://github.com/aissa-bs/ENTHUS-NOTES"
  },
  {
    id: 3,
    title: "Pdf Service",
    shortDesc: "A smart PDF service website that lets you upload, search, analyze, and summarize PDF documents quickly using AI.",
    fullDesc: "This PDF service website provides a powerful and easy way to work with PDF documents online. Users can upload PDF files, search through their content, extract key information, and generate intelligent summaries with the help of AI.",
    technologies: ["React", "Python", "FastAPI", "Gemini API"],
    imageUrl: pdfImg,
    demoUrl: "https://github.com/aissa-bs/aissa-pdfservice-project",
    repoUrl: "https://github.com/aissa-bs/aissa-pdfservice-project"
  },
  {
    id: 4,
    title: "Sentizer",
    shortDesc: "Sentiment Analysis Desc App with AI.",
    fullDesc: "Sentizer is an AI-powered desktop application designed to perform accurate sentiment analysis on text data. It helps users understand emotions, opinions, and tone by analyzing content such as customer feedback, reviews, messages, and documents.",
    technologies: ["Python", "PyQt6", "QtDesigner", "Mashine Learning & NLP"],
    imageUrl: sentizerImg,
    demoUrl: "https://github.com/aissa-bs/Sentizer",
    repoUrl: "https://github.com/aissa-bs/Sentizer"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'Flutter', level: 90, slug: 'flutter' },
      { name: 'React', level: 95, slug: 'react' },
      { name: 'HTML', level: 98, slug: 'html5' },
      { name: 'CSS', level: 95, slug: 'css' },
      { name: 'TypeScript', level: 90, slug: 'typescript' },
      { name: 'JavaScript', level: 95, slug: 'javascript' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, slug: 'nodedotjs' },
      { name: 'Python', level: 80, slug: 'python' },
      { name: 'PostgreSQL', level: 85, slug: 'postgresql' },
      { name: 'GraphQL', level: 75, slug: 'graphql' },
      { name: 'Firebase', level: 85, slug: 'firebase' },
    ]
  },
  {
    id: 'tools',
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 80, slug: 'docker' },
      { name: 'Jest', level: 75, slug: 'jest' },
      { name: 'Git', level: 95, slug: 'git' },
      { name: 'Terminal', level: 85, slug: 'gnubash' },
      { name: 'Play Console', level: 80, slug: 'googleplay' },
      { name: 'App Store', level: 80, slug: 'apple' },
      { name: 'Stripe', level: 75, slug: 'stripe' },
      { name: 'Linux', level: 70, slug: 'linux' },
    ]
  },
  {
    id: 'design',
    title: 'Graphic Design',
    skills: [
      { name: 'Canva', level: 90, slug: 'canvas' },
      { name: 'Photoshop', level: 85, slug: 'photopea' },
      { name: 'Illustrator', level: 80, slug: 'instapaper' },
    ]
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 1,
    year: "2024",
    degree: "Master's Degree",
    institution: "Hassiba Benbouali University of Chlef",
    details: "Specialization in Advanced Information Systems Engineering. Graduated with Excellent mention."
  },
  {
    id: 2,
    year: "2022",
    degree: "Bachelor's Degree",
    institution: "Hassiba Benbouali University of Chlef",
    details: "Computer Science. Graduated with Good mention."
  },
  {
    id: 3,
    year: "2019",
    degree: "Baccalaureate (2nd)",
    institution: "Free candidat",
    details: "good mention."
  },
  {
    id: 4,
    year: "2018",
    degree: "Baccalaureate (1st)",
    institution: "Ahmed dhiaf High School",
    details: "good mention ."
  }
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    id: 1,
    period: "Present (From 2024)",
    role: "Full Stack Developer",
    company: "Omran Software",
    description: "Developing scalable web / Mobile applications, managing end-to-end development lifecycles, and collaborating with cross-functional teams to deliver high-quality software solutions."
  },
  {
    id: 2,
    period: "2023 - 2024",
    role: "Freelance Web/Mobile Developer and graphic designer ",
    company: "Self-Employed",
    description: "Built custom websites and Mobile apps and e-commerce solutions for  clients ."
  },
  {
    id: 3,
    period: "2022 - 2023",
    role: "Gaming & Tech Services Store Manager ",
    company: "Tech store",
    description: "Oversaw gaming and IT services, handling hardware/software setup, maintenance, and technical support ."
  }
];