import React, { Suspense, useEffect } from "react";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, FirstPersonControls } from "@react-three/drei";
import { useStores } from './stores/Context';
import { observer } from 'mobx-react';

function MyWorld(props) {
    const { ModelStore } = useStores();
    console.log(ModelStore.model);

    return (
        <>
            {!props.up && <OrbitControls />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            {ModelStore.model['components']}
        </>
    )
} 

export default observer(MyWorld);
//{props.model['components']}
