import { useFrame, useThree } from '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';


export default function Building(props) {
    const buildRef = useRef();
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    var velocity = 0;

    const handleClick = (event) => {
        event.stopPropagation();
        alert(props.name);
    }
    var time = 0;
    useFrame((_, delta) => {
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

    return (<>
        <mesh
            ref={buildRef}
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

    </>
    );

};


//import Button from '@mui/material/Button';
//import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';


//<Dialog open={open} onClose={handleClose}>
//    <DialogTitle>공공데이터 업로드</DialogTitle>
//    <DialogContent>
//    <DialogContentText>
//        {props.name} 건물의 실내로 들어가겠습니까?
//    </DialogContentText>
//    </DialogContent>
//    <DialogActions>
//    <Button component="label">
//        실내 공간 작업 시작
//    </Button>
//    <Button onClick={handleClose}>취소</Button>
//    </DialogActions>
//</Dialog>
