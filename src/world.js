import React, { Suspense, useEffect } from "react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, FirstPersonControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";


export default function MyWorld(props) {

    return (
        <>
            {/* <axesHelper args={[1000]} /> */}
            {!props.up && <OrbitControls />}
            <ambientLight intensity={0.1} />
            <Plane
                receiveShadow={true}
                position={[0, -0.01, 0]} // 강, 도로 보다 살짝 아래로 위치 시키기
                rotation={[- Math.PI / 2, 0, 0]}
                args={[1000, 1000]}
            >
                <meshStandardMaterial color="white" />
            </Plane>
            <directionalLight
                castShadow
                shadow-mapSize-height={10240}
                shadow-mapSize-width={10240}
                shadow-camera-left={-1000}
                shadow-camera-right={1000}
                shadow-camera-bottom={-1000}
                shadow-camera-top={1000}
                shadow-camera-near={0.1}
                shadow-camera-far={1000}
                shadow-radius={5}
                shadow-blurSamples={5}
                position={[15, 22, 10]}
                intensity={1} />
            {props.model['components']}
        </>
    )
} 
