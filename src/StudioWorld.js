import React, { Suspense, useEffect, useRef, useState }  from "react";
import { OrbitControls, TransformControls, MapControls, useProgress, Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useStores, StoreProvider, StoreConsumer } from './stores/Context';
import { observer } from 'mobx-react';
import Decorator from './components/assets/Decorator';
import SaveBot from './components/ui/SaveBot';
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
            case 'KeyT':
                setMode('translate');
                break;
            case 'KeyR':
                setMode('rotate');
                break;
            case 'KeyS':
                setMode('scale');
                break;
            default:
                break;
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
    const { ModelStore, SidebarStore, ModeStore, SceneStore } = useStores();
    ModelStore.model;
    SidebarStore.selected;
    ModeStore.isEdit;
    SceneStore.scene;

    const canvas_style = { background: "white" };
    const camera_settings = { position: [0, 10, 20] };
    const unselectEvent = () => {
        if (window.event.key === "Escape" && SidebarStore.selected) {SidebarStore.unselect();}
    }

    useEffect(() => {
        document.addEventListener('keydown', unselectEvent);
        return () => window.removeEventListener('keydown', unselectEvent);
    });

    return (
        <StoreConsumer>
        { value => (
            <Canvas
            style={canvas_style}
            camera={camera_settings}
            id="canvas"
            onCreated={({ scene }) => SceneStore.setScene( scene )}
            >
            <StoreProvider value={value}>
                <Suspense fallback={<Loader/>}>
                    <OrbitControls makeDefault attach="orbitControls"/>
                    <Decorator/>
                    <gridHelper name="gridHelper" args={[1000, 100, 0xff0000]} />
                    {ModelStore.model}
                    {ModeStore.isEdit && !SidebarStore.selected && <MapControls />}
                    {SidebarStore.selected && <Transformable />}
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
    )
} 

export default observer(MyWorld);
