// Configuration file for portfolio content
const config = {
  // Achievements
  achievements: {
    hackathons: 3, 
    roles: [
      { title: "BU Student Representative", icon: "🎓" },
      { title: "Treasurer", organization: "Computing Society", icon: "💰" }
    ]
  },

  // Academic grades grouped by university year (0-100 scale)
  gradesByYear: {
    "Year 1": [
      { subject: "Mathematics", grade: 76 },
      { subject: "Programming", grade: 93 },
      { subject: "Data Management", grade: 81 },
      { subject: "Computer Fundamentals", grade: 67 },
      { subject: "Computing and Society", grade: 87 },
      { subject: "Computing in Business", grade: 70 }
    ],
    "Year 2": [
      { subject: "Software Engineering", grade: 77 },
      { subject: "System Analysis and Design", grade: 67 },
      { subject: "Machine Learning", grade: 86 }
    ]
  },

  // Tech stack
  tech: {
    languages: ["python", "javascript", "C", "html/css", "java", "Lua soon..."],
    aiml: ["tensorflow", "pytorch", "scikit-learn", "llama"],
    tools: ["git", "docker", "azure", "figma", "jira", "jupyter notebook"]
  },

  // Projects
  projects: [
    {
      id: "portfolio-site",
      title: "This Portfolio",
      description: "The site you are browsing right now—static, performant, and instrumented with location-aware globe viz.",
      url: "/#intro",
      status: "live",
      statusLabel: "live",
      type: "portfolio",
      tags: ["tailwind", "three.js", "design"],
      image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80",
      openInNewTab: false
    },
    {
      id: "ml-pipeline",
      title: "ML Pipeline Sandbox",
      description: "Experimentation space for model training + evaluation; staging for future public demo.",
      url: "https://github.com/antendis",
      status: "in-progress",
      statusLabel: "in progress",
      type: "ml",
      tags: ["python", "pytorch", "experiments"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      openInNewTab: true
    }
  ]
};
