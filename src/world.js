import React, { Suspense }  from "react";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useStores, StoreProvider, StoreConsumer } from './stores/Context';
import { observer } from 'mobx-react';
import FirstPersonControl from './FirstPersonControl';
import Decorator from './components/Objects/Decorator';
import PortalPopup from "./components/PortalPopup";
import Asset from "./components/Objects/Asset";

function Loader() {
    const { progress } = useProgress();
    return <Html center> <h2>Model Loading... {progress.toFixed(2)}%</h2></Html>
}


function MyWorld() {
    const { ModelStore, PlaymodeStore, PortalStore } = useStores();
    console.log(ModelStore.model);

    const canvas_style = PlaymodeStore.playMode ? { background: "#2f2f2f" } : { background: "white" };
    const camera_settings = PlaymodeStore.playMode ? { position: [0, 0.1, 10], fov: 50 } : { position: [0, 5, 10] };

    return ( <>
        <StoreConsumer>
        { value => (
            <Canvas
            style={canvas_style}
            camera={camera_settings}
            id="canvas"
            >
            <StoreProvider value={value}>
                <Suspense fallback={<Loader/>}>
                    {PlaymodeStore.playMode ? <FirstPersonControl exit={PlaymodeStore.exitPm}/> : <OrbitControls />}
                    <Decorator/>
                    {ModelStore.model}
                    <Asset/>
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
        { (PlaymodeStore.playMode && PortalStore.portal) && <PortalPopup/>}
        </>
    )
} 

export default observer(MyWorld);

/* 
<ambientLight intensity={0.1} />
<Plane
    receiveShadow={true}
    position={[0, -0.01, 0]} // 강, 도로 보다 살짝 아래로 위치 시키기
    rotation={[- Math.PI / 2, 0, 0]}
    args={[1000, 1000]}
    name="Plane"
>
    <meshStandardMaterial color={PlaymodeStore.playMode ? "green" : "white"} />
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
*/