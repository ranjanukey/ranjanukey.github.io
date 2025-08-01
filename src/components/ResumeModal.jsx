import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resumeData = {
    name: "Ranjan Ukey",
    location: "Pune",
    email: "work.ranjanukey@gmail.com",
    portfolio: "Portfolio",
    linkedin: "LinkedIn",
    summary: "Data analyst based in Pune with proven expertise in Power BI, SQL, Excel, and Python. He has delivered real-world projects focused on dashboard development, sales trend analysis, and data transformation—enabling data-driven decision-making for businesses. Currently enrolled in the Data Science program at IIT Guwahati, he is committed to continuously advancing his analytical and technical skills to drive business impact.",
    skills: {
      programming: ["Python", "R", "SQL", "Excel"],
      visualization: ["Tableau", "Power BI", "Excel Charts", "Jupyter Notebook"],
      database: ["MySQL"],
      dataAnalysis: ["Data Cleaning", "Modeling", "Manipulation", "extraction"]
    },
    experience: [
      {
        period: "December 2024 - June 2025",
        company: "ICEICO Technologies, Nagpur",
        position: "Data Analyst",
        responsibilities: [
          "Built Power BI dashboards and Excel reports by querying SQL databases, enabling real-time visibility into key KPIs across sales and marketing.",
          "Cleaned and transformed raw business data using SQL and Excel, eliminating inconsistencies and improving data reliability.",
          "Analyzed campaign and product data to support pricing and marketing decisions, helping refine targeting strategies.",
          "Made reports work better by checking data and finding problems during the move to Power BI, boosting effectiveness.",
          "Created BRD, BRS, and SRS documents after client meetings, ensuring clear technical direction for development teams.",
          "Acted as a bridge between business users and developers, translating client needs into actionable technical requirements."
        ]
      }
    ],
    projects: [
      {
        title: "Marketing Insights Dashboard – Food & Beverage Industry",
        technologies: "Power BI | Excel | SQL | DAX",
        description: "Analyzed survey responses to uncover demographic and behavioral trends, enabling strategic marketing decisions. Delivered actionable insights that guided online ad targeting and influencer collaborations, improving market penetration. Optimized campaign strategies using data-driven recommendations and visual storytelling."
      },
      {
        title: "Business insights - Brick & mortar & e-commerce",
        technologies: "Power BI | SQL | Excel | Dax Studio",
        description: "Created a multi-view Power BI dashboard for 6 departments at AtliQ Hardware, driving data-driven decisions and improving business processes by 10%. Optimized performance by importing over 1 million records, modeling data from MySQL and Excel, and enhancing report efficiency using DAX Studio."
      },
      {
        title: "Customer Insights Dashboard – Mitron Bank (Banking Domain)",
        technologies: "Power BI | Canva",
        description: "Conducted in-depth analysis on a dataset of customers to support the strategic launch of new credit card offerings. Identified key customer segments based on income, spending behavior, and preferences. Delivered insights on customer acquisition cost, risk profiles, and market trends to guide product positioning and marketing strategy."
      },
      {
        title: "Hospitality Revenue Dashboard",
        technologies: "Excel | Power BI | DAX | Power Query",
        description: "Developed a 3-page dashboard for the hospitality sector, driving $1.71 billion in revenue. Mumbai led with $668.8 million, while Delhi generated $294.4 million. Key partnerships, including MakeMyTrip, contributed $340 million."
      }
    ],
    certifications: [
      "Generative AI by Outskill",
      "Excel: Mother of Business Intelligence",
      "Get Job Ready: Power BI Data Analytics for All Levels",
      "SQL Beginner to Advance for Data Professionals",
      "Python For Beginner and Intermediate Learners",
      "C, C++, Python Unisoft",
      "SQL for Data Science – Coursera",
      "AI/ML for Geodata Analysis – ISRO Course",
      "Data Analysis with Python – NPTEL",
      "Data Analysis with Python – Coursera",
      "MATLAB Onramp – MathWorks"
    ],
    education: [
      {
        period: "Jun 2021 - Aug 2025",
        institution: "Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur",
        degree: "Bachelor's in Engineering"
      },
      {
        period: "Nov 2024 - Present",
        institution: "IIT Guwahati - Daksh Gurukul",
        degree: "Credit-Linked Data Science Program"
      }
    ]
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Resume - {resumeData.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-gray-800">
            {/* Header Info */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
              <p className="text-lg text-gray-600">{resumeData.location} | {resumeData.email} | {resumeData.linkedin}</p>
            </div>

            {/* Summary */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Programming</h4>
                  <p className="text-gray-700">{resumeData.skills.programming.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Visualization</h4>
                  <p className="text-gray-700">{resumeData.skills.visualization.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Database</h4>
                  <p className="text-gray-700">{resumeData.skills.database.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Analysis</h4>
                  <p className="text-gray-700">{resumeData.skills.dataAnalysis.join(', ')}</p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{exp.company}</h4>
                      <p className="text-[#915EFF] font-medium">{exp.position}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Projects</h3>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-semibold text-lg mb-1">{project.title}</h4>
                  <p className="text-[#915EFF] font-medium mb-2">{project.technologies}</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Certifications and Awards</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {resumeData.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-[#915EFF] border-b-2 border-[#915EFF] pb-2">Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{edu.institution}</h4>
                      <p className="text-gray-700">{edu.degree}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{edu.period}</span>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
            <a
              href="/Ranjanukey_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#915EFF] text-white px-6 py-2 rounded-md hover:bg-[#7c3aed] transition-colors"
            >
              📄 Download PDF
            </a>
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              🖨️ Print Resume
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;
