// Placeholder resume PDF - Replace this with your actual resume
// For now, we'll create a simple resume component that can display your resume content
export const resumeData = {
  personalInfo: {
    name: "Ranjan Ukey",
    title: "Data Analyst",
    email: "ranjan.ukey@example.com", // Replace with your actual email
    phone: "+91 XXXXX XXXXX", // Replace with your actual phone
    location: "Nagpur, Maharashtra, India"
  },
  summary: "Passionate Data Analyst with expertise in SQL, Python, Power BI, and Tableau. Currently pursuing engineering while gaining practical experience in data visualization and business intelligence.",
  
  education: [
    {
      degree: "Bachelor's in Engineering",
      institution: "Rashtrasant Tukadoji Maharaj Nagpur University",
      year: "June 2021 – August 2025",
      gpa: "N/A",
      details: "Strong focus on data analysis and visualization. Coursework in Python, R, SQL, and Excel VBA"
    },
    {
      degree: "Credit-Linked Data Science Program",
      institution: "IIT Guwahati – Daksh Gurukul",
      year: "Nov 2024 – Present",
      gpa: "N/A", 
      details: "Advanced statistics, machine learning, and data visualization. Tools: Python, SQL, Power BI, and Tableau"
    }
  ],
  
  experience: [
    {
      position: "Data Analyst",
      company: "ICEICO Technologies",
      duration: "Dec 2024 - June 2025",
      responsibilities: [
        "Analyzed large datasets using SQL and Excel to extract actionable business insights",
        "Designed interactive dashboards using Power BI and Tableau",
        "Collaborated with stakeholders for data requirements and reporting solutions",
        "Utilized SQL, Python, and Excel for data cleaning and transformation"
      ]
    }
  ],
  
  skills: {
    programming_languages: ["Python", "SQL", "R", "Excel VBA"],
    database_technologies: ["MySQL", "PostgreSQL", "MongoDB"],
    data_visualization: ["Power BI", "Tableau", "Excel"],
    tools_technologies: ["Git", "Jupyter", "AWS"],
    core_competencies: ["Data Analysis", "Business Intelligence", "Statistical Analysis", "Dashboard Development"]
  },
  
  projects: [
    {
      name: "Customer Insights Dashboard",
      duration: "2024",
      description: "Analytical project transforming customer data into strategic insights for Mitron Bank's credit card launch",
      technologies: ["SQL", "Power BI", "Excel", "DAX"]
    },
    {
      name: "FoodBev Marketing Analysis", 
      duration: "2024",
      description: "Consumer behavior analysis for marketing campaign performance evaluation",
      technologies: ["SQL", "Power BI", "Tableau"]
    },
    {
      name: "Sales Performance Analysis",
      duration: "2024", 
      description: "Visual analysis of business KPIs with interactive dashboards",
      technologies: ["SQL", "Power BI", "Excel", "DAX"]
    }
  ]
};
