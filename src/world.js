import React, { Suspense, useEffect } from "react";
 
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


export default function MyWorld(props) {
    useEffect( () => {
        console.log('MyWorld Mounted');
        console.log(props.models);
        console.log(props.med);
        props.models.map( (model) => (console.log(model)));
    })
    return (
        <Canvas camera={{ position : [0,5,10] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            {props.models.map( (model) => (model) )}
        </Canvas>
    )
} 
