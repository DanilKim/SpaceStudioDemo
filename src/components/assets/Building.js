import { useFrame } from '@react-three/fiber';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import { Vector2, Color, ExtrudeBufferGeometry, Shape } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';


function dummyBuilding() {
    let points = [];

    points.push(new Vector2(-10,-5));
    points.push(new Vector2(-10,5));
    points.push(new Vector2(10,5));
    points.push(new Vector2(10,-5));
    points.push(new Vector2(-10,-5));

    const geom = new ExtrudeBufferGeometry(new Shape(points), {
        depth: 40,
        steps: 1,
        material: 0,
        extrudeMaterial: 1,
        bevelEnabled: false
    }).rotateX(-0.5 * Math.PI);

    var geometry = BufferGeometryUtils.mergeBufferGeometries([geom], true);
    geometry.userData.shapes = geom.parameters.shapes;
    geometry.userData.options = geom.parameters.options;

    return geometry;
}


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
    const { SidebarStore, ModeStore } = useStores();

    const buildRef = useRef();
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

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
        );
 
        // SidebarStore.setcampos(buildRef.current.position.x, buildRef.current.position.y, buildRef.current.position.z)

    }, []);

    useEffect( () => {
        if (selected) {
            //buildRef.current.position.y = 0;
            buildRef.current.material.color = new Color("#48B108");
        } else {
            buildRef.current.material.color = active ? new Color('hotpink') : new Color(props.color);
        }
    }, [selected, active])

    useFrame( (_, delta) => {
        if (selected) {
            SidebarStore.update3D(
                buildRef.current.position,
                buildRef.current.rotation,
                buildRef.current.scale,
            )
        }
    })

    return (<>
        <mesh
            key={props.id}
            ref={buildRef}
            userData={{id:props.id, category:props.category}}
            geometry={props.geometry ? props.geometry : dummyBuilding()}
            position={props.position ? props.position : [0,0,0]}
            scale={props.scale ? props.scale : [0.3, 0.3, 0.3]}
            buildingname={props.name}
            name={props.id}
            castShadow
            receiveShadow
            onPointerOver={(event) => {
                event.stopPropagation();
                if (!ModeStore.isPlay) { setActive(true); };
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                if (!ModeStore.isPlay) { setActive(false); };
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