
import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  gearXpert,
  project2,
  project3,
  customerInsights,
  foodbevAnalysis,
  salesAnalysis,
  mysql,
  postgresql,
  aws,
  git,
  mongodb,
  jupyter,
  python,
  excel,
  tableau,
  pbix,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
  iitgLogo,
  rtmnuLogo,
} from '../assets'


// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";


export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Experiences",
  },
  {
    id: "tech",
    title: "Technologies",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Analyst",
    icon: web,
  },
  {
    title: "BI Developer",
    icon: mobile,
  },
  {
    title: "Data Visualization",
    icon: backend,
  },
  {
    title: "SQL & Python Scripting",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "Tableau",
    icon: tableau,
  },
  {
    name: "Power BI",
    icon: pbix,
  },
  {
    name: "Excel",
    icon: excel,
  },
  {
    name: "Jupyter",
    icon: jupyter,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Data Analyst",
    company_name: "ICEICO Technologies",
    icon: tekisky,
    iconBg: "#383E56",
    date: "Dec 2024 - June 2025",
    points: [
      "Analyzed large datasets using SQL and Excel to extract actionable business insights and trends.",
      "Designed and maintained interactive dashboards and reports using Power BI and Tableau for various domains.",
      "Collaborated with stakeholders to gather data requirements and translate them into effective reporting solutions.",
      "Utilized SQL, Python, and Excel for data cleaning, transformation, and advanced analysis.",
    ],
  },
];
const educations = [
  {
    title: "Bachelor’s in Engineering",
    school_name: "Rashtrasant Tukadoji Maharaj Nagpur University",
    icon: rtmnuLogo,
    iconBg: "#1A1A1A",
    date: "June 2021 – July 2025",
    points: [
      "Pursuing engineering with a strong focus on data analysis and visualization.",
      "Completed coursework in Python, R, SQL, and Excel VBA.",
      "Worked on multiple projects involving data cleaning, dashboarding, and business analytics.",
    ],
  },
  {
    title: "Credit-Linked Data Science Program",
    school_name: "IIT Guwahati – Daksh Gurukul",
    icon: iitgLogo,
    iconBg: "#1A1A1A",
    date: "Nov 2024 – Present",
    points: [
      "Enrolled in a Data Science program focused on hands-on projects and real-world analytics problems.",
      "Studying advanced topics in statistics, machine learning, and data visualization.",
      "Enhancing skills in tools like Python, SQL, Power BI, and Tableau.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Huzaif proved me wrong.",
    name: "MD Mustaqeem",
    designation: "Ecommerce",
    company: "QuickMart",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Huzaif does.",
    name: "Abdul Raheman",
    designation: "Ecommerce Business",
    company: "justbuyz",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After Huzaif optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "James Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];

const projects = [
  {
    name: "Customer Insights Dashboard",
    description:
      "The Mitron Bank Dashboard is an analytical project that transforms customer data into strategic insights, guiding the successful launch of a new credit card with targeted features.",
    tags: [
      {
        name: "sql",
        color: "blue-text-gradient",
      },
      {
        name: "powerbi",
        color: "green-text-gradient",
      },
      {
        name: "excel",
        color: "pink-text-gradient",
      },
      {
        name: "dax",
        color: "white-text-gradient",
      },
    ],
    image: customerInsights,
    preview_url: "https://raw.githubusercontent.com/ranjanukey/Customer-Insights-Dashboard/master/Preview/Mitron%20Bank%20final_page-0004.jpg",
    source_code_link: "https://github.com/ranjanukey/Customer-Insights-Dashboard",
  },
  {
    name: "FoodBev Marketing Analysis Project",
    description:
      "This project analyzes consumer purchasing behavior to evaluate marketing campaign performance, delivering actionable recommendations for Beverage Company to enhance customer engagement and boost campaign ROI.",
    tags: [
      {
        name: "sql",
        color: "blue-text-gradient",
      },
      {
        name: "powerbi",
        color: "green-text-gradient",
      },
      {
        name: "tableau",
        color: "pink-text-gradient",
      },
    ],
    image: foodbevAnalysis,
    preview_url: "https://raw.githubusercontent.com/ranjanukey/FoodBev_Marketing_Analysis_Project/master/Preview/Preview_9.jpg",
    source_code_link: "https://github.com/ranjanukey/FoodBev_Marketing_Analysis_Project",
  },
  {
    name: "Sales Performance Analysis",
    description:
      "This project delivers a visual analysis of business KPIs, enabling stakeholders to identify performance gaps and discover growth opportunities through dynamic, interactive dashboards.",
    tags: [
      {
        name: "sql",
        color: "blue-text-gradient",
      },
      {
        name: "powerbi",
        color: "green-text-gradient",
      },
      {
        name: "excel",
        color: "white-text-gradient",
      },
      {
        name: "dax",
        color: "pink-text-gradient",
      },
    ],
    image: salesAnalysis,
    preview_url: "https://raw.githubusercontent.com/ranjanukey/Sales-Performance-Analysis/master/Power%20Bi/Preview%20of%20power%20bi_page-0006.jpg",
    source_code_link: "https://github.com/ranjanukey/Sales-Performance-Analysis",
  },
];

export { services, technologies, experiences, testimonials, projects, educations};
