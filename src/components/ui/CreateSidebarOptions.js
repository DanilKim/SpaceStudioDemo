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

const inputSx = {width: '18%', fontSize: 15, textAlign: 'center', bgcolor: 'white'};

function CreateSidebarOptions() {
    const { SidebarStore, ModeStore, SceneStore } = useStores();
    
    const [ridable, setRidable] = useState(false);
    const [sittable, setSittable] = useState(false);
    const [flyableFunc, setFlyFunc] = useState('');

    let item = SceneStore.scene.getObjectByName(SidebarStore.item.id, true);

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
                            <Input id='ridable-forward-key' disableUnderline={true} placeholder={item.key_control.forward} sx={inputSx}
                                onChange={(event) => {item.key_control.forward = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Backward </Typography> 
                            <Input id='ridable-backward-key' disableUnderline={true} placeholder={item.key_control.backward} sx={inputSx}
                                onChange={(event) => {item.key_control.backward = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Left </Typography> 
                            <Input id='ridable-left-key' disableUnderline={true} placeholder={item.key_control.left} sx={inputSx}
                                onChange={(event) => {item.key_control.left = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Right </Typography> 
                            <Input id='ridable-right-key' disableUnderline={true} placeholder={item.key_control.right} sx={inputSx}
                                onChange={(event) => {item.key_control.right = event.target.value}}
                            />
                        </Box>
                        
                        <Box sx={{ display: 'flex', mt: 1, mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Entering Distance </Typography> 
                            <Input id='ridable-reacting-distance' disableUnderline={true} placeholder={item.entering_distance} sx={inputSx}
                                onChange={(event) => {item.entering_distance = event.target.value}}
                            />
                        </Box> 
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Speed </Typography> 
                            <Input id='ridable-speed' disableUnderline={true} placeholder={item.speed} sx={inputSx}
                                onChange={(event) => {item.speed = event.target.value}}
                            />
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
                            <Input id='sittable-reacting-distance' disableUnderline={true} placeholder={item.entering_distance} sx={inputSx}
                                onChange={(event) => {item.entering_distance = event.target.value}}
                            />
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
                            <Input id='ridable-forward-key' placeholder={item.key_control.forward} sx={inputSx} disableUnderline
                                onChange={(event) => {item.key_control.forward = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Backward </Typography> 
                            <Input id='ridable-backward-key' placeholder={item.key_control.backward} sx={inputSx} disableUnderline
                                onChange={(event) => {item.key_control.backward = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Left </Typography> 
                            <Input id='ridable-left-key' placeholder={item.key_control.left} sx={inputSx} disableUnderline
                                onChange={(event) => {item.key_control.left = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Right </Typography> 
                            <Input id='ridable-right-key' placeholder={item.key_control.right} sx={inputSx}  disableUnderline
                                onChange={(event) => {item.key_control.right = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Speed </Typography> 
                            <Input id='ridable-speed' placeholder={item.speed} sx={inputSx} disableUnderline
                                onChange={(event) => {item.speed = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Entering Distance </Typography> 
                            <Input id='flyable-reacting-distance' placeholder={item.entering_distance} sx={inputSx} disableUnderline
                                onChange={(event) => {item.entering_distance = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Boosting Key </Typography> 
                            <Input id='boosting-key' placeholder={item.key_control.boosting} sx={inputSx} disableUnderline
                                onChange={(event) => {item.key_control.boosting = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Boosting Power </Typography> 
                            <Input id='boosting-power' placeholder={item.power} sx={inputSx} disableUnderline
                                onChange={(event) => {item.power = event.target.value}}
                            />
                        </Box> </>
                    }
                    {flyableFunc === 'Fixed Animation' && <>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Rotation Radius </Typography> 
                            <Input id='flyable-rotation-radius' placeholder={item.anim_config.rotation_radius} sx={inputSx} disableUnderline
                                onChange={(event) => {item.anim_config.rotation_radius = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 0.1, justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Rotation Speed </Typography> 
                            <Input id='flyable-rotation-speed' placeholder={item.anim_config.rotation_speed} sx={inputSx} disableUnderline
                                onChange={(event) => {item.anim_config.rotation_speed = event.target.value}}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', 
                        justifyContent: 'space-evenly'}}>
                            <Typography sx={{width: '80%', textAlign:'left'}}> Flying height </Typography> 
                            <Input id='flyable-flying-height' placeholder={item.anim_config.flying_height} sx={inputSx} disableUnderline
                                onChange={(event) => {item.anim_config.flying_height = event.target.value}}
                            />
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