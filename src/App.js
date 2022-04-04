import React, { useState, useRef } from 'react'
import * as THREE from 'three';
import MenuScreen from './MenuScreen';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import FirstPersonControl from './FirstPersonControl';

const Status = {
  INITIALIZING: 'initializing...',
  IDLE: 'idle'
}

function App() {

  const [status, setStatus] = useState(Status.INITIALIZING);
  const [cg, setCg] = useState(undefined);
  const [delta, setDelta] = useState(0);
  const [userPlaying, setUserPlaying] = useState(false);

  const clock = new THREE.Clock();	//애니메이션에 사용됨

  const canvasRef = useRef(null);		//3D가 그려질 캔버스 공간

  /*
  useEffect(() => {
    const init = () => {
      const canvas = props.canvas || canvasRef.current;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      console.log("w:" + width + " h:" + height);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
      //---전형적인 three.js 문법으로 scene과 camera를 생성하고 캔버스 크기에 맞게 설정
      
      camera.position.set(10, 70, 50);
      camera.rotation.set(Math.PI / 2, Math.PI / 3, Math.PI / 3);
      camera.updateProjectionMatrix();
      //---1인칭 시점 플레이를 위해 카메라 위치를 조정함

      const controls = new PointerLockControls(camera, canvas);
      controls.addEventListener('lock', () => setUserPlaying(true));
      controls.addEventListener('unlock', () => setUserPlaying(false));
      scene.add(controls.getObject());
      //---1인칭 시점 플레이를 위한 PointerLockControls로 이 인스턴스를 FirstPersonControl 컴포넌트에 넘김

      const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true, canvas: canvas });
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      //---렌더러 생성


      setCg({ canvas: canvas, scene: scene, camera: camera, renderer: renderer, controls: controls });
      //---cg 스테이트에 scene, camera, renderer 등 필요한 것들을 업데이트함
      //---별개로 다룰 경우 우선순위 문제 때문에 복잡해지길래 cg(computer graphics의 약자)로 묶었습니다.
    }

    init();
  }, []);
  */

  return (
    <MenuScreen/>
  );
}

export default App;
