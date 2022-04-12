import React, { Suspense, useEffect } from "react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, FirstPersonControls } from "@react-three/drei";


export default function MyWorld(props) {

    return (
        <>
            {!props.up && <OrbitControls />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            {props.model['components']}
        </>
    )
} 
