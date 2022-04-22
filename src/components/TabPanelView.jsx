import React from 'react';
import Box from '@mui/material/Box';

export default function TabPanel(props) {
    return (
        <div>
            {props.value === props.index && 
            <Box sx={{ p: 0, m: 0, width: '85vw' }}>
                {props.children}
            </Box>}
        </div> 
    );
}
