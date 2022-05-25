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
    // const { camera } = useThree();

    // const modalEl = useRef();
    // const [isOpen, setOpen] = useState(false);
    // const handleClickOutside = ({ target }) => {
    //     if (isOpen && !modalEl.current.contains(target)) setOpen(false);
    // };
    // useEffect(() => {
    //     window.addEventListener("click", handleClickOutside);
    //     return () => {
    //         window.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // const colorMap = useLoader(TextureLoader, 'building_texture.png')
    // const colorMap = useTexture('BT.jpg')

    var velocity = 0;

    const handleClick = useCallback((event) => {
        event.stopPropagation();

        SidebarStore.select(
            buildRef.current.userData.id,
            buildRef.current.buildingname,
            buildRef.current.userData.category,
            buildRef.current.position,
            buildRef.current.scale,
            getFloorShape(buildRef.current.geometry)
        )
        // event.stopPropagation();
        SidebarStore.setcampos(buildRef.current.position.x, buildRef.current.position.y, buildRef.current.position.z);

        // handleChange = ({ target: { value } }) => SidebarStore.distplayer(value);
        //alert(buildRef.current.name);
        //setOpen(true);
    }, []);

    // const handleClose = useCallback((event) => {
    //     event.stopPropagation();
    //     SidebarStore.unselect()
    //     //setOpen(false);
    // }, []);

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
            }}
            onClick={handleClick}
        >
            <meshStandardMaterial
                attach="material"
                // color={props.color}
                color={active ? "hotpink" : props.color}
            // map={active ? colorMap : null}
            // map={colorMap}
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