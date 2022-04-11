import { useFrame } from '@react-three/fiber';
import React, { useState, useRef } from 'react';

export default function Building(props) {
    const buildRef = useRef();
    const [active, setActive] = useState(false);

    var velocity = 0;

    const handleClick = (event) => {
        console.log(props.name);
    }

    useFrame( (_, delta) => {
        if (active) {
            if (buildRef.current.position.y < 0.01) {
                velocity = 2;
            } else {
                velocity -= 0.1;
            }
            buildRef.current.position.y += velocity * delta;
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
            onPointerOver={() => {
                setActive(true);
            }}
            onPointerOut={() => {
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