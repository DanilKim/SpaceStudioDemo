import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    CardHeader,
    Tabs,
    Tab,
    Typography,
    IconButton,
} from '@mui/material';
import TabPanel from './TabPanelView';

const CategoryboxSX = { width: '100%', heigth: '95%', display: 'flex', justifyContent: 'center' };
const ItemboxSX = { minWidth: '80px', width: '30%', heigth: '95%', display: 'flex', flexDirection: 'column', flexGrow: 1};
const IconbuttonSX = {display: 'flex', flexDirection: 'column'};

export default function AssetMenu(props) {
    const [value, setValue] = useState(0);

    const handleClick = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    }

    return (<div style={{disply: 'flex', justifyContent: 'center'}}>
        <CardHeader title="Asset Bank" sx={{ color: '#5f5f5f', textAlign: 'center', mb:-1 }} />
        <Box sx={CategoryboxSX}>
            <Box sx={ItemboxSX}>
                <IconButton value={'cars'} onClick={handleClick} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_trees.png'} variant='rounded'/>
                    <Typography>trees</Typography>
                </IconButton>
                <IconButton value={'cars'} onClick={handleClick} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_cars.png'} variant='rounded'/>
                    <Typography>cars</Typography>
                </IconButton>
                <IconButton value={'cars'} onClick={handleClick} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_effects.png'} variant='rounded'/>
                    <Typography>effects</Typography>
                </IconButton>
                
            </Box>
            <Box sx={{ minWidth: '150px', width: '60%', heigth: '95%', justifyContent: 'center', flexGrow: 1 }}>
                To be Implemented
            </Box>
        </Box>
    </div>
    );
}

// Icon Copyright
// <a target="_blank" href="https://icons8.com/icon/15126/car">Car</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/OL4KnqW4o3W0/forest">Forest</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/Qk1uLRAj70EH/rainbow">Rainbow</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>