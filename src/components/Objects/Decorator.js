import React, { useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { useThree, useFrame } from '@react-three/fiber';
import { Plane, Environment, useProgress, Html, Sky, Stars, Cloud } from '@react-three/drei';
import { useStores } from '../../stores/Context';
import { observer } from 'mobx-react';

const BASE_URL_HDRI = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const HDRI = '/hdri/je_gray_park_4k.hdr'

function Loader() {
    const { progress } = useProgress();
    return <Html center> <h1>Loading Sky... {progress.toFixed(2)}%</h1></Html>
}


function Decorator() {
    const { scene, gl, camera } = useThree();
    const { PlaymodeStore, SidebarStore } = useStores();

    const vec = new THREE.Vector3();
    const step = 0.05;

    useFrame((state) => {
        if (SidebarStore.selected) {
            vec.set(SidebarStore.cameraposition[0] + 1, SidebarStore.cameraposition[1] + 3, SidebarStore.cameraposition[2] + 3)
            state.camera.position.lerp(vec, step);
            state.camera.lookAt(SidebarStore.cameraposition[0], SidebarStore.cameraposition[1], SidebarStore.cameraposition[2]);
            state.camera.updateProjectionMatrix();
        }
    })

    useEffect(() => {

        const setBackground = () => {
            if (HDRI) {
                const filepath = BASE_URL_HDRI + HDRI;
                //console.log('setBackground: loading... ' + filepath);
                new RGBELoader()
                    //.setDataType(THREE.UnsignedByteType)
                    .setPath(BASE_URL_HDRI)
                    .load(HDRI, (texture) => {
                        const pmremGenerator = new THREE.PMREMGenerator(gl);
                        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                        pmremGenerator.compileEquirectangularShader();

                        scene.background = envMap;
                        scene.environment = envMap;

                        texture.dispose();
                        pmremGenerator.dispose();
                    })
                //---지난 편에서 업로드한 HDR 파일을 배경으로 로딩하는 과정은 설명이 복잡해서 그냥 따라하는 것이 좋습니다.
                //---다만, three.js 버전별로 코드가 안 먹는 경우가 있으니 버전에 유의하도록 합니다.
            } else {
                scene.background = new THREE.Color().setHSL(0.6, 0, 1);
                scene.fog = new THREE.Fog(scene.background, 500, 10000);
            }
        }


        //setLight(props);
        //setGround(props);
        if (PlaymodeStore.playMode) {
            //setBackground();
        }

    }, []);

    return (<>
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
        {!PlaymodeStore.playMode &&
            <Suspense fallback={null}>
                <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                <Stars radius={5} depth={100} count={100} factor={4} saturation={0} fade speed={0.1} />
                <Cloud opacity={0.5} speed={0.4} width={10} depth={-20} segments={20} />
            </Suspense>
        }
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
        {PlaymodeStore.playMode &&
            <Suspense fallback={<Loader />}>
                <Environment files={HDRI} path={BASE_URL_HDRI} background />
            </Suspense>
        }
    </>);
}

export default observer(Decorator);