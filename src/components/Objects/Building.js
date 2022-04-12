import { useFrame, useThree } from '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';


export default function Building(props) {
    const buildRef = useRef();
    const [active, setActive] = useState(false);

    var velocity = 0;

    const handleClick = (event) => {
        event.stopPropagation();
        alert(props.name);
    }

    useFrame((_, delta) => {
        if (active) {
            buildRef.current.rotation.x += 0.01;
            // if (buildRef.current.position.y < 0.01) {
            //     velocity = 2;
            // } else {
            //     velocity -= 0.1;
            // }
            // buildRef.current.position.y += velocity * delta;
        } else {
            buildRef.current.position.y = 0;
            velocity = 0;
        }
    })

    return (
        <mesh
            ref={buildRef}
            key={props.key}
            geometry={props.geometry}
            position={props.position}
            scale={props.scale}
            name={props.name}
            castShadow={props.castShadow}
            receiveShadow={props.recieveShadow}
            onPointerOver={(event) => {
                event.stopPropagation();
                setActive(true);
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                setActive(false);
            }}
            onClick={handleClick}
        >
            <meshPhongMaterial
                attach="material"
                color={active ? "hotpink" : props.color}
            />
        </mesh>

    );

};