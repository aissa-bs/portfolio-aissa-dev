import { LucideIcon } from 'lucide-react';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact' | 'cv';

export interface WindowState {
  id: SectionId;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; level: number; slug: string }[];
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

export interface EducationItem {
  id: number;
  year: string;
  degree: string;
  institution: string;
  details: string;
}

export interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
}