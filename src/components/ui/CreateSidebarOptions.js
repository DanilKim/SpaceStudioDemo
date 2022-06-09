import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import {
    Card,
    Button,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    Checkbox,
    Input,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import PlanPreview from '../planPreview';

const inputProps = {width: '12%', style: {fontSize: 15, textAlign: 'right', bgcolor: 'white'}}
const inputSx = {width: '12%', fontSize: 15, textAlign: 'center', bgcolor: 'white'};

function CreateSidebarOptions() {
    const { SidebarStore, ModeStore } = useStores();
    
    const [ridable, setRidable] = useState(false);
    const [sittable, setSittable] = useState(false);
    const [flyableFunc, setFlyFunc] = useState('');

    let optionList = [];

    if (SidebarStore.current === 'building') {
        const handleClickIndoor = () => {
            ModeStore.setIndoorValue();
        };

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
                    <Box sx={{  mt:-1, mb: 2 }}>
                        <FormControlLabel control={<Checkbox onChange={(event) => {setRidable(event.target.checked)}}/>} label="Enable Riding On" />
                    </Box>
                    {ridable && <>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Forward </Typography> 
                            <Input id='ridable-forward-key' disableUnderline={true} placeholder="J" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Backward </Typography> 
                            <Input id='ridable-backward-key' disableUnderline={true} placeholder="K" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Left </Typography> 
                            <Input id='ridable-left-key' disableUnderline={true} placeholder="H" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Right </Typography> 
                            <Input id='ridable-right-key' disableUnderline={true} placeholder="L" sx={inputSx}/>
                        </Box>
                        
                        <Box sx={{ display: 'flex', mt: 1, mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Entering Distance </Typography> 
                            <Input id='ridable-reacting-distance' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box> 
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Speed </Typography> 
                            <Input id='ridable-speed' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box> </>
                    }
                </Box>

            )
        }

        if (SidebarStore.item.component === 'Sittable') {
            optionList.push(
                <Box sx={{ width: '90%', display: 'block'}}>
                    <Box sx={{ mt: 1}}>
                        <FormControlLabel control={<Checkbox onChange={(event) => {setSittable(event.target.checked)}}/>} label="Enable Sitting On" />
                    </Box>
                    {sittable &&
                        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Entering Distance </Typography> 
                            <Input id='sittable-reacting-distance' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box>
                    }
                </Box>
            )
        }

        if (SidebarStore.item.component === 'Flyable') {
            const functions = ['Enable Riding', 'Fixed Animation', 'Not Moving'];
            const funcChange = (event) => {
                setFlyFunc(event.target.value);
            }

            optionList.push(
                <Box sx={{ width: '90%', display: 'block'}}>

                    <Box sx={{ mt: 1}}>
                        <FormControl sx={{ mt:-1, mb: 2, width: 200, flexGrow: 1 }}>
                            <InputLabel htmlFor="function-select">Choose Function</InputLabel>
                            <Select 
                            defaultValue="" 
                            id="function-select" 
                            label="Function"
                            value={flyableFunc}
                            onChange={funcChange}
                            >
                            {functions.map((a, index) => (<MenuItem key={index} value={a}>{a}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Box>
                    {flyableFunc === 'Enable Riding' && <>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Forward </Typography> 
                            <Input id='ridable-forward-key' disableUnderline={true} placeholder="J" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Backward </Typography> 
                            <Input id='ridable-backward-key' disableUnderline={true} placeholder="K" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Left </Typography> 
                            <Input id='ridable-left-key' disableUnderline={true} placeholder="H" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Right </Typography> 
                            <Input id='ridable-right-key' disableUnderline={true} placeholder="L" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Speed </Typography> 
                            <Input id='ridable-speed' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Entering Distance </Typography> 
                            <Input id='flyable-reacting-distance' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Boosting Key </Typography> 
                            <Input id='boosting-key' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Boosting Power </Typography> 
                            <Input id='boosting-power' disableUnderline={true} placeholder="1" sx={inputSx}/>
                        </Box> </>
                    }
                    {flyableFunc === 'Fixed Animation' && <>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Rotation Radius </Typography> 
                            <Input id='flyable-rotation-radius' disableUnderline={true} placeholder="15" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Rotation Speed </Typography> 
                            <Input id='flyable-rotation-speed' disableUnderline={true} placeholder="10" sx={inputSx}/>
                        </Box>
                        <Box sx={{ display: 'flex', 
                        justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Flying height </Typography> 
                            <Input id='flyable-flying-height' disableUnderline={true} placeholder="10" sx={inputSx}/>
                        </Box> </>
                    }
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

    return optionList;
    
};

export default observer(CreateSidebarOptions);