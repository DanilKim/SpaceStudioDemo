import React from 'react';
import { useFBX } from '@react-three/drei'; 

const BASE_URL_FBX = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const TEST_FBX = '/assets/trees/tree.fbx';

function Asset() {
    let fbx = useFBX(BASE_URL_FBX + TEST_FBX);
    
    return (
        <mesh 
            position={[0,5,0]} 
            scale={0.1}>
            <primitive object={fbx} dispose={null}/>
        </mesh>
    )
}

export default Asset;