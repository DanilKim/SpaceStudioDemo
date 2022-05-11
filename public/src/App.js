import React  from 'react'
import { Box } from '@mui/material';
import MenuScreen from './MenuScreen';
import MyWorld from './PlayWorld';
import { observer } from 'mobx-react';

import {
  useStores
} from 'space-studio';

//<FirstPersonControl model={model} sUp={setUserPlaying} controlsRef={controlsRef}/>
//<PointerLockControls ref={controlsRef}/>

function App() {
  const { PlaymodeStore } = useStores();

  return (<>
    {PlaymodeStore.playMode ?
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <MyWorld />
      </Box> :
      <MenuScreen/>}
  </>
  );
}

export default observer(App);
