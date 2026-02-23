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
 * 
 * FOR FUTURE CODING AGENTS:
 * - hidden: Set to true to hide a page from navigation while keeping it accessible via URL
 * - Useful for pages under construction or temporarily disabled
 * - The page will still exist and be navigable directly, but won't show in menus
 */
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  theme: "home" | "about" | "projects" | "research" | "contact";
  description: string;
  hidden?: boolean; // Set to true to hide from navigation
}

/**
 * Main navigation items
 * 
 * To hide a page: Set hidden: true on the item
 * To show a page: Remove hidden property or set hidden: false
 * 
 * Current visible pages: Home, Me?, Projects, Connect
 * Current hidden pages: Research (hidden until real research content is available)
 */
export const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    theme: "home",
    description: "The beginning",
  },
  {
    id: "about",
    label: "Me?",
    href: "/about",
    icon: User,
    theme: "about",
    description: "Who I am",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: Briefcase,
    theme: "projects",
    description: "What I build",
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    icon: FlaskConical,
    theme: "research",
    description: "What I explore",
    hidden: false,
  },
  {
    id: "contact",
    label: "Connect",
    href: "/contact",
    icon: Mail,
    theme: "contact",
    description: "Get in touch",
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
    description: "A UKMLA-based medical education tracker providing a ticklist version of the UKMLA content map.",
    longDescription: "Med School Tracker is a specialized productivity tool designed specifically for UK medical students preparing for the UK Medical Licensing Assessment. It provides a comprehensive ticklist version of the UKMLA content map, helping students systematically track their knowledge progress, identify learning gaps, and ensure complete coverage of required competencies before examination.",
    url: "https://medtracker.syncratic.app",
    tags: ["Medical", "Productivity", "Education", "Analytics"],
    icon: GraduationCap,
    accentColor: "#10b981",
    features: [
      "UKMLA content map ticklist",
      "Systematic knowledge tracking",
      "Progress analytics by topic",
      "Learning gap identification",
      "Exam preparation focus",
      "Exportable progress reports",
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
  tags?: string[];
}

/**
 * Research data
 * 
 * NOTE: Currently empty as research page is hidden.
 * Add real research items here when available.
 * To show research: 1) Add items here, 2) Set hidden: false in mainNavigation
 */
export const researchItems: ResearchItem[] = [
  {
    id: "drug-repurposing",
    title: "Structure-based Drug Repurposing",
    description: "Undergraduate dissertation literature review exploring computational screening of existing drug compounds against novel protein targets using molecular docking and AI/ML approaches. Completed as part of BSc Pharmaceutical Chemistry at Queen Mary University of London.",
    category: "Computational Chemistry",
    year: "2023",
    status: "completed",
    tags: ["AI/ML", "Molecular Docking", "Drug Discovery", "Computational Chemistry", "Bioinformatics", "Literature Review"],
  },
];

/**
 * Social links
 */
export const socialLinks = {
  github: "https://github.com/Syncrose1",
  // Add more social links as needed
};
