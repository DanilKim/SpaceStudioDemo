import React from 'react';
import { useFBX } from '@react-three/drei'; 

const BASE_URL_FBX = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const TEST_FBX = '/assets/trees/tree.fbx';

function Asset(props) {
    let fbx_fn = props.fn ? props.fn : BASE_URL_FBX + TEST_FBX;
    let fbx = useFBX(fbx_fn);

    return (
        <mesh 
            position={props.position ? props.position : [0,3,0]} 
            scale={props.scale ? props.scale : 0.05}>
            <primitive object={fbx} dispose={null}/>
        </mesh>
    )
}

export default Asset;