import React from 'react';
import {
    Box,
    Typography
} from '@mui/material';

export default function PortalPopup(props) {
    return (
        <Box sx={{ width: '25vw', height: '20vh', borderRadius:2, p:2, position: 'absolute', top:'50%', left:'50%', opacity:0.7, bgcolor:'white'}}>
            <Typography variant="h5" component="div" sx={{fontSize: '2rem', fontWeight: '700', color: 'text.primary', m:'2%', textAlign: 'center'}}>
                {props.name} 
            </Typography>
            <Typography sx={{fontSize: '1.5rem', m:'1%', textAlign: 'center'}}>
                실내 공간으로 들어가시겠습니까?
            </Typography>
            <Typography component="div" sx={{fontSize: '1rem', color:"blue", textAlign: 'center'}}>
                Press Enter to get in.
            </Typography>
        </Box>
    )
}