import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import PortalPopup from './components/ui/PortalPopup';
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls, Html } from "@react-three/drei";
import { observer } from 'mobx-react';
import { useStores } from './stores/Context';

const fp = {
    accelFw: false,
    accelBw: false,
    turnLeft: false,
    turnRight: false,
    canFly: false,
    velocity: 0,
    direction: THREE.Vector2(),
    theta: 0
}
//---1인칭 플레이에서 사용할 변수들

const friction = 3;
const airResist = 1;

function RiderControl() {
    const { SidebarStore, SceneStore, ModeStore } = useStores();

    let item = SceneStore.scene.getObjectByName(SidebarStore.item.id, true);

    const controlsRef = useRef(null);
    const controls = controlsRef.current;
    const defaultHeight = camera.position.y;

    const codeMap = (key) => {
        return 'Key' + key.charAt(0).toUpperCase() + key.slice(1);
    }

    useEffect(() => {
        const createKeyInput = () => {
            document.addEventListener('keydown', (event) => {
                switch (event.code) {
                    case 'ArrowUp':
                    case codeMap(item.key_control.forward):
                        fp.accelFw = true;
                        break;
                    case 'ArrowLeft':
                    case codeMap(item.key_control.backward):
                        fp.accelBw = true;
                        break;
                    case 'ArrowDown':
                    case codeMap(item.key_control.left):
                        fp.turnLeft = true;
                        break;
                    case 'ArrowRight':
                    case codeMap(item.key_control.right):
                        fp.turnRight = true;
                        break;
                    //case 'Space':
                    //    if (fp.canJump === true) {
                    //        fp.velocity.y += 2;
                    //    }
                    //    fp.canJump = false;
                    //    break;
                    default:
                        break;
                }
            });

            document.addEventListener('keyup', (event) => {
                switch (event.code) {
                    case 'ArrowUp':
                    case codeMap(item.key_control.forward):
                        fp.accelFw = false;
                        break;
                    case 'ArrowLeft':
                    case codeMap(item.key_control.backward):
                        fp.accelBw = false;
                        break;
                    case 'ArrowDown':
                    case codeMap(item.key_control.left):
                        fp.turnLeft = false;
                        break;
                    case 'ArrowRight':
                    case codeMap(item.key_control.right):
                        fp.turnRight = false;
                        break;
                    default:
                        break;
                }
            })

            document.addEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    ModeStore.exitRm();
                }
            });
        }

        createKeyInput();
        //---키보드로 플레이할 수 있도록 합니다.
    }, []);


    useFrame((_, delta) => {

        //fp.velocity.x -= fp.velocity.x * 10.0 * delta;
        //fp.velocity.z -= fp.velocity.z * 10.0 * delta;

        if (fp.velocity > 0) {
            fp.velocity -= friction * 0.1 * delta; // 5.0 = mass
        } else {
            fp.velocity += friction * 0.1 * delta; // 5.0 = mass

        }

        fp.direction.x = Number(fp.accelFw) - Number(fp.accelBw);
        fp.direction.y = Number(fp.turnRight) - Number(fp.turnLeft);
        fp.direction.normalize(); // this ensures consistent fp.movements in all fp.directions
        

        if ((fp.accelFw || fp.accelBw) && (Math.abs(fp.velocity) < item.max_speed)) {
            fp.velocity += fp.direction.x * 8.0 * delta;
        }
        if (fp.turnLeft || fp.turnRight) {
            fp.theta =+ fp.direction.y * 0.5 * delta;
        }

        controls.moveRight(- fp.velocity.x * delta);
        controls.moveForward(- fp.velocity.z * delta);

        controls.getObject().position.y += (fp.velocity.y * delta); // new behavior

        if (controls.getObject().position.y < defaultHeight) {
            fp.velocity.y = 0;
            controls.getObject().position.y = defaultHeight;
            fp.canJump = true;
        }

    });


    return (
        <></>
    )
}

export default observer(RiderControl);

/*
{ portal && 
    <Html><PortalPopup name={portal}/></Html>
}
*/