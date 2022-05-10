import { useFrame } from '@react-three/fiber';
import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import { Vector2 } from 'three';

function getFloorShape(geometry) {
    const lineCurves = geometry.parameters.shapes.curves;

    // compute mean vector
    let avg = new Vector2(0, 0);
    lineCurves.forEach(line => {
        avg.add(line.v1);
    })
    avg.divideScalar(lineCurves.length);
    
    let lineSegments = [];
    lineCurves.forEach(line => {
        lineSegments.push( [
            new Vector2( line.v1.x - avg.x, line.v1.y - avg.y ),
            new Vector2( line.v2.x - avg.x, line.v2.y - avg.y )
        ] );
    })
    return lineSegments;
};


export default observer( (props) => {
    const { SidebarStore, PlaymodeStore } = useStores();

    const buildRef = useRef();
    const [active, setActive] = useState(false);
    //const [open, setOpen] = useState(false);

    var velocity = 0;

    const handleClick = useCallback((event) => {
        event.stopPropagation();

        SidebarStore.select(
            buildRef.current.userData.id,
            buildRef.current.name,
            buildRef.current.userData.category,
            buildRef.current.position,
            buildRef.current.scale,
            getFloorShape(buildRef.current.geometry)
        )
        //alert(buildRef.current.name);
        //setOpen(true);
    }, []);

    const handleClose = useCallback((event) => {
        event.stopPropagation();
        //setOpen(false);
    }, []);

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
            userData={{id:props.key, category:props.category}}
            geometry={props.geometry}
            position={props.position}
            scale={props.scale}
            name={props.name}
            castShadow
            receiveShadow
            onPointerOver={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) {setActive(true);};
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) {setActive(false);};
            }}
            onClick={handleClick}
        >
            <meshStandardMaterial
                attach="material"
                color={active ? "hotpink" : props.color}
            />
        </mesh>
    </>
    );

})


//import { Html } from '@react-three/drei';
//import Button from '@mui/material/Button';
//import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';

//<Html>
//<Dialog open={open} onClose={handleClose}>
//    <DialogTitle>공공데이터 업로드</DialogTitle>
//    <DialogContent>
//    <DialogContentText>
//        {buildRef.current.name} 건물의 실내로 들어가겠습니까?
//    </DialogContentText>
//    </DialogContent>
//    <DialogActions>
//    <Button component="label">
//        실내 공간 작업 시작
//    </Button>
//    <Button onClick={handleClose}>취소</Button>
//    </DialogActions>
//</Dialog>
//</Html>