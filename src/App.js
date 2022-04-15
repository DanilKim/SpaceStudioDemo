import React, { useState, useRef } from 'react'
import { Box } from '@mui/material';
import MenuScreen from './MenuScreen';
import MyWorld from './world';
import { observer } from 'mobx-react';
import { useStores } from './stores/Context';

//<FirstPersonControl model={model} sUp={setUserPlaying} controlsRef={controlsRef}/>
//<PointerLockControls ref={controlsRef}/>

function App() {
  const { PlaymodeStore } = useStores();

  return (<>
    {PlaymodeStore.playMode ?
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <MyWorld key='play-mode'/>
      </Box> :
      <MenuScreen/>}
  </>
  );
}

export default observer(App);
