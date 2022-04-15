import React, { useEffect }  from "react";
import { OrbitControls  } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useStores } from './stores/Context';
import { observer } from 'mobx-react';
import FirstPersonControl from './FirstPersonControl';


function MyWorld(props) {
    const { ModelStore, PlaymodeStore } = useStores();

    const canvas_style = PlaymodeStore.playMode ? { background: "#2f2f2f" } : { background: "white" };
    const camera_settings = PlaymodeStore.playMode ? { position: [0, 0.1, 10], fov: 50 } : { position: [0, 5, 10] };

    return (
        <Canvas
          style={canvas_style}
          camera={camera_settings}
          id="canvas"
        >
            {PlaymodeStore.playMode ? <FirstPersonControl exit={PlaymodeStore.exitPm}/> : <OrbitControls />}
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            {ModelStore.model}
        </Canvas>
    )
} 

export default observer(MyWorld);

//{props.model['components']}
