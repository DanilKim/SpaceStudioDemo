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
import AssetMenuTabPanel from './AssetMenuTabPanel';

const CategoryboxSX = { width: '100%', heigth: '95%', display: 'flex', justifyContent: 'center' };
const ItemboxSX = { minWidth: '80px', width: '30%', heigth: '95%', display: 'flex', flexDirection: 'column', flexGrow: 1};
const IconbuttonSX = {display: 'flex', flexDirection: 'column'};

const AssetBank = {
    'cars': [],
    'trees' : ['tree', 'tree_mini'],
    'effects' : ['doughnut'],
    'buildings': [],
    'roads': []
};

function IconList(props) {

    var iconList = [];
    { Object.keys(AssetBank).map( (category) => { iconList.push(
        <IconButton value={category} onClick={props.handleClick} sx={IconbuttonSX}>
            <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_' + category + '.png'} variant='rounded'/>
            <Typography>{category}</Typography>
        </IconButton>
        )}
    )}
    
    return iconList;
}


export default function AssetMenu(props) {
    const [value, setValue] = useState('trees');

    const handleClick = (category, e) => {
        setValue(category);
    }

    return (<div style={{disply: 'flex', justifyContent: 'center'}}>
        <CardHeader title="Asset Bank" sx={{ color: '#5f5f5f', textAlign: 'center', mb:-1 }} />
        <Box sx={CategoryboxSX}>
            <Box sx={ItemboxSX}>
                <IconButton onClick={(e) => {handleClick('trees', e)}} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_trees.png'} variant='rounded'/>
                    <Typography>trees</Typography>
                </IconButton>
                <IconButton onClick={(e) => {handleClick('cars', e)}} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_cars.png'} variant='rounded'/>
                    <Typography>cars</Typography>
                </IconButton>
                <IconButton onClick={(e) => {handleClick('effects', e)}} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_effects.png'} variant='rounded'/>
                    <Typography>effects</Typography>
                </IconButton>
                <IconButton onClick={(e) => {handleClick('buildings', e)}} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_buildings.png'} variant='rounded'/>
                    <Typography>buildings</Typography>
                </IconButton>
                <IconButton onClick={(e) => {handleClick('roads', e)}} sx={IconbuttonSX}>
                    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e5e7e9' }} src={'../../icons/asset_roads.png'} variant='rounded'/>
                    <Typography>roads</Typography>
                </IconButton>
            </Box>
            <Box sx={{ minWidth: '150px', width: '60%', heigth: '95%', justifyContent: 'center', flexGrow: 1 }}>
                <TabPanel value={value} index={'trees'} sx={{display:'flex', flexFlow: 'row wrap'}}>
                    <AssetMenuTabPanel name='trees' items={AssetBank.trees}/>
                </TabPanel>
                <TabPanel value={value} index={'cars'} sx={{display:'flex', flexFlow: 'row wrap'}}>
                    <AssetMenuTabPanel name='cars' items={AssetBank.cars}/>
                </TabPanel>
                <TabPanel value={value} index={'effects'} sx={{display:'flex', flexFlow: 'row wrap'}}>
                    <AssetMenuTabPanel name='effects' items={AssetBank.effects}/>
                </TabPanel>
                <TabPanel value={value} index={'buildings'} sx={{display:'flex', flexFlow: 'row wrap'}}>
                    <AssetMenuTabPanel name='buildings' items={AssetBank.buildings}/>
                </TabPanel>
                <TabPanel value={value} index={'roads'} sx={{display:'flex', flexFlow: 'row wrap'}}>
                    <AssetMenuTabPanel name='roads' items={AssetBank.roads}/>
                </TabPanel>
            </Box>
        </Box>
    </div>
    );
}

// Icon Copyright
// <a target="_blank" href="https://icons8.com/icon/15126/car">Car</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/OL4KnqW4o3W0/forest">Forest</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/Qk1uLRAj70EH/rainbow">Rainbow</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/9x4BLGMFfDI9/real-estate">Real Estate</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/19807/road">Road</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>