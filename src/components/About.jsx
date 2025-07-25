import React, { useRef, useEffect } from "react";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { services } from "../constants";
import { educations } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

// ServiceCard component remains the same
const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 100, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
  }, index * 0.2);

  return (
    <Tilt className="xs:w-[250px] w-full">
      <div ref={cardRef} className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const educationHeadingRef = useRef(null);

  // Heading Animation
  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  // Paragraph Animation
  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);

  // Education Heading Animation
  useGsap(educationHeadingRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
  });

  return (
    <>
      {/* Introduction Section */}
      <div ref={headingRef}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <p ref={paragraphRef} className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
        I'm a skilled data analyst with experience in Power BI, Tableau, SQL, Excel, and Python. I specialize in 
        creating insightful dashboards and data solutions that help businesses make smarter, data-driven decisions. 
        I'm a quick learner who enjoys working on real-world problems and delivering meaningful, actionable insights! 
      </p>

      {/* Services Section */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-16">
        <div ref={educationHeadingRef}>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </div>
        <div className="mt-8 flex flex-col gap-8">
          {educations.map((education, idx) => {
            const educationCardRef = useRef(null);
            useGsap(educationCardRef, {
              from: { opacity: 0, x: -100 },
              to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            }, idx * 0.3);

            return (
              <div ref={educationCardRef} key={idx} className="p-4 bg-tertiary rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: education.iconBg }}>
                    <img src={education.icon} alt={education.school_name} className="w-2/3 h-2/3 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{education.title}</h3>
                    <p className="text-secondary font-semibold">{education.school_name}</p>
                    <p className="text-xs text-gray-400 mt-1">{education.date}</p>
                  </div>
                </div>
                <ul className="mt-4 list-disc ml-8 space-y-2 text-secondary">
                  {education.points.map((point, i) => (
                    <li key={`education-point-${i}`}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");