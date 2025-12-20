// Configuration file for portfolio content
const config = {
  // Achievements
  achievements: {
    hackathons: 3, // Update this number as you attend more
    roles: [
      { title: "BU Student Representative", icon: "🎓" },
      { title: "Treasurer", organization: "Computing Society", icon: "💰" }
    ]
  },

  // Academic grades (0-100 scale)
  grades: [
    { subject: "Mathematics", grade: 76 },
    { subject: "Programming", grade: 93 },
    { subject: "Data Management", grade: 81 },
    { subject: "Computer Fundamentals", grade: 67 },
    { subject: "Computing and Society", grade: 87 },
    { subject: "Computing in Business", grade: 70 },
    // Add more subjects as needed - 6 per year
  ],

  // Tech stack (moved from HTML for easy updates)
  tech: {
    languages: ["python", "javascript", "C", "html/css", "java", "Lua soon..."],
    aiml: ["tensorflow", "pytorch", "scikit-learn", "llama"],
    tools: ["git", "docker", "azure", "figma", "jira", "jupyter notebook"]
  }
};
