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


import React, { useState } from 'react'
import TabPanel from './components/TabPanelView'
import MenuBtn from './components/MenuBtnView.js'
import SpaceCreate from './components/SpaceCreate.js';
import SpaceModelView from './components/SpaceModelView.js';

export default function MenuScreen(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const enterPlayMode = () => {
        props.sUp(true);
    };
    
    return (
        <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
          <AppBar position='absolute' sx={{ bgcolor: '#fafafa', borderBottom: 1, borderColor: '#eaeaea' }}>
            <Toolbar variant="dense">
              <MenuBtn/>
              <IconButton edge="start" sx={{ mr: 2 }}>
                <Undo sx={{color: '#7c7c7c'}} />
              </IconButton>
              <IconButton edge="start" sx={{ mr: 5 }}>
                <Redo sx={{color: '#7c7c7c'}} />
              </IconButton>
              <Typography variant="h6" sx={{ mr: 10 ,color: '#7c7c7c' }}>
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
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: '4.5vh'}}>
            <TabPanel value={value} index={0}>
              <Typography variant="body1" sx={{ mr: 2, color: '#555555' }}>
                <SpaceModelView model={props.model} setModel={props.setModel}/>
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="body1" sx={{ mr: 2, color: '#555555' }}>
                <SpaceCreate/>
              </Typography>
            </TabPanel>
            <Box direction='row' justifySelf='flex-end' sx={{ width: '15vw', bgcolor: '#e4ddfa', p:3}}>
              <Typography variant="body1" sx={{ mr: 2, color: '#555555' }}>
                Design Assets
              </Typography>
            </Box>
          </Box>
        </Box>
    );
}