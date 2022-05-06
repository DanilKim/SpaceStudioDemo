import React, { useState, useEffect, useRef } from 'react';
import { useFBX } from '@react-three/drei'; 
import { useStores } from '../../stores/Context';
import { observer } from 'mobx-react';

const BASE_URL_FBX = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const TEST_FBX = '/assets/trees/tree.fbx';

function Asset(props) {
    
    const { SidebarStore, PlaymodeStore } = useStores();
    const assetRef = useRef();

    const [active, setActive] = useState(false);
    //첫 번째 원소는 현재 상태, 두번째 원소는 Setter 함수

    let fbx_fn = props.fn ? props.fn : BASE_URL_FBX + TEST_FBX;
    let fbx = useFBX(fbx_fn);


    //onpointover=> 

    return (
        <mesh
            ref={assetRef}
            key={props.name} 
            position={props.position ? props.position : [0,3,0]} 
            scale={active ? 0.06 : 0.05}
            onPointerOver={(event) => {
                event.stopPropagation();
                event.target.release
                if (!PlaymodeStore.playMode) {setActive(true);};
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) {setActive(false);};
            }}
            
            onClick={(event) => {
                event.stopPropagation();
            }}

            onDoubleClick={(event) => {
                event.stopPropagation();
                console.log('Doughnut')
            }}
            
        >
            <primitive object={fbx} dispose={null}/>
        </mesh>
    )
    
}

export default observer(Asset);