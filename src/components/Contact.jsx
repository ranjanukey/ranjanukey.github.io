import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear success message when user starts editing
    if (success) {
      setSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    emailjs
      .send(
        "service_your_service_id", // You'll need to add your EmailJS service ID
        "template_your_template_id", // You'll need to add your EmailJS template ID
        {
          from_name: form.name,
          to_name: "Ranjan Ukey",
          from_email: form.email,
          to_email: "work.ranjanukey@gmail.com",
          message: form.message,
        },
        "your_public_key" // You'll need to add your EmailJS public key
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          setForm({
            name: "",
            email: "",
            message: "",
          });
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
      </div>

      {/* Personal Contact Information - Futuristic 3D Design */}
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className='mb-12 p-8 bg-gradient-to-br from-black-100 via-tertiary to-black-100 rounded-3xl max-w-5xl mx-auto shadow-2xl border border-purple-500/20'
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(40, 40, 60, 0.8) 50%, rgba(20, 20, 20, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header with Holographic Effect */}
        <div className='text-center mb-8 relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-xl'></div>
          <h4 className='text-white text-[28px] font-bold relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Ranjan Ukey
          </h4>
          <p className='text-gray-300 text-[20px] font-medium mt-2 relative z-10'>
            <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
              Data Analyst
            </span>
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full shadow-lg shadow-purple-500/50'></div>
        </div>
        
        {/* Futuristic Contact Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          {/* Email */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className='group relative p-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300'
            style={{
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center gap-4 relative z-10'>
              <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/30'>
                <span className='text-white text-[24px] drop-shadow-lg'>📧</span>
              </div>
              <div>
                <p className='text-blue-300 font-semibold text-[16px] uppercase tracking-wider'>Email</p>
                <a 
                  href="mailto:work.ranjanukey@gmail.com" 
                  className='text-white hover:text-blue-300 transition-colors text-[17px] font-bold tracking-wide'
                >
                  work.ranjanukey@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* LinkedIn */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className='group relative p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300'
            style={{
              boxShadow: '0 8px 32px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center gap-4 relative z-10'>
              <div className='w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300 shadow-lg shadow-blue-600/30'>
                <span className='text-white text-[24px] drop-shadow-lg'>💼</span>
              </div>
              <div>
                <p className='text-blue-300 font-semibold text-[16px] uppercase tracking-wider'>LinkedIn</p>
                <a 
                  href="https://linkedin.com/in/ranjanukey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className='text-white hover:text-blue-300 transition-colors text-[17px] font-bold tracking-wide'
                >
                  linkedin.com/in/ranjanukey
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* GitHub */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className='group relative p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300'
            style={{
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center gap-4 relative z-10'>
              <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/30'>
                <span className='text-white text-[24px] drop-shadow-lg'>🚀</span>
              </div>
              <div>
                <p className='text-purple-300 font-semibold text-[16px] uppercase tracking-wider'>GitHub</p>
                <a 
                  href="https://github.com/ranjanukey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className='text-white hover:text-purple-300 transition-colors text-[17px] font-bold tracking-wide'
                >
                  github.com/ranjanukey
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Location */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className='group relative p-4 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300'
            style={{
              boxShadow: '0 8px 32px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-600/10 to-orange-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='flex items-center gap-4 relative z-10'>
              <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/30'>
                <span className='text-white text-[24px] drop-shadow-lg'>📍</span>
              </div>
              <div>
                <p className='text-orange-300 font-semibold text-[16px] uppercase tracking-wider'>Location</p>
                <p className='text-white text-[17px] font-bold tracking-wide'>India</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Professional Summary with Neon Effect */}
        <div className='mt-8 text-center relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-sm rounded-2xl'></div>
          <div className='relative z-10 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-cyan-500/20'>
            <p className='text-gray-300 text-[16px] leading-relaxed font-medium'>
              Passionate about transforming data into actionable insights. Specialized in 
              <span className='text-cyan-400 font-semibold'> Power BI</span>, 
              <span className='text-blue-400 font-semibold'> SQL</span>, 
              <span className='text-purple-400 font-semibold'> Python</span>, and 
              <span className='text-green-400 font-semibold'> Excel</span>.
              <br />
              <span className='text-pink-400 font-semibold'>Open to new opportunities</span> and collaborations in data analytics and business intelligence.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Contact Section */}
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <h4 className={`${styles.sectionSubText} mb-4`}>Send me a message</h4>
          
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg'
            >
              <p className='text-green-400 font-medium'>✅ Thank you! Your message has been sent successfully. I'll get back to you soon!</p>
            </motion.div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-8 flex flex-col gap-6'
          >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors ${
                errors.name ? 'border-red-500' : 'border-transparent focus:border-[#915EFF]'
              }`}
            />
            {errors.name && (
              <span className='text-red-400 text-sm mt-1'>⚠️ {errors.name}</span>
            )}
          </label>
          
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors ${
                errors.email ? 'border-red-500' : 'border-transparent focus:border-[#915EFF]'
              }`}
            />
            {errors.email && (
              <span className='text-red-400 text-sm mt-1'>⚠️ {errors.email}</span>
            )}
          </label>
          
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to discuss?'
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors resize-none ${
                errors.message ? 'border-red-500' : 'border-transparent focus:border-[#915EFF]'
              }`}
            />
            {errors.message && (
              <span className='text-red-400 text-sm mt-1'>⚠️ {errors.message}</span>
            )}
          </label>

          <motion.button
            type='submit'
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`py-4 px-8 rounded-xl outline-none w-fit font-bold shadow-lg transition-all duration-300 ${
              loading 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#915EFF] to-[#7c3aed] text-white hover:shadow-[#915EFF]/50'
            }`}
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                Sending...
              </span>
            ) : (
              "Send Message 🚀"
            )}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
