import { useFrame } from '@react-three/fiber';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import { Vector2, Color } from 'three';

function getFloorShape(geometry) {
    const lineCurves = geometry.userData.shapes.curves;

    // compute mean vector
    let avg = new Vector2(0, 0);
    lineCurves.forEach(line => {
        avg.add(line.v1);
    })
    avg.divideScalar(lineCurves.length);

    let lineSegments = [];
    lineCurves.forEach(line => {
        lineSegments.push([
            new Vector2(line.v1.x - avg.x, line.v1.y - avg.y),
            new Vector2(line.v2.x - avg.x, line.v2.y - avg.y)
        ]);
    })
    return lineSegments;
};

export default observer((props) => {
    const { SidebarStore, PlaymodeStore } = useStores();

    const buildRef = useRef();
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

    var velocity = 0;

    const handleClick = useCallback((event) => {
        event.stopPropagation();

        setSelected(true);
        SidebarStore.selectBuilding(
            buildRef.current.userData.id,
            buildRef.current.buildingname,
            buildRef.current.userData.category,
            buildRef.current.position,
            buildRef.current.rotation,
            buildRef.current.scale,
            getFloorShape(buildRef.current.geometry)
        )
 
        // SidebarStore.setcampos(buildRef.current.position.x, buildRef.current.position.y, buildRef.current.position.z)

    }, []);

    //useFrame((_, delta) => {
    //    if (!selected) {
    //        if (active) {
    //            if (buildRef.current.position.y < 0.01) {
    //                velocity = 2;
    //            } else {
    //                velocity -= 0.1;
    //            }
    //            buildRef.current.position.y += velocity * delta;
    //        } else {
    //            buildRef.current.position.y = 0;
    //            velocity = 0;
    //        }
    //    } else {
    //        buildRef.current.position.y = 0;
    //    }
    //})

    useEffect( () => {
        if (selected) {
            //buildRef.current.position.y = 0;
            buildRef.current.material.color = new Color("#48B108");
        } else {
            buildRef.current.material.color = active ? new Color('hotpink') : new Color(props.color);
        }
    }, [selected, active])

    return (<>
        <mesh
            key={props.id}
            ref={buildRef}
            userData={{id:props.id, category:props.category}}
            geometry={props.geometry}
            position={props.position}
            scale={props.scale}
            buildingname={props.name}
            name={props.id}
            castShadow
            receiveShadow
            onPointerOver={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) { setActive(true); };
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) { setActive(false); };
            }}
            onPointerMissed={(event) => {
                event.stopPropagation();
                SidebarStore.unselect();
                setSelected(false);
            }}
            onClick={handleClick}
        >  
            <meshStandardMaterial
                attach="material"
                color={props.color}
                //map={active ? colorMap : null}
                //map={colorMap}
            />
        </mesh>

    </>
    );

})

/* <meshStandardMaterial
    attach="material"
    // color={props.color}
    color={active ? "hotpink" : props.color}
// map={active ? colorMap : null}
// map={colorMap}
/> */

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