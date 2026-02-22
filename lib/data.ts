import { 
  Home, 
  User, 
  Briefcase, 
  FlaskConical, 
  Mail,
  GraduationCap,
  Calendar,
  ListTodo,
  type LucideIcon 
} from "lucide-react";

/**
 * Navigation item type
 */
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  theme: "home" | "about" | "projects" | "research" | "contact";
  description: string;
}

/**
 * Main navigation items
 */
export const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Nexus",
    href: "/",
    icon: Home,
    theme: "home",
    description: "The beginning",
  },
  {
    id: "about",
    label: "Observer",
    href: "/about",
    icon: User,
    theme: "about",
    description: "Who I am",
  },
  {
    id: "projects",
    label: "Systems",
    href: "/projects",
    icon: Briefcase,
    theme: "projects",
    description: "What I build",
  },
  {
    id: "research",
    label: "Discovery",
    href: "/research",
    icon: FlaskConical,
    theme: "research",
    description: "What I explore",
  },
  {
    id: "contact",
    label: "Transmission",
    href: "/contact",
    icon: Mail,
    theme: "contact",
    description: "Connect",
  },
];

/**
 * Project type
 */
export interface Project {
  id: string;
  title: string;
  shortName: string;
  description: string;
  longDescription: string;
  url: string;
  tags: string[];
  icon: LucideIcon;
  accentColor: string;
  features: string[];
  techStack: string[];
  status: "live" | "beta" | "development";
  image?: string;
}

/**
 * Projects data
 */
export const projects: Project[] = [
  {
    id: "medtracker",
    title: "Med School Tracker",
    shortName: "MedTracker",
    description: "A comprehensive platform for tracking medical school progress, rotations, and clinical experiences.",
    longDescription: "Med School Tracker is a specialized productivity tool designed specifically for medical students. It helps track clinical rotations, patient encounters, procedures, and study progress. The platform provides insightful analytics to help students identify areas for improvement and celebrate milestones throughout their medical education journey.",
    url: "https://medtracker.syncratic.app",
    tags: ["Medical", "Productivity", "Education", "Analytics"],
    icon: GraduationCap,
    accentColor: "#10b981",
    features: [
      "Clinical rotation tracking",
      "Patient encounter logging",
      "Procedure documentation",
      "Study progress analytics",
      "Milestone celebrations",
      "Exportable reports",
    ],
    techStack: ["React", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "live",
  },
  {
    id: "blockout",
    title: "BlockOut",
    shortName: "BlockOut",
    description: "A WinDirStat-styled treemap visualizer combined with a medium-term task planner and daily scheduler.",
    longDescription: "BlockOut brings a unique visual approach to task management by combining the intuitive treemap visualization of WinDirStat with powerful planning capabilities. See your time and tasks as a visual landscape, making it easy to understand your workload at a glance and plan your days, weeks, and months effectively.",
    url: "https://blockout.syncratic.app",
    tags: ["Productivity", "Visualization", "Planning", "Treemap"],
    icon: Calendar,
    accentColor: "#f97316",
    features: [
      "Treemap task visualization",
      "Medium-term planning (weeks/months)",
      "Daily scheduling integration",
      "Time block allocation",
      "Visual workload analysis",
      "Drag-and-drop interface",
    ],
    techStack: ["React", "D3.js", "TypeScript", "Node.js", "Redis"],
    status: "live",
  },
  {
    id: "increment",
    title: "Increment",
    shortName: "Increment",
    description: "A list-based note-taking tool with integrated AI-powered task decomposition and smart suggestions.",
    longDescription: "Increment reimagines note-taking by combining the simplicity of lists with the power of AI. Write down your thoughts, ideas, and tasks naturally, and let the AI help break complex tasks into actionable steps, suggest related ideas, and organize your notes intelligently. It's the thinking companion for the modern knowledge worker.",
    url: "https://increment.syncratic.app",
    tags: ["Note-taking", "AI", "Productivity", "Lists"],
    icon: ListTodo,
    accentColor: "#8b5cf6",
    features: [
      "List-based note organization",
      "AI task decomposition",
      "Smart suggestions",
      "Idea clustering",
      "Natural language input",
      "Cross-device sync",
    ],
    techStack: ["React", "OpenAI API", "TypeScript", "MongoDB", "Next.js"],
    status: "development",
  },
];

/**
 * Research item type
 */
export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  link?: string;
  status: "ongoing" | "completed" | "published";
}

/**
 * Research data
 */
export const researchItems: ResearchItem[] = [
  {
    id: "research-1",
    title: "AI in Medical Diagnostics",
    description: "Exploring the application of machine learning algorithms in early disease detection and diagnostic assistance.",
    category: "Medical AI",
    year: "2024",
    status: "ongoing",
  },
  {
    id: "research-2",
    title: "Cognitive Load in Medical Education",
    description: "Investigating how digital tools impact learning efficiency and cognitive load in medical students.",
    category: "Medical Education",
    year: "2023",
    status: "completed",
  },
];

/**
 * Social links
 */
export const socialLinks = {
  github: "https://github.com/Syncrose1",
  // Add more social links as needed
};
