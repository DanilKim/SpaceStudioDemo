import React, { Suspense, useEffect, useRef, useState }  from "react";
import { OrbitControls, TransformControls, useProgress, Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useStores, StoreProvider, StoreConsumer } from './stores/Context';
import { observer } from 'mobx-react';
import Decorator from './components/Objects/Decorator';
import { toJS } from 'mobx';

function Loader() {
    const { progress } = useProgress();
    return <Html center> <h2>Model Loading... {progress.toFixed(2)}%</h2></Html>
}

const Transformable = () => {
    const { SidebarStore } = useStores();
    const { scene } = useThree();
    const [ mode, setMode ] = useState('translate');
    const keyBoardEvent = () => {
        switch(window.event.code) {
            case 'KeyG':
                setMode('translate');
                break
            case 'KeyR':
                setMode('rotate');
                break
            case 'KeyS':
                setMode('scale');
                break
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyBoardEvent);
        return () => window.removeEventListener('keydown', keyBoardEvent);
    })

    return (
        <TransformControls mode={mode} object={SidebarStore.selected && scene.getObjectByName(SidebarStore.item.id, true)} />
    )
}

function MyWorld() {
    const { ModelStore, SidebarStore } = useStores();
    ModelStore.model;
    SidebarStore.selected;

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
                    <OrbitControls makeDefault attach="orbitControls"/>
                    <Decorator/>
                    <gridHelper args={[100, 100, 0xff0000]} />
                    {ModelStore.model}
                    {SidebarStore.selected && <Transformable />}
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
    )
} 

export default observer(MyWorld);
