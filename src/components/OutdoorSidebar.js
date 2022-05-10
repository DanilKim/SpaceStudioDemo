import React from 'react';
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
    TableCell
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../stores/Context';
import PlanPreview from './planPreview';

export default observer( () => {
    const { SidebarStore, IndoormodeStore } = useStores();

    const handleClick = () => {
        IndoormodeStore.setValue();
    };

    return ( <>
        <Card variant='elevation' sx={{ width: '100%', height: '99%', m: '0%', mt:1, bgcolor: '#e4ddfa'}}>
            <CardHeader 
                title="공간 컴포넌트" 
                avatar={<Avatar src="../../icons/building_icon.png"/>}
                sx={{ color: '#5f5f5f', m: '3%', mb:-3 }} 
            />
            { SidebarStore.selected &&
                <CardContent>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0,  mt:2}}>
                        <TableContainer component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" sx={{width: 30}}>명칭</TableCell>
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
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0,  mt:2}}>
                        <TableContainer component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{width: 20}}></TableCell>
                                        <TableCell align="right">x</TableCell>
                                        <TableCell align="right">y</TableCell>
                                        <TableCell align="right">z</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">position</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.position.x.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.position.y.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.position.z.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">rotation</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>0</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>0</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">scale</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.scale.x.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.scale.x.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ color: 'blue'}}>{SidebarStore.building.scale.x.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', display: 'flex', flexDirection: 'row', boxShadow: 0,  mt:2}}>
                        {
                            localStorage.getItem(SidebarStore.building.name) !== null ?
                            <PlanPreview buildingName={SidebarStore.building.name} /> :
                            <g></g>
                        }
                    </Card>
                    <Button onClick={handleClick} sx={{ color: 'inherit', width: 1, height: 1/3, mt:3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center'}}>
                        실내 공간 스튜디오
                    </Button>
                </CardContent>
            }
        </Card>
    </>
    );

    
})