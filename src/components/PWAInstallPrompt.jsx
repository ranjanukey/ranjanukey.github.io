import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '../utils/analytics';

const PWAInstallPrompt = ({ installPrompt, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (installPrompt) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [installPrompt]);

  const handleInstall = async () => {
    if (!installPrompt) return;

    setIsInstalling(true);
    trackEvent('pwa_install_clicked');

    try {
      // Show the install dialog
      installPrompt.prompt();
      
      // Wait for user choice
      const { outcome } = await installPrompt.userChoice;
      
      trackEvent('pwa_install_outcome', { outcome });
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
        // Close the prompt
        handleClose();
      } else {
        console.log('PWA installation dismissed');
        setIsInstalling(false);
      }
    } catch (error) {
      console.error('PWA installation failed:', error);
      trackEvent('pwa_install_error', { error: error.message });
      setIsInstalling(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('pwa_install_dismissed');
    
    // Delay the actual close to allow animation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleRemindLater = () => {
    handleClose();
    trackEvent('pwa_install_remind_later');
    
    // Set a reminder for 24 hours
    localStorage.setItem('pwa_remind_later', Date.now() + 24 * 60 * 60 * 1000);
  };

  // Check if user previously chose "remind later"
  useEffect(() => {
    const remindLater = localStorage.getItem('pwa_remind_later');
    if (remindLater && Date.now() < parseInt(remindLater)) {
      handleClose();
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black pointer-events-auto"
            onClick={handleClose}
          />
          
          {/* Install Prompt Card */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-tertiary rounded-2xl shadow-2xl border border-gray-700 max-w-sm w-full pointer-events-auto overflow-hidden"
          >
            {/* Header with Icon */}
            <div className="bg-gradient-to-r from-[#915EFF] to-[#00d4ff] p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Install Portfolio App
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Get quick access to my portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">Works offline</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">Fast loading</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">Native app experience</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">Always up to date</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isInstalling
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#915EFF] to-[#00d4ff] text-white hover:shadow-lg'
                  }`}
                >
                  {isInstalling ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>Installing...</span>
                    </div>
                  ) : (
                    'Install App'
                  )}
                </motion.button>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRemindLater}
                    className="flex-1 py-2 px-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Remind Later
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 py-2 px-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Not Now
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
