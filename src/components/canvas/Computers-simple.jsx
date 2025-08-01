import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  
  console.log('Computer model loaded:', !!computer.scene);
  console.log('Is mobile:', isMobile);

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
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.55}
        position={isMobile ? [0, -2.5, -2.2] : [0, -2.8, -1.2]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const DynamicControls = () => {
  const controlsRef = useRef();
  
  useFrame(() => {
    if (controlsRef.current) {
      // Get the current azimuth angle (horizontal rotation)
      const azimuth = controlsRef.current.getAzimuthalAngle();
      
      // Calculate if we're at the backward position (around Math.PI radians)
      // Normalize the angle to be between 0 and 2*PI
      const normalizedAngle = ((azimuth % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
      
      // Check if we're in the backward region (between PI/2 and 3*PI/2)
      const isBackward = normalizedAngle > Math.PI/2 && normalizedAngle < 3*Math.PI/2;
      
      // Increase speed when at backward position
      controlsRef.current.autoRotateSpeed = isBackward ? 3 : 1;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      autoRotate={true}
      autoRotateSpeed={1}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={1.0}
      touches={{
        ONE: 2, // ROTATE
        TWO: 2  // ROTATE
      }}
    />
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  console.log('Simple ComputersCanvas loading, isMobile:', isMobile);
  
  return (
    <Canvas
      frameloop='always'
      shadows
      camera={{ position: [18, 2, 4], fov: 28 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
      }}
      style={{ 
        width: '100%',
        height: '100%',
        touchAction: 'none',
        pointerEvents: 'auto'
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <DynamicControls />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
