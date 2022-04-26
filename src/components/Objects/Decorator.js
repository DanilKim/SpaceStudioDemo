import React, { useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useStores  } from '../../stores/Context';
import { observer } from 'mobx-react';

const BASE_URL_HDRI = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/hdri/';
//const BASE_URL_HDRI = '../../../hdri/';
const HDRI = 'je_gray_park_4k.hdr'

function Decorator() {
    const { scene, gl } = useThree();
    const { PlaymodeStore } = useStores();

    useEffect(() => {
        //const setLight = ({ scene }) => {
        //    scene.add(new THREE.AmbientLight(0xff52ff, 0.6));
        //}
        //---전체적으로 잘 보이게 이상적인 AmbientLight를 넣습니다.

        //const setGround = (props) => {
        //    let floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        //    let floorMaterial= new THREE.MeshPhongMaterial({
    	//        color: 0xffffff, opacity: 0.1, transparent: true
        //    });
        //
        //    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        //    floor.rotation.x = -0.5 * Math.PI;
        //    floor.receiveShadow = true;
        //    props.scene.add(floor);
        //}
        //---바닥을 그려줍니다.


        const setBackground = () => {
            if (HDRI) {
                const filepath = BASE_URL_HDRI + HDRI;
                console.log('setBackground: loading... ' + filepath);
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
        if ( PlaymodeStore.playMode ) {
            setBackground();
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
    </>);
}

export default observer(Decorator);