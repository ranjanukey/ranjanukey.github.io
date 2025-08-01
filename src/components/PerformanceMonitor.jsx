import { useState, useEffect } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    fps: 0,
    memoryUsage: 0,
    networkSpeed: 'unknown'
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Performance monitoring logic
    const measurePerformance = () => {
      // Measure page load time
      const loadTime = performance.timing 
        ? performance.timing.loadEventEnd - performance.timing.navigationStart
        : 0;

      // Measure memory usage (if available)
      const memoryUsage = performance.memory 
        ? Math.round(performance.memory.usedJSHeapSize / 1048576) // Convert to MB
        : 0;

      // Simple FPS counter
      let fps = 0;
      let lastTime = performance.now();
      let frameCount = 0;

      const countFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        if (currentTime >= lastTime + 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;
          
          setMetrics(prev => ({
            ...prev,
            fps,
            loadTime: Math.round(loadTime),
            memoryUsage
          }));
        }
        requestAnimationFrame(countFPS);
      };

      countFPS();

      // Network speed estimation
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const networkSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown';
      
      setMetrics(prev => ({
        ...prev,
        networkSpeed
      }));
    };

    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug=true')) {
      measurePerformance();
    }

    // Toggle visibility with keyboard shortcut
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  // Don't render in production unless debug is enabled
  if (process.env.NODE_ENV === 'production' && !window.location.search.includes('debug=true')) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs hover:bg-black/90 transition-colors"
          title="Show Performance Metrics (Ctrl+Shift+P)"
        >
          📊 Perf
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Performance</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-sm"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Load Time:</span>
          <span className={metrics.loadTime > 3000 ? 'text-red-400' : 'text-green-400'}>
            {metrics.loadTime}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={metrics.memoryUsage > 100 ? 'text-red-400' : 'text-green-400'}>
            {metrics.memoryUsage}MB
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Network:</span>
          <span className="capitalize">{metrics.networkSpeed}</span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
