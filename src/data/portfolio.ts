export const personalData = {
  name: "Vudumula Naga Sai Rahul",
  shortName: "Rahul",
  role: "Application Developer & AI/ML Engineer",
  company: "IBM India, Bangalore",
  
  typingRoles: [
    "Java & AEM Developer",
    "LLM Integration Engineer",
    "AI/ML Researcher",
    "Open Source Builder"
  ],
  
  tagline: "Crafting intelligent enterprise systems at the intersection of AEM, Java, and Large Language Models.",
  
  stats: [
    { label: "CGPA", value: "8.98" },
    { label: "IBM Developer", value: "2025" },
    { label: "Best Paper Award", value: "ICOECA 2024" },
    { label: "Certifications", value: "3" }
  ],
  
  about: {
    intro: "I'm an Application Developer at IBM India building AI-powered enterprise platforms. My work sits at the intersection of Adobe Experience Manager (AEM), Java backend systems, and Large Language Model integration.",
    education: "I hold a B.Tech in CSE with AI/ML specialization from VIT-AP University (CGPA: 8.98, Class of 2025), and I'm a certified Adobe AEM Sites Developer and AWS Cloud Practitioner.",
    research: "Beyond my day job, I'm a published AI researcher — my paper on GAN-based deep learning won the Best Paper Award at ICOECA 2024."
  },
  
  counters: [
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Projects Shipped", value: 4, suffix: "" },
    { label: "Published Paper", value: 1, suffix: "" },
    { label: "Certifications", value: 3, suffix: "" }
  ],
  
  contact: {
    email: "nagasairahulvudumula@gmail.com",
    github: "https://github.com/Rahul21sai",
    linkedin: "https://www.linkedin.com/in/naga-sai-rahul-vudumula-93419524b/"
  }
};

export interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  demo?: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AEM Orchestrator",
    category: "Enterprise · AI · Java",
    date: "2025",
    description: "At IBM, built an AI-powered platform that auto-generates Adobe AEM components using LLM APIs. Includes XML watcher service for auto-build triggering. Reduced developer time from 2–3 hours to 30–45 minutes per component (60% reduction).",
    tags: ["Java 8", "OSGi", "AEM", "LLM APIs", "Maven", "REST"],
    badge: "🏢 Enterprise"
  },
  {
    id: 2,
    title: "Offline RAG System",
    category: "Open Source · LLM · Python",
    date: "2024",
    description: "Privacy-first offline document Q&A system — no cloud needed. Supports Llama-2, Mistral, Zephyr, Gemma models via local inference pipeline.",
    tags: ["Python", "LangChain", "LlamaIndex", "Llama-2", "Mistral"],
    github: "https://github.com/Rahul21sai/RAG",
    badge: "⭐ Open Source"
  },
  {
    id: 3,
    title: "GitGuard",
    category: "Security · CLI · DevTool",
    date: "2024",
    description: "Pre-push Git hook that uses regex + Shannon entropy analysis to detect and block hardcoded API keys/secrets before they reach remote repositories. Ships as VS Code extension + CLI.",
    tags: ["Node.js", "Shell Script", "VS Code Extension API"],
    badge: "🔒 Security Tool"
  },
  {
    id: 4,
    title: "GAN Research",
    category: "AI · Published · Award",
    date: "2024",
    description: "Published deep learning research using Generative Adversarial Networks. Presented at ICOECA 2024.",
    tags: ["Python", "TensorFlow", "PyTorch", "GANs"],
    badge: "🏆 Best Paper Award"
  }
];

export interface Experience {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "IBM India",
    role: "Application Developer",
    date: "2025 – Present",
    location: "Bangalore, India",
    description: [
      "Built AI-powered AEM Orchestrator using Java, OSGi, LLM APIs",
      "Developed XML watcher service triggering auto-builds on change",
      "Integrated LLM pipeline for AEM component code generation",
      "Reduced component development time by 60%"
    ],
    tags: ["Java", "AEM", "OSGi", "LangChain", "Maven"]
  },
  {
    id: 2,
    company: "Outlier AI",
    role: "AI Model Contributor",
    date: "2024",
    location: "Remote",
    description: [
      "Evaluated LLM outputs for code quality, factual accuracy, reasoning",
      "Completed 500+ RLHF evaluation tasks"
    ],
    tags: ["Python", "LLM Evaluation", "RLHF"]
  },
  {
    id: 3,
    company: "VIT-AP University",
    role: "Technical Lead — CSI Chapter",
    date: "2023 – 2025",
    location: "Amaravati, India",
    description: [
      "Led Computer Society of India chapter as Technical Lead",
      "Organized developer workshops, hackathons, tech talks"
    ],
    tags: ["Leadership", "Community", "Events"]
  }
];

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  score?: string;
  badge?: string;
  color: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Adobe AEM Sites Developer (ADO-E128)",
    issuer: "Adobe",
    date: "2024",
    score: "90%",
    badge: "🟣",
    color: "violet"
  },
  {
    id: 2,
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    badge: "🟡",
    color: "amber"
  },
  {
    id: 3,
    name: "IBM Generative & Agentic AI Foundation",
    issuer: "IBM",
    date: "2024",
    badge: "🔵",
    color: "cyan"
  }
];

export const publication = {
  title: "GAN-based Deep Learning Research",
  conference: "ICOECA 2024 — International Conference",
  award: "🏆 Best Paper Award",
  description: "Published research on Generative Adversarial Networks for deep learning applications.",
  link: "#" // TODO: Add paper link
};

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Stack",
    skills: [
      { name: "Java" },
      { name: "AEM (Adobe Experience Manager)" },
      { name: "OSGi" },
      { name: "Apache Sling" },
      { name: "JCR" },
      { name: "HTL/Sightly" },
      { name: "Maven" },
      { name: "REST APIs" },
      { name: "CI/CD" },
      { name: "Git" }
    ]
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "LlamaIndex" },
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "RAG Systems" },
      { name: "LLM Integration" },
      { name: "Hugging Face" },
      { name: "GSAP" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    title: "Cloud & Tools",
    skills: [
      { name: "AWS" },
      { name: "Adobe Cloud Manager" },
      { name: "Docker" },
      { name: "Postman" },
      { name: "Workfront" }
    ]
  }
];

// Made with Bob
