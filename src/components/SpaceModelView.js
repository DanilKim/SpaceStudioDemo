import React from "react";
import Box from '@mui/material/Box';
import { 
    Typography, 
    Card,
    CardHeader,
    CardContent,
    Button,
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import GeojsonUploadCard from './GeojsonUploadCard'
import SpaceSelectionCard from './SpaceSelectionCard'
import MyWorld from '../world';

export default function SpaceModelView() {
    const [models, setModel] = useState([]);
    const [firstMed, setMed] = useState(null);

    return (
        <Box sx={{ height: '94vh', display: 'flex'}}>
            <Card variant='elevation' sx={{ width: '20%', height: '97.5%', m:'1.25%', bgcolor: '#5f5f5f', borderRadius: 5 }}>
                <CardHeader title="City Modeling" sx={{color: 'white'}} />
                <CardContent>
                    <Card variant='elevation' sx={{ bgcolor: '#939393', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: -2 }}>
                        <Typography variant="body1" sx={{ ml: 2, flexGrow: 1, color: 'white' }}>
                            도시 모델
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 2, color: 'white' }}>
                            "hi"
                        </Typography>
                    </Card>
                    <GeojsonUploadCard/>
                    <SpaceSelectionCard 
                        models={models}
                        setModel={setModel}
                        med={firstMed} 
                        setMed={setMed}
                    />
                </CardContent>
            </Card>
            <Box sx={{height: '100%', width: '80%'}}>
                <MyWorld models={models} med={firstMed}/>
            </Box>
        </Box>
    )
} 
