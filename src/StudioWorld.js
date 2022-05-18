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
    ModelStore.model;

    const canvas_style = { background: "white" };
    const camera_settings = { position: [0, 5, 10] };

    return (
        <StoreConsumer>
        { value => (
            <Canvas
            style={canvas_style}
            camera={camera_settings}
            id="canvas"
            >
            <StoreProvider value={value}>
                <Suspense fallback={<Loader/>}>
                    <OrbitControls />
                    <Decorator/>
                    {ModelStore.model}
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
    )
} 

export default observer(MyWorld);
