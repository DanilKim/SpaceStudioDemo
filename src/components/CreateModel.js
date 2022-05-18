import React from 'react';
import * as THREE from 'three';
import Building from './Objects/Building';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';

const heightAttr = "층수";
const heightFn = function (val) { return val }; // identity function
const max = 40;
const z_max = 200;
const z_rel = 0.07;
const r = 0;
const scale_x = 300;
const scale_y = 300;
const scale_factor = 0.0001;
const heightScaler = 0.03;

const translateLat = function (lat) {
    return (lat);
};
const translateLng = function (lng) {
    return (lng);
};

function addShape(shape, extrude, color, x, y, z, rx, ry, rz, s) {
    //console.log(shape, extrude*100);
    //Extrusion settings
    var extrudeSettings = {
        depth: extrude * 50,
        steps: 1,
        material: 0,
        extrudeMaterial: 1,
        bevelEnabled: false
    };

    //Create the geometry
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    //console.log(geometry)
    return geometry

}

function getMedianPoint(data) {
    var X = data.map(d => d[0]);
    var Y = data.map(d => d[1]);
    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    return [median(X), median(Y)];
}


export default async function CreateModel(city, objects, firstMed) {

    //console.log(city, objects);
    var json, json_road, json_water;

    var fast = false
    var geoms = [];
    var building_names = [];
    var building_types = [];
    var offsets = [];
    var geoms_water = [];
    var geoms_road = [];


    var shapeCount = 0, subset_size = 5000;
    var shapeCount_road = 0;
    var shapeCount_water = 0;
    var coordinate;
    var pallet = [["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#0100FF", "#5F00FF", "#FF00DD", "#FF007F", "#000000", "#FFFFFF"],
    ["#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF", "#DAD9FF", "#E8D9FF", "#FFD9FA", "#FFD9EC", "#F6F6F6", "#EAEAEA"],
    ["#FFA7A7", "#FFC19E", "#FFE08C", "#FAED7D", "#CEF279", "#B7F0B1", "#B2EBF4", "#B2CCFF", "#B5B2FF", "#D1B2FF", "#FFB2F5", "#FFB2D9", "#D5D5D5", "#BDBDBD"],
    ["#F15F5F", "#F29661", "#F2CB61", "#E5D85C", "#BCE55C", "#86E57F", "#5CD1E5", "#6799FF", "#6B66FF", "#A566FF", "#F361DC", "#F361A6", "#A6A6A6", "#8C8C8C"],
    ["#CC3D3D", "#CC723D", "#CCA63D", "#C4B73B", "#9FC93C", "#47C83E", "#3DB7CC", "#4374D9", "#4641D9", "#8041D9", "#D941C5", "#D9418C", "#747474", "#5D5D5D"],
    ["#980000", "#993800", "#997000", "#998A00", "#6B9900", "#2F9D27", "#008299", "#003399", "#050099", "#3F0099", "#990085", "#99004C", "#4C4C4C", "#353535"],
    ["#670000", "#662500", "#664B00", "#665C00", "#476600", "#22741C", "#005766", "#002266", "#030066", "#2A0066", "#660058", "#660033", "#212121", "#191919"]];


    async function getJsonAsync(file) {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        try {
            let response = await fetch(file, config);
            let data = await response.json();
            return data;
        } catch (err) {
            console.log("Json Fetch Error!!");
            console.error(err);
        }
    }


    function buildShape_building(data) {
        json = data;
        console.log("Building buildShape (" + shapeCount + "/" + json.features.length + ")");
        if (shapeCount < json.features.length) {
            var shapeSession = 0;
            for (var s = shapeCount; s < json.features.length && shapeSession < subset_size; s++) {
                shapeSession++;
                shapeCount++;
                var good = true;
                var points = [];
                //Check if the geometry has at least two coordinates
                if (json.features[s].properties.명칭 !== null && json.features[s].properties.종류 !== '무벽건물' && json.features[s].properties.종류 !== '가건물' && json.features[s].properties.종류 !== '기타' && json.features[s].properties.종류 !== '온실') {
                    for (var j = 0; j < json.features[s].geometry.coordinates.length; j++) {   // multipolygon 에서 각 polygon들 뽑아냄
                        if (json.features[s].geometry.coordinates[j].length < 1 || json.features[s].geometry.coordinates[j][0] < 1 || json.features[s].geometry.coordinates[j][0].length < 4) {
                            good = false;
                        } else {
                            for (var i = 0; i < json.features[s].geometry.coordinates[j][0].length; i++) {  // exterior ring만 고려되는 중.. (interior ring 무시)
                                coordinate = json.features[s].geometry.coordinates[j][0][i]	   // ploygon의 exterior ring
                                //Check for weird values
                                if (coordinate[0] && coordinate[1] && coordinate[0] > 0 && coordinate[1] > 0) {
                                    points.push(new THREE.Vector2(translateLat(coordinate[0]), translateLng(coordinate[1])));

                                }
                                else {
                                    good = false;
                                }
                            }
                        }
                    }
                }
                else {
                    good = false;
                }

                //If the geometry is safe, continue
                if (good) {

                    //Calculate the height of the current geometry for extrusion
                    var h = heightFn(json.features[s].properties[heightAttr]);
                    if (isNaN(parseFloat(json.features[s].properties[heightAttr]))) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (!h || h < 0) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (h > max) {
                        h = max;
                    }

                    //Remove all objects that have no height information for faster rendering
                    if (h === 0 && fast) {
                        good = false;
                    }
                }

                //If the geometry is still safe, continue
                if (good) {

                    //Calculate the third dimension
                    var z = h//((h/max)*z_max);
                    if (!z || z < 1) { z = 0; }

                    var geom = addShape(new THREE.Shape(points), z * z_rel, null, 0, 50, 0, r, 0, 0, 1);
                    geom.computeBoundingBox();
                    geom.rotateX(-0.5 * Math.PI);
                    var offset = geom.boundingBox.getCenter(new THREE.Vector3());
                    offsets.push([offset.x, offset.z]);
                    geoms.push(geom.translate(-offset.x, 0, -offset.z));

                    //geoms.push(addShape( new THREE.Shape( points ), z*z_rel, null, 0, 50, 0, r, 0, 0, 1 ))
                    building_names.push(json.features[s].properties.명칭)
                    building_types.push(json.features[s].properties.용도)
                }
            }
        }
        return geoms
    }


    function buildShape_road(data) {
        json_road = data;
        console.log("Road buildShape (" + shapeCount_road + "/" + json_road.features.length + ")");
        if (shapeCount_road < json_road.features.length) {
            var shapeSession = 0;
            for (var s = shapeCount_road; s < json_road.features.length && shapeSession < subset_size; s++) {
                shapeSession++;
                shapeCount_road++;
                var good = true;
                var points = [];
                //Check if the geometry has at least two coordinates

                for (var j = 0; j < json_road.features[s].geometry.coordinates.length; j++) {   // multipolygon 에서 각 polygon들 뽑아냄
                    if (json_road.features[s].geometry.coordinates[j].length < 1 || json_road.features[s].geometry.coordinates[j][0] < 1 || json_road.features[s].geometry.coordinates[j][0].length < 4) {
                        good = false;
                    } else {
                        for (var i = 0; i < json_road.features[s].geometry.coordinates[j][0].length; i++) {  // exterior ring만 고려되는 중.. (interior ring 무시)
                            coordinate = json_road.features[s].geometry.coordinates[j][0][i]	   // ploygon의 exterior ring
                            //Check for weird values
                            if (coordinate[0] && coordinate[1] && coordinate[0] > 0 && coordinate[1] > 0) {
                                points.push(new THREE.Vector2(translateLat(coordinate[0]), translateLng(coordinate[1])));
                            }
                            else {
                                good = false;
                            }
                        }
                    }
                }

                //If the geometry is safe, continue
                if (good) {

                    //Calculate the height of the current geometry for extrusion
                    var h = heightFn(json_road.features[s].properties[heightAttr]);
                    if (isNaN(parseFloat(json_road.features[s].properties[heightAttr]))) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (!h || h < 0) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (h > max) {
                        h = max;
                    }

                    //Remove all objects that have no height information for faster rendering
                    if (h === 0 && fast) {
                        good = false;
                    }
                }

                //If the geometry is still safe, continue
                if (good) {

                    //Calculate the third dimension
                    var z = ((h / max) * z_max);
                    //console.console.log(h, max, z_max, z);
                    if (!z || z < 1) { z = 0; }

                    //Calculate the color of the object
                    //In this sample code we use a blue to red range to visualize the height of the object (blue short to red tall)

                    var geom = addShape(new THREE.Shape(points), 0, null, 0, 50, 0, r, 0, 0, 1);

                    geoms_road.push(geom);


                }
            }
        }
        return geoms_road
    }


    function buildShape_water(data) {
        json_water = data;
        console.log("Road buildShape (" + shapeCount_water + "/" + json_water.features.length + ")");
        if (shapeCount_water < json_water.features.length) {
            var shapeSession = 0;
            for (var s = shapeCount_water; s < json_water.features.length && shapeSession < subset_size; s++) {
                shapeSession++;
                shapeCount_water++;
                var good = true;
                var points = [];
                //Check if the geometry has at least two coordinates

                for (var j = 0; j < json_water.features[s].geometry.coordinates.length; j++) {   // multipolygon 에서 각 polygon들 뽑아냄
                    if (json_water.features[s].geometry.coordinates[j].length < 1 || json_water.features[s].geometry.coordinates[j][0] < 1 || json_water.features[s].geometry.coordinates[j][0].length < 4) {
                        good = false;
                    } else {
                        for (var i = 0; i < json_water.features[s].geometry.coordinates[j][0].length; i++) {  // exterior ring만 고려되는 중.. (interior ring 무시)
                            coordinate = json_water.features[s].geometry.coordinates[j][0][i]	   // ploygon의 exterior ring
                            //Check for weird values
                            if (coordinate[0] && coordinate[1] && coordinate[0] > 0 && coordinate[1] > 0) {
                                points.push(new THREE.Vector2(translateLat(coordinate[0]), translateLng(coordinate[1])));
                            }
                            else {
                                good = false;
                            }
                        }
                    }
                }

                //If the geometry is safe, continue
                if (good) {

                    //Calculate the height of the current geometry for extrusion
                    var h = heightFn(json_water.features[s].properties[heightAttr]);
                    if (isNaN(parseFloat(json_water.features[s].properties[heightAttr]))) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (!h || h < 0) {
                        if (fast) {
                            good = false;
                        }
                        h = 0;
                    }

                    if (h > max) {
                        h = max;
                    }

                    //Remove all objects that have no height information for faster rendering
                    if (h === 0 && fast) {
                        good = false;
                    }
                }

                //If the geometry is still safe, continue
                if (good) {

                    //Calculate the third dimension
                    var z = ((h / max) * z_max);
                    //console.console.log(h, max, z_max, z);
                    if (!z || z < 1) { z = 0; }

                    //Calculate the color of the object
                    //In this sample code we use a blue to red range to visualize the height of the object (blue short to red tall)

                    var geom = addShape(new THREE.Shape(points), 0, null, 0, 50, 0, r, 0, 0, 1);

                    geoms_water.push(geom);
                }
            }
        }
        return geoms_water
    }


    function Add_building(data) {
        //[active, setActive] = useState(false);
        //[ref, setRef] = useState(null);
        //
        //const handleHover = (event) => {
        //
        //}

        var geom_total = buildShape_building(data);
        var groups_by_types = [];

        if (!firstMed) {
            var med = getMedianPoint(offsets);
            firstMed = med;
        } else {
            var med = firstMed;
        }

        const set = new Set(building_types);
        const types = [...set];
        for (var i = 0; i < types.length; i++) {
            groups_by_types.push([]);
        }

        // add each of the buildings
        for (var g = 0; g < geom_total.length; g++) {
            //buildRef = useRef();
            var color_idx = types.indexOf(building_types[g])
            const material = new THREE.MeshPhongMaterial({ color: pallet[0][color_idx] });

            var offset = offsets[g];

            groups_by_types[color_idx].push(
                <Building
                    key={city+'_'+g}
                    id={city+'_'+g}
                    category={building_types[g]}
                    geometry={geom_total[g]}
                    color={pallet[0][color_idx]}
                    position={[scale_factor * scale_x * (offset[0] - med[0]), 0, scale_factor * scale_y * (offset[1] - med[1])]}
                    scale={[scale_factor * scale_x, heightScaler, scale_factor * scale_y]}
                    name={building_names[g]}
                />
            )

            //groups_by_types[color_idx].push(
            //    <mesh
            //        key={g}
            //        geometry={geom_total[g]}
            //        material={material}
            //        position={[scale_factor * scale_x * (offset[0] - med[0]), 0, scale_factor * scale_y * (offset[1] - med[1])]}
            //        scale={[scale_factor * scale_x, heightScaler, scale_factor * scale_y]}
            //        name={building_names[g]}
            //        castShadow={true}
            //        receiveShadow={true}
            //        onClick={() => console.log("click!")}
            //    />
            //);
        }

        return (
            <React.Fragment key={data.name}>
                {types.map((g, id) => (
                    <group key={"group" + String(id)}>
                        {
                            groups_by_types[id].map((m) => (
                                m
                            ))
                        }
                    </group>
                ))}
            </React.Fragment>
        )
    }


    function Add_road(data) {
        var geom_total_road = buildShape_road(data);

        // add road
        const material_road = new THREE.MeshPhongMaterial({ color: 0x121526 });
        // ----------------- three.js < 0.125.0 ------------------- //
        //const merged_mesh_road = new THREE.BufferGeometry();
        //for (var i = 0; i < geom_total_road.length + 0; i++) {
        //    merged_mesh_road.merge(geom_total_road[i]);
        //}


        // ----------------- three >= 0.125.0 ------------------- //
        const merged_mesh_road = BufferGeometryUtils.mergeBufferGeometries(geom_total_road, true); // 도로 각각의 geometry를 하나로 합치는 과정

        merged_mesh_road.computeBoundingBox();
        merged_mesh_road.rotateX(-0.5 * Math.PI);
        var offset_road = merged_mesh_road.boundingBox.getCenter(new THREE.Vector3());
        merged_mesh_road.translate(-offset_road.x, 0, -offset_road.z);

        //var mesh_road = new THREE.Mesh(merged_mesh_road, material_road);
        if (!firstMed) {
            var med = [offset_road.x, offset_road.z];
            firstMed = med;
        } else {
            var med = firstMed;
        }

        //mesh_road.position.set( scale_factor * scale_x * (offset_road.x - med[0]), 0, scale_factor * scale_y * (offset_road.z - med[1]));
        //mesh_road.scale.set(scale_factor * scale_x , heightScaler, scale_factor * scale_y);
        //
        //mesh_road.name = city + ' road';
        //mesh_road.castShadow = true;
        //mesh_road.receiveShadow = true;
        return (
            <mesh
                key={data.name}
                geometry={merged_mesh_road}
                material={material_road}
                position={[scale_factor * scale_x * (offset_road.x - med[0]), 0, scale_factor * scale_y * (offset_road.z - med[1])]}
                scale={[scale_factor * scale_x, heightScaler, scale_factor * scale_y]}
                name={city + ' road'}
                castShadow={true}
                receiveShadow={true}
            />
        )

    }

    function Add_water(data) {
        var geom_total_water = buildShape_water(data);

        // add river
        const material_water = new THREE.MeshPhongMaterial({ color: 0x0AC9FF });
        // ----------------- three.js < 0.125.0 ------------------- //
        //const merged_mesh_water = new THREE.Geometry();
        //for (var i = 0; i < geom_total_water.length; i++) {
        //    merged_mesh_water.merge(geom_total_water[i]);
        //}
//
        // ----------------- three >= 0.125.0 사용가능 ------------------- //
        const merged_mesh_water = BufferGeometryUtils.mergeBufferGeometries(geom_total_water, true); // 강 각각의 geometry를 하나로 합치는 과정

        merged_mesh_water.computeBoundingBox();
        merged_mesh_water.rotateX(-0.5 * Math.PI);
        var offset_water = merged_mesh_water.boundingBox.getCenter(new THREE.Vector3());
        merged_mesh_water.translate(-offset_water.x, 0, -offset_water.z);

        //var mesh_water = new THREE.Mesh(merged_mesh_water, material_water);
        if (!firstMed) {
            var med = [offset_water.x, offset_water.z];
            firstMed = med;
        } else {
            var med = firstMed;
        }

        return (
            <mesh
                key={data.name}
                geometry={merged_mesh_water}
                material={material_water}
                position={[scale_factor * scale_x * (offset_water.x - med[0]), 0, scale_factor * scale_y * (offset_water.z - med[1])]}
                scale={[scale_factor * scale_x, heightScaler, scale_factor * scale_y]}
                name={city + ' river'}
                castShadow={true}
                receiveShadow={true}
            />
        )

    }


    //var jsonFile = "http://192.168.153.97:8888/" + String(city) + "/building";// + String(city) + "_building.geojson"
    var jsonFile = "../../data/" + String(city) + "_building.geojson"
    var jsonFile_road = "../../data/" + String(city) + "_road.geojson"
    var jsonFile_water = "../../data/" + String(city) + "_water.geojson"

    var render_list = [];

    await (async () => {
        for await (const object of objects) {

            if (object === '건물') {
                const data = await getJsonAsync(jsonFile);
                render_list.push(Add_building(data));
            } else if (object === '도로') {
                const data = await getJsonAsync(jsonFile_road);
                render_list.push(Add_road(data));
            } else if (object === '강') {
                const data = await getJsonAsync(jsonFile_water);
                render_list.push(Add_water(data));
            }
        }

    })()

    return ({
        'components': render_list,
        'firstMed': firstMed
    });

}