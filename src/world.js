import React, { Suspense, useEffect } from "react";
 
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, FirstPersonControls } from "@react-three/drei";


export default function MyWorld(props) {
    //useEffect( () => {
    //    console.log('MyWorld Mounted');
    //    console.log(props.models);
    //    props.models.map( (model) => (console.log(model)));
    //})
    return (
        <>
            {!props.up && <OrbitControls />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            {props.model['components'].map( (m) => (m) )}
        </>
    )
} 
