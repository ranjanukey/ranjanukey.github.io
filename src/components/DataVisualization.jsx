import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DataVisualization = ({ title, data, type = 'bar' }) => {
  const canvasRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data for portfolio metrics
  const portfolioData = {
    skills: [
      { label: 'Python', value: 90, color: '#3776ab' },
      { label: 'SQL', value: 85, color: '#336791' },
      { label: 'Power BI', value: 88, color: '#f2c811' },
      { label: 'Excel', value: 92, color: '#217346' },
      { label: 'Tableau', value: 80, color: '#e97627' },
      { label: 'R', value: 75, color: '#276dc3' },
    ],
    projects: [
      { label: 'Customer Insights', value: 95, color: '#915EFF' },
      { label: 'Sales Analysis', value: 88, color: '#00d4ff' },
      { label: 'Marketing ROI', value: 92, color: '#ff6b6b' },
    ],
    impact: [
      { label: 'Reports Created', value: 25, color: '#4ecdc4' },
      { label: 'Data Points Analyzed', value: 100000, color: '#45b7d1' },
      { label: 'Business Decisions Influenced', value: 15, color: '#96ceb4' },
    ]
  };

  const chartData = data || portfolioData[type] || portfolioData.skills;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate the bars
          let progress = 0;
          const animate = () => {
            progress += 0.02;
            setAnimationProgress(Math.min(progress, 1));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8 }}
      className="bg-tertiary rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-white text-xl font-bold mb-6 text-center">
        {title || 'Technical Skills'}
      </h3>
      
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm">
                {item.label}
              </span>
              <span className="text-secondary text-sm">
                {typeof item.value === 'number' && item.value > 1000 
                  ? `${Math.round(item.value / 1000)}K` 
                  : `${Math.round(item.value * animationProgress)}${item.value <= 100 ? '%' : ''}`
                }
              </span>
            </div>
            
            <div className="relative h-3 bg-black-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                  width: `${(item.value / maxValue) * 100 * animationProgress}%`,
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: isVisible ? `${(item.value / maxValue) * 100}%` : 0 
                }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              
              {/* Glow effect */}
              <div 
                className="absolute top-0 left-0 h-full rounded-full opacity-50"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.color}44, transparent)`,
                  width: `${(item.value / maxValue) * 100 * animationProgress}%`,
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Interactive legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {chartData.map((item, index) => (
          <motion.div
            key={`legend-${index}`}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-black-200 rounded-full px-3 py-1"
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-300">{item.label}</span>
          </motion.div>
        ))}
      </div>
      
      <div ref={canvasRef} className="absolute opacity-0" />
    </motion.div>
  );
};

// Enhanced Skills Component with Data Visualization
export const EnhancedSkills = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const tabs = [
    { id: 'skills', label: 'Technical Skills', icon: '🛠️' },
    { id: 'projects', label: 'Project Impact', icon: '📊' },
    { id: 'impact', label: 'Business Impact', icon: '📈' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-black-200 rounded-full p-1 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#915EFF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Visualization */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DataVisualization 
          title={tabs.find(tab => tab.id === activeTab)?.label}
          type={activeTab}
        />
      </motion.div>
    </div>
  );
};

export default DataVisualization;
