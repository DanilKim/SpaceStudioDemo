import React from 'react';
import {
    Card,
    Button,
    TextField,
    Box,
    FormControlLabel,
    Checkbox
} from '@mui/material';

export default function CreateSidebarOptions(SidebarStore) {
    let optionList = [];

    if (SidebarStore.current === 'building') {
        optionList.push(
            <Card variant='elevation' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
            {
                localStorage.getItem(SidebarStore.item.name) !== null ?
                <PlanPreview buildingName={SidebarStore.item.name} /> :
                <></>
            }
            </Card>
        )
        optionList.push(
            <Button onClick={handleClickIndoor} sx={{ color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center' }}>
                실내 공간 스튜디오
            </Button>
        )
    }

    if (SidebarStore.current === 'asset') {
        if (SidebarStore.item.component === 'Ridable') {
            optionList.push(
                <Box sx={{ width: '90%', display: 'block'}}>
                    <Box sx={{ width: '90%', display: 'flex'}}>
                        <Typography sx={{flexGrow: 3}}> Forward </Typography> 
                        <TextField sx={{flexGrow: 1}} id="ridable-forward-key-input" label="J" variant="J" />
                    </Box>
                    <Box sx={{ width: '90%', display: 'flex'}}>
                        <Typography sx={{flexGrow: 3}}> Backward </Typography> 
                        <TextField sx={{flexGrow: 1}} id="ridable-backward-key-input" label="K" variant="K" />
                    </Box>
                    <Box sx={{ width: '90%', display: 'flex'}}>
                        <Typography sx={{flexGrow: 3}}> Left </Typography> 
                        <TextField sx={{flexGrow: 1}} id="ridable-left-key-input" label="H" variant="H" />
                    </Box>
                    <Box sx={{ width: '90%', display: 'flex'}}>
                        <Typography sx={{flexGrow: 3}}> Right </Typography> 
                        <TextField sx={{flexGrow: 1}} id="ridable-right-key-input" label="L" variant="L" />
                    </Box>
                    <Box sx={{ width: '90%', display: 'flex', mt: 1}}>
                        <Typography sx={{flexGrow: 2}}> Speed </Typography> 
                        <TextField sx={{flexGrow: 2}} id="ridable-speed" label="10" variant="10" />
                    </Box>
                    <Box sx={{ width: '90%', mt: 1}}>
                        <FormControlLabel control={<Checkbox />} label="Enable Riding On" />
                    </Box>
                </Box>

            )
        }

        if (SidebarStore.item.component === 'Sittable') {
            optionList.push(
                <Box sx={{ width: '90%', display: 'block'}}>
                    <Box sx={{ width: '90%', display: 'flex', mt: 1}}>
                        <Typography sx={{flexGrow: 1}}> Reacting Distance </Typography> 
                        <TextField sx={{flexGrow: 1}} id="sittable-reaction-distance" label="1" variant="1" />
                    </Box>
                    <Box sx={{ width: '90%', mt: 1}}>
                        <FormControlLabel control={<Checkbox />} label="Enable Sitting On" />
                    </Box>
                </Box>
            )
        }

        if (SidebarStore.item.component === 'Movable') {
            
        }

        if (SidebarStore.item.component === 'Background') {
            
        }

        if (SidebarStore.item.component === 'Board') {
            
        }
    }
    
};
