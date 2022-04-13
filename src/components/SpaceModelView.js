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
import { Canvas } from "@react-three/fiber";
import GeojsonUploadCard from './GeojsonUploadCard'
import SpaceSelectionCard from './SpaceSelectionCard'
import MyWorld from '../world';
import { Plane } from '@react-three/drei'

export default function SpaceModelView(props) {

    return (
        <Box sx={{ height: '94vh', display: 'flex', bgcolor: 'white' }}>
            <Card variant='elevation' sx={{ width: '20%', height: '97.5%', m: '1.25%', bgcolor: 'white', borderRadius: 5, border: 0.5, borderColor: '#dbdbdb' }}>
                <CardHeader title="City Modeling" sx={{ color: '#5f5f5f' }} />
                <CardContent>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: -2 }}>
                        <Typography variant="body1" sx={{ ml: 2, flexGrow: 1, color: '#5f5f5f' }}>
                            [도시 모델]
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 2, color: '#5f5f5f' }}>
                            옵션을 선택하세요.
                        </Typography>
                    </Card>
                    <GeojsonUploadCard />
                    <SpaceSelectionCard
                        model={props.model}
                        setModel={props.setModel}
                    />
                </CardContent>
            </Card>
            <Box sx={{ height: '100%', width: '80%' }}>
                <Canvas shadows
                    camera={!props.up && { position: [0, 5, 10] }} >
                    <MyWorld key='studio-mode' model={props.model} up={false} />
                </Canvas>
            </Box>
        </Box>
    )
}
//raycaster={{ filter: (intersects, state) => intersects.slice(0, 1) }}
