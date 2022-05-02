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
