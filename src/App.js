import React, { useState, useRef } from 'react'
import { Box } from '@mui/material';
import MenuScreen from './MenuScreen';
import FirstPersonControl from './FirstPersonControl';
import { Canvas } from "@react-three/fiber";
import MyWorld from './world';

//<FirstPersonControl model={model} sUp={setUserPlaying} controlsRef={controlsRef}/>
//<PointerLockControls ref={controlsRef}/>
function App() {
  const [model, setModel] = useState({ components : [], firstMed : null});
  const [userPlaying, setUserPlaying] = useState(false);

  //const controlsRef = useRef(null);

  return ( <>
    {userPlaying ? 
      <Box sx={{width: '100vw', height: '100vh'}}>
        <Canvas
          style={{ background: "#2f2f2f" }}
          camera={{ position: [0, 1, 10], fov: 50 }}
          id="anim-canvas"
        >
          <FirstPersonControl model={model} sUp={setUserPlaying}/>
          <MyWorld key='play-mode' model={model} setModel={setModel} up={userPlaying}/>
        </Canvas>
      </Box> : 
      <MenuScreen model={model} setModel={setModel} sUp={setUserPlaying}/>}
    </>
  );
}

export default App;
