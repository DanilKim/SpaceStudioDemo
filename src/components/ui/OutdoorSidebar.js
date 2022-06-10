import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Input
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import CreateSidebarOptions from "./CreateSidebarOptions";
import PlanPreview from '../planPreview';
import { Vector3 } from "three";

const actions = ['rotation', 'hover', 'alien atack'];

export default observer((props) => {
    const { SidebarStore, ModeStore, SceneStore } = useStores();
    const [act, setAct] = useState();

    let item;
    if (SidebarStore.selected) {
        item = SceneStore.scene.getObjectByName(SidebarStore.item.id, true);
    }

    //const handleClickIndoor = () => {
    //    ModeStore.setIndoorValue();
    //};

    const handleClickScene = (id) => {
        console.log(SceneStore.scene.getObjectByName(id, true));
    }

    //const handleChangeDistance = ({ target: { value } }) => SidebarStore.distplayer(value);

    //const handleSubmitDistance = (event) => {
    //    event.preventDefault();
    //    alert(`Entering Distance: ${SidebarStore.distance}`);
    //};

    //const actChange = (event) => {
    //    setAct(event.target.value);
    //}

    const eulerToDegree = (euler) => {
        let degree = euler * 180.0 / Math.PI;
        if (degree < 0) {
            degree += 360.0;
        }
        return degree;
    }

    const degreeToEuler = (degree) => {
        return degree * (Math.PI / 180);
    }

    const delegate = (event, func) => {
        if (event.key === "Enter"){
            if(!isNaN(event.target.value)){
                func(event.target.value);
            }
            event.currentTarget.value = '';
            event.target.blur();
    }}

    const setPosX = (x) => { item.position.setX(Number(x)); }
    const setPosY = (y) => { item.position.setY(Number(y)); }
    const setPosZ = (z) => { item.position.setZ(Number(z)); }
    const setRotX = (x) => { item.rotation.setFromVector3(new Vector3(degreeToEuler(x % 360), item.rotation.y, item.rotation.z)); }
    const setRotY = (y) => { item.rotation.setFromVector3(new Vector3(item.rotation.x, degreeToEuler(y % 360), item.rotation.z)); }
    const setRotZ = (z) => { item.rotation.setFromVector3(new Vector3(item.rotation.x, item.rotation.y, degreeToEuler(z % 360))); }
    const setScaX = (x) => { item.scale.setX(Number(x)); }
    const setScaY = (y) => { item.scale.setY(Number(y)); }
    const setScaZ = (z) => { item.scale.setZ(Number(z)); }
    

    // const [dist, setDist] = useState();

    // const handleChange = ({ target: { value } }) => setDist(value);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(`Entering Distance: ${dist}`);
    // };

    return (<>
        <Card variant='elevation' sx={{ width: '100%', height: '99%', m: '0%', mt: 1, bgcolor: '#e4ddfa' }}>
            <CardHeader
                title="공간 컴포넌트"
                avatar={<Avatar src="../../icons/building_icon.png" />}
                sx={{ color: '#5f5f5f', m: '3%', mb: -3 }}
            />
            {SidebarStore.selected &&
                <CardContent align="center">
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: 30 }}>명칭</TableCell>
                                        <TableCell align="right" >{SidebarStore.item.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">종류</TableCell>
                                        <TableCell align="right" >{SidebarStore.item.category}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: 20 }}></TableCell>
                                        <TableCell align="right">x</TableCell>
                                        <TableCell align="right">y</TableCell>
                                        <TableCell align="right">z</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">position</TableCell>
                                        <TableCell align="right">
                                            <Input
                                            disableUnderline={true}
                                            placeholder={SidebarStore.transform.position.x.toFixed(0)} 
                                            onKeyDown={(event) => {delegate(event, setPosX)}}
                                            inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={SidebarStore.transform.position.y.toFixed(0)} 
                                                onKeyDown={(event) => {delegate(event, setPosY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={SidebarStore.transform.position.z.toFixed(0)} 
                                                onKeyDown={(event) => {delegate(event, setPosZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">rotation</TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(SidebarStore.transform.rotation.x).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotX)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(SidebarStore.transform.rotation.y).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(SidebarStore.transform.rotation.z).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">scale</TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={SidebarStore.transform.scale.x.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaX)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={SidebarStore.transform.scale.y.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>                                     
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={SidebarStore.transform.scale.z.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    {/* <TextField id="outlined-basic" label="Distance" variant="outlined" onChange={handleChange}></TextField> */}
                    <br />
                    
                    <CreateSidebarOptions/>

                    { SidebarStore.selected &&
                        <Button onClick={() => { handleClickScene(SidebarStore.item.id) }} sx={{ color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center' }}>
                        getObjectByName
                        ({SidebarStore.item.id})
                        </Button>
                    }

                </CardContent>
            }
        </Card>
    </>
    );


})

/*
<form onSubmit={handleSubmitDistance}>
    <label>
        Entering Distance:
        <input
            type="distance"
            name="distance"
            value={SidebarStore.distance}
            onChange={handleChangeDistance}
        />
    </label>
</form>

{ SidebarStore.current === 'asset' &&
    <FormControl sx={{ m:3, width: 200, flexGrow: 1 }}>
        <InputLabel htmlFor="action-select">Choose Effect</InputLabel>
        <Select 
        defaultValue="" 
        id="action-select" 
        label="Action"
        value={act}
        onChange={actChange}
        >
        {actions.map((a, index) => (<MenuItem key={index} value={a}>{a}</MenuItem>))}
        </Select>
    </FormControl>
}

{ SidebarStore.current === 'building' && 
    <Card variant='elevation' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
    {
        localStorage.getItem(SidebarStore.item.name) !== null ?
        <PlanPreview buildingName={SidebarStore.item.name} /> :
        <></>
    }
    </Card>
}

{ SidebarStore.current === 'building' && 
    <Button onClick={handleClickIndoor} sx={{ color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center' }}>
        실내 공간 스튜디오
    </Button>
}
*/