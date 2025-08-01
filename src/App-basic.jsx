import React from 'react';

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#050816', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Ranjan Ukey Portfolio
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#aaa6c3' }}>
          Portfolio is loading...
        </p>
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: '#151030', 
          borderRadius: '8px' 
        }}>
          <p>If you see this text, React is working correctly!</p>
        </div>
      </div>
    </div>
  );
};

export default App;
