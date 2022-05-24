import React, { Suspense, useEffect, useRef }  from "react";
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useStores, StoreProvider, StoreConsumer } from './stores/Context';
import { observer } from 'mobx-react';
import Decorator from './components/Objects/Decorator';
import { toJS } from 'mobx';


function Loader() {
    const { progress } = useProgress();
    return <Html center> <h2>Model Loading... {progress.toFixed(2)}%</h2></Html>
}

const Draggable = ({ children }) => {
    const ref = useRef();
    const { camera, gl, scene } = useThree();
    useEffect(() => {
        const controls = new DragControls(ref.current.children, camera, gl.domElement);
        controls.tranformGroup = true;
        const orbitControls = scene.orbitControls;

        controls.addEventListener('dragstart', () => { orbitControls.enabled = false; });
        controls.addEventListener('dragend', () => { orbitControls.enabled = true; });
    }, [camera, gl.domElement, scene]);
    
    return <group ref={ref}>{ children }</group>
}


function MyWorld() {
    const { ModelStore } = useStores();
    console.log(toJS(ModelStore.model));

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
                    <OrbitControls attach="orbitControls"/>
                    <Decorator/>
                    <gridHelper args={[100, 100, 0xff0000]} />
                    <Draggable>
                        {ModelStore.model}
                    </Draggable>
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
    )
} 

export default observer(MyWorld);
