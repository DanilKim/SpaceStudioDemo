import React  from "react";
import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useStores } from './stores/Context';
import { observer } from 'mobx-react';
import FirstPersonControl from './FirstPersonControl';


function MyWorld() {
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
            {ModelStore.model}
        </Canvas>
    )
} 

export default observer(MyWorld);

//{props.model['components']}
