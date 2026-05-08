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
    languages: ["python", "javascript", "C", "html/css", "java"],
    aiml: ["tensorflow", "pytorch", "scikit-learn", "llama"],
    tools: ["git", "docker", "azure", "figma", "jira", "jupyter notebook"]
  }
};
