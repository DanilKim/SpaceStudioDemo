import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei'; 
import { useStores } from '../../stores/Context';
import { observer } from 'mobx-react';

const DEFAULT_ENTERING_DISTANCE = 1;

function Sittable(props) {
    const { SidebarStore, ModeStore } = useStores();
    const assetRef = useRef();

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

    let fbx_fn = props.fn ? props.fn : BASE_URL_FBX + TEST_FBX;
    let fbx = useFBX(fbx_fn);

    const handleClick = (event) => {
        event.stopPropagation();

        setSelected(true);
        SidebarStore.selectAsset(
            assetRef.current.userData.id,
            assetRef.current.userData.id,
            'Sittable',
            assetRef.current.userData.category,
            assetRef.current.position,
            assetRef.current.rotation,
            assetRef.current.scale
        )

        SidebarStore.setcampos(assetRef.current.position.x, assetRef.current.position.y, assetRef.current.position.z)

    }

    useFrame( (_, delta) => {
        if (selected && !ModeStore.isPlay) {
            SidebarStore.update3D(
                assetRef.current.position,
                assetRef.current.rotation,
                assetRef.current.scale,
            )
        }
    })


    return (
        <mesh
            ref={assetRef}
            key={props.name}
            name={props.name}
            userData={{ 
                id: props.name, 
                category: props.category
            }} 
            position={props.position ? props.position : [0,0,0]} 
            scale={props.scale ? props.scale : 0.1 }

            entering_distance={DEFAULT_ENTERING_DISTANCE}

            onPointerMissed={(event) => {
                event.stopPropagation();
                SidebarStore.unselect();
                setSelected(false);
            }}

            onClick={handleClick}
        >
            <primitive object={fbx} dispose={null}/>
        </mesh>
    )
    
}

export default observer(Sittable);
