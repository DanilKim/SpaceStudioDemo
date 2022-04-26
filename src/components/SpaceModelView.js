import React from "react";
import Box from '@mui/material/Box';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
} from '@mui/material';
import GeojsonUploadCard from './GeojsonUploadCard'
import SpaceSelectionCard from './SpaceSelectionCard'
import MyWorld from '../world';


export default () => {

    return (
        <Box sx={{ height: '95vh', display: 'flex', bgcolor: 'white'  }}>
            <Card variant='elevation' sx={{ width: '20%', height: '99%', m: '0.5%', bgcolor: 'white', borderRadius: 5, border: 0.5, borderColor: '#dbdbdb' }}>
                <CardHeader title="City Modeling" sx={{ color: '#5f5f5f' }} />
                <CardContent>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: -2 }}>
                        <Typography component={'div'} variant="body1" sx={{ ml: 2, flexGrow: 1, color: '#5f5f5f' }}>
                            [도시 모델]
                        </Typography>
                        <Typography component={'div'} variant="body1" sx={{ mr: 2, color: '#5f5f5f' }}>
                            옵션을 선택하세요.
                        </Typography>
                    </Card>
                    <GeojsonUploadCard />
                    <SpaceSelectionCard/>
                </CardContent>
            </Card>
            <Box sx={{ height: '100%', width: '80%', mr:1}}>
                <MyWorld key='studio-mode'/>
            </Box>
        </Box>
    )
}
//raycaster={{ filter: (intersects, state) => intersects.slice(0, 1) }}
