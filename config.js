// Configuration file for portfolio content
const config = {
  // Achievements
  achievements: {
    hackathons: 4,
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
    languages: ["python", "javascript", "C", "C#", "html/css"],
    aiml: ["pytorch", "tensorflow", "scikit-learn", "numpy", "pandas"],
    tools: ["git", "azure", "linux", "docker", "figma", "jira", "jupyter", "oracle cloud", "google cloud", "react"]
  },

  // Projects
  projects: [
    {
      id: "rl-game-agent",
      title: "Reinforcement Learning Game Agent",
      description: "Self-taught RL agent that learns to play a game via memory scanning and reward signals. Built with PyTorch, Stable Baselines3, and OpenCV — a self-directed dive into applied reinforcement learning.",
      url: "https://github.com/antendis/ML-Happy-Turret",
      status: "live",
      statusLabel: "personal project",
      type: "ml",
      tags: ["python", "pytorch", "stable-baselines3", "opencv"],
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&q=80",
      openInNewTab: true
    },
    {
      id: "marcus-aurelius-bot",
      title: "Marcus Aurelius Chatbot",
      description: "University SWE assignment. A chatbot that responds as Marcus Aurelius, drawing on Stoic philosophy. Built with a custom response engine in vanilla JS, no external AI APIs.",
      url: "https://github.com/antendis",
      status: "live",
      statusLabel: "university project",
      type: "web app",
      tags: ["javascript", "html/css", "huggingface"],
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1200&q=80",
      openInNewTab: true
    },
    {
      id: "portfolio-site",
      title: "This Portfolio",
      description: "This site. Designed and built from scratch with Tailwind, vanilla JS, and Three.js for the 3D globe. Scroll animations, mobile-responsive, and all content driven from a single config file.",
      url: "/#intro",
      status: "live",
      statusLabel: "personal project",
      type: "portfolio",
      tags: ["tailwind", "three.js", "javascript"],
      image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80",
      openInNewTab: false
    },
  ]
};
