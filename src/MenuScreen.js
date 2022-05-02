import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import {
  Undo,
  Redo,
  PlayArrow,
  Settings,
  ExitToApp,
} from '@mui/icons-material';

import * as PlannerPlugins from './plugins/export';

import React, { useState } from 'react'
import { SizeMe } from 'react-sizeme';
import TabPanel from './components/TabPanelView'
import MenuBtn from './components/MenuBtnView.js'
import IndoorStudio from './react-planner';
import SpaceModelView from './components/SpaceModelView.js';
import OutdoorSidebar from './components/OutdoorSidebar';
import { observer } from 'mobx-react';
import { useStores } from './stores/Context';

import MyCatalog from './catalog/catalog';
import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];


function MenuScreen(props) {
  const { PlaymodeStore } = useStores();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const enterPlayMode = () => {
    PlaymodeStore.enterPm();
      //props.sUp(true);
  };
  
  return (
      <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
        <AppBar sx={{ bgcolor: '#fafafa', borderBottom: 1, borderColor: '#eaeaea' }}>
          <Toolbar variant="dense">
            <MenuBtn/>
            <IconButton edge="start" sx={{ mr: 2 }}>
              <Undo sx={{color: '#7c7c7c'}} />
            </IconButton>
            <IconButton edge="start" sx={{ mr: 5 }}>
              <Redo sx={{color: '#7c7c7c'}} />
            </IconButton>
            <Typography component={'div'} variant="h6" sx={{ mr: 10 ,color: '#7c7c7c' }}>
              Tivine Space Studio
            </Typography>
            <Tabs value={value} onChange={handleChange} sx={{ flexGrow: 1 }} textColor="secondary" indicatorColor="secondary">
              <Tab label="실외 공간 생성" index='0' />
              <Tab label="실내 공간 생성" index='1' />
            </Tabs>
            <IconButton edge="start" sx={{ mr: 3 }} onClick={enterPlayMode}>
              <PlayArrow sx={{color: '#7c7c7c'}}/>
            </IconButton>
            <IconButton edge="start" sx={{ mr: 3 }}>
              <Settings sx={{color: '#7c7c7c'}} />
            </IconButton>
            <IconButton edge="start" sx={{ mr: 1 }}>
              <ExitToApp sx={{color: '#7c7c7c'}} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', pt: '5vh'}}>
          <TabPanel value={value} index={0} width='84vw'>
            <SpaceModelView/>
          </TabPanel>
          <TabPanel value={value} index={1} width='84vw'>
            <SizeMe monitorHeight>
              {({size}) =>
                <IndoorStudio
                  catalog={MyCatalog}
                  width={size.width}
                  height={960}
                  plugins={plugins}
                  toolbarButtons={toolbarButtons}
                  stateExtractor={state => state.get('space-studio')}
                />
              }
            </SizeMe>
          </TabPanel>
          <Box sx={{ minWidth: '200px', width: '15vw'}}>
            <OutdoorSidebar/>
          </Box>
        </Box>
      </Box>
      
  );
}

export default observer(MenuScreen);
