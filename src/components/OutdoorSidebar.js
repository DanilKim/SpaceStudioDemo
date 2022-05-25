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
    TextField
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../stores/Context';
import PlanPreview from './planPreview';

export default observer((props) => {
    const { SidebarStore, IndoormodeStore } = useStores();
    
    const handleClick = () => {
        IndoormodeStore.setValue();
    };

    const handleChange = ({ target: { value } }) => SidebarStore.distplayer(value);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Entering Distance: ${SidebarStore.distance}`);
    };

    const eulerToDegree = (euler) => {
        let degree = euler * 180.0 / Math.PI;
        if (degree < 0) {
            degree += 360.0;
        }
        return degree;
    }

    // const [dist, setDist] = useState();

    // const handleChange = ({ target: { value } }) => setDist(value);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(`Entering Distance: ${dist}`);
    // };

    // const handleChange = (event) => {
    //     setDist(event.target.value);
    //     console.log(dist, "here")
    // };

    return (<>
        <Card variant='elevation' sx={{ width: '100%', height: '99%', m: '0%', mt: 1, bgcolor: '#e4ddfa' }}>
            <CardHeader
                title="공간 컴포넌트"
                avatar={<Avatar src="../../icons/building_icon.png" />}
                sx={{ color: '#5f5f5f', m: '3%', mb: -3 }}
            />
            {SidebarStore.selected &&
                <CardContent>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: 30 }}>명칭</TableCell>
                                        <TableCell align="right" >{SidebarStore.building.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">용도</TableCell>
                                        <TableCell align="right" >{SidebarStore.building.category}</TableCell>
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
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.position.x.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.position.y.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.position.z.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">rotation</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{eulerToDegree(SidebarStore.building.rotation.x).toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{eulerToDegree(SidebarStore.building.rotation.y).toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{eulerToDegree(SidebarStore.building.rotation.z).toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">scale</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.scale.x.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.scale.y.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue' }}>{SidebarStore.building.scale.z.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    {/* <TextField id="outlined-basic" label="Distance" variant="outlined" onChange={handleChange}></TextField> */}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Entering Distance:
                            <input
                                type="distance"
                                name="distance"
                                value={SidebarStore.distance}
                                onChange={handleChange}
                            />
                        </label>
                    </form>

                    <Card variant='elevation' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        {
                            localStorage.getItem(SidebarStore.building.name) !== null ?
                            <PlanPreview buildingName={SidebarStore.building.name} /> :
                            <></>
                        }
                    </Card>
                    <Button onClick={handleClick} sx={{ color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center' }}>
                        실내 공간 스튜디오
                    </Button>
                </CardContent>
            }
        </Card>
    </>
    );


})