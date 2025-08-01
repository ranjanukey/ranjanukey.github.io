import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  
  // Optimize the model by caching it
  const optimizedModel = useMemo(() => {
    if (computer.scene) {
      // Traverse and optimize materials
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Enable shadow receiving/casting selectively
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Optimize materials
          if (child.material) {
            child.material.needsUpdate = false;
          }
        }
      });
    }
    return computer.scene;
  }, [computer.scene]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={optimizedModel}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);

  useEffect(() => {
    // Temporarily disable performance detection to always show 3D model
    const detectPerformance = () => {
      // Only disable 3D if WebGL is completely unavailable
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      console.log('WebGL available:', !!gl);
      
      if (!gl) {
        console.log('WebGL not available, showing fallback');
        setLowPerformance(true);
        return;
      }
      
      // Force enable 3D model for now
      console.log('Enabling 3D model');
      setLowPerformance(false);
    };

    // Media query for mobile devices
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    detectPerformance();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Render simplified version for low-performance devices
  if (lowPerformance) {
    console.log('Rendering fallback due to low performance');
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-secondary">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-lg flex items-center justify-center">
            <span className="text-white text-4xl">💻</span>
          </div>
          <p className="text-sm">3D model optimized for performance</p>
        </div>
      </div>
    );
  }

  console.log('Rendering 3D Canvas');

  return (
    <Canvas
      frameloop='demand' // Only render when needed
      shadows
      dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Limit pixel ratio for performance
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        alpha: false, // Disable alpha for better performance
        powerPreference: "high-performance"
      }}
      performance={{ min: 0.5 }} // Adaptive performance
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

// Preload the GLTF model for better performance
useGLTF.preload("./desktop_pc/scene.gltf");

export default ComputersCanvas;
