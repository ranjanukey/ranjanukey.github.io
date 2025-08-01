import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-4">
          Portfolio Loading Test
        </h1>
        <p className="text-secondary text-xl">
          If you can see this, the app is working!
        </p>
        <div className="mt-8 p-4 bg-tertiary rounded-lg">
          <p className="text-white">
            Testing Tailwind CSS classes
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
