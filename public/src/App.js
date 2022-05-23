import React from 'react'
import { Box } from '@mui/material';
import MenuScreen from './MenuScreen';
import MyWorld from './PlayWorld';
import { observer } from 'mobx-react';

import {
  useStores,
  City
} from 'space-studio';


function App() {
  const { PlaymodeStore } = useStores();

  return (<>
    {PlaymodeStore.playMode ?
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <MyWorld />
      </Box> :
      <MenuScreen/>
    }
  </>
  );
}

//<City city='gumi' object='도로'/>

export default observer(App);
