import { action, makeObservable, observable } from "mobx";

class BuildingInfo {
    id;
    name;
    category;
    position;
    scale;
    floorShape;

    constructor(id, name, category, position, scale, floorShape) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.scale = scale;
        this.floorShape = floorShape;
    }
}

class AssetInfo {
    id;
    name;
    category;
    position;
    scale;

    constructor(id, name, category, position, scale) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.position = position;
        this.scale = scale;
    }
}

export class SidebarStore {
    rootStore;

    selected = false;
    building = null;
    asset = null;
    current = null; // [building, asset];
    distance = 1;
    var;
    cameraposition = [0, 5, 10];

    constructor(root) {
        makeObservable(this, {
            selected: observable,
            building: observable,
            asset: observable,
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

    selectBuilding = (id, name, category, position, scale, floorShape) => {
        this.selected = true;
        this.current = 'building';
        this.building = new BuildingInfo(id, name, category, position, scale, floorShape);
    }

    selectAsset = (id, name, category, position, scale) => {
        this.selected = true;
        this.current = 'asset';
        this.asset = new AssetInfo(id, name, category, position, scale);
    }

    unselect = () => {
        this.selected = false;
        this.current = null;
        this.building = null;
        this.asset = null;
    }

    distplayer = (val) => {
        this.distance = val
    }

    setcampos = (x, y, z) => {
        // this.cameraposition = val.toArray()
        this.cameraposition = [x, y, z];
    }

}
