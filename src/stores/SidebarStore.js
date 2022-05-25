import { action, makeObservable, observable } from "mobx";

class BuildingInfo {
    id;
    name;
    category;
    position;
    rotation;
    scale;
    floorShape;

    constructor(id, name, category, position, rotation, scale, floorShape) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.floorShape = floorShape;
    }
}

class AssetInfo {
    id;
    name;
    category;
    position;
    rotation;
    scale;

    constructor(id, name, category, position, rotation, scale) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}

export class SidebarStore {
    rootStore;

    selected = false;
    item = null;
    current = ''; // [building, asset];
    distance = 1;
    var;
    cameraposition = [0, 5, 10];

    constructor(root) {
        makeObservable(this, {
            selected: observable,
            item: observable,
            current: observable,
            selectBuilding: action,
            selectAsset: action,
            unselect: action,
            distance: observable,
            distplayer: action,
            cameraposition: observable,
            setcampos: action

        })

        this.rootStore = root;
    }

    selectBuilding = (id, name, category, position, rotation, scale, floorShape) => {
        this.selected = true;
        this.current = 'building';
        this.item = new BuildingInfo(id, name, category, position, rotation, scale, floorShape);
    }

    selectAsset = (id, name, category, position, rotation, scale) => {
        this.selected = true;
        this.current = 'asset';
        this.item = new AssetInfo(id, name, category, position, rotation, scale);
    }

    unselect = () => {
        this.selected = false;
        this.current = '';
        this.item = null;
    }

    distplayer = (val) => {
        this.distance = val
    }

    setcampos = (x, y, z) => {
        // this.cameraposition = val.toArray()
        this.cameraposition = [x, y, z];
    }

}
