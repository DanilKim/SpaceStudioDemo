import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

const fp = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    canJump: false,
    velocity: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    objects: [],
    intersectedObject: undefined,
    arrowHelper: undefined
}
//---1인칭 플레이에서 사용할 변수들

function FirstPersonControl(props) {

    const {
        scene, // Default scene
        camera, // Default camera
        raycaster, // Default raycaster
    } = useThree();
    //---앞에 뭐가 있는지 가리키는 용도(총이라면 과녁 같은 것으로 생각하면 되겠죠.)

    const controlsRef = useRef(null);
    const controls = controlsRef.current;
    const defaultHeight = camera.position.y;

    useEffect(() => {

        const createKeyInput = () => {
            document.addEventListener('keydown', (event) => {
                switch (event.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        fp.moveForward = true;
                        break;
                    case 'ArrowLeft':
                    case 'KeyA':
                        fp.moveLeft = true;
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        fp.moveBackward = true;
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        fp.moveRight = true;
                        break;
                    case 'Space':
                        if (fp.canJump === true) {
                            fp.velocity.y += 150;
                        }
                        fp.canJump = false;
                        break;
                    default:
                        break;
                }
            });

            document.addEventListener('keyup', (event) => {
                switch (event.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        fp.moveForward = false;
                        break;

                    case 'ArrowLeft':
                    case 'KeyA':
                        fp.moveLeft = false;
                        break;

                    case 'ArrowDown':
                    case 'KeyS':
                        fp.moveBackward = false;
                        break;

                    case 'ArrowRight':
                    case 'KeyD':
                        fp.moveRight = false;
                        break;
                    default:
                        break;
                }
            })

            document.addEventListener('mousedown', () => {
                processRaycaster();
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    props.sUp(false);
                }
            });
        }

        createKeyInput();
        //---키보드로 플레이할 수 있도록 합니다.
    }, []);


    useFrame((_, delta) => {
        if (controls.isLocked === true) {
            drawRaycaster();

            fp.velocity.x -= fp.velocity.x * 10.0 * delta;
            fp.velocity.z -= fp.velocity.z * 10.0 * delta;

            fp.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            fp.direction.z = Number(fp.moveForward) - Number(fp.moveBackward);
            fp.direction.x = Number(fp.moveRight) - Number(fp.moveLeft);
            fp.direction.normalize(); // this ensures consistent fp.movements in all fp.directions

            if (fp.moveForward || fp.moveBackward) fp.velocity.z -= fp.direction.z * 40.0 * delta;
            if (fp.moveLeft || fp.moveRight) fp.velocity.x -= fp.direction.x * 40.0 * delta;

            controls.moveRight(- fp.velocity.x * delta);
            controls.moveForward(- fp.velocity.z * delta);

            controls.getObject().position.y += (fp.velocity.y * delta); // new behavior

            if (controls.getObject().position.y < 10) {
                fp.velocity.y = 0;
                controls.getObject().position.y = defaultHeight;
                fp.canJump = true;
            }
        } else {
            controls.lock();
        }

    });

    const processRaycaster = () => {
        const intersects = raycaster.intersectObjects(fp.objects);
        if (intersects.length > 0) {
            if (fp.intersectedObject) {
                fp.intersectedObject.material.color.setHex(0xffffff);
            }
            intersects[0].object.material.color.setHex(0xfff000);
            intersects[0].object.material.opacity = 1;
            fp.intersectedObject = intersects[0].object;

            if (props.onSelect) {
                controls.unlock();
                if (fp.intersectedObject) {
                    fp.intersectedObject.material.color.setHex(0xffffff);
                }
                fp.intersectedObject = undefined;
                raycaster.set(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
                props.onSelect(intersects[0].object.userData);
            }
        } else {
            if (fp.intersectedObject) {
                fp.intersectedObject.material.color.setHex(0xffffff);
            }
            fp.intersectedObject = undefined;
        }
    }

    const drawRaycaster = () => {
        raycaster.set(camera.getWorldPosition(new THREE.Vector3()), camera.getWorldDirection(new THREE.Vector3()));
        scene.remove(fp.arrowHelper);

        let o = raycaster.ray.origin;
        o.y -= 0.2;

        fp.arrowHelper = new THREE.ArrowHelper(raycaster.ray.direction, o, 300, 0xff0000);
        scene.add(fp.arrowHelper);
    }

    const handleUnlock = () => {
        props.sUp(false);
    }

    return (
        <PointerLockControls ref={controlsRef} onUnlock={handleUnlock} camera={camera}/>
    )
}

export default FirstPersonControl;