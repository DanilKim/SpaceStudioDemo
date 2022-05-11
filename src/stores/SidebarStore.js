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

export class SidebarStore {
    rootStore;

    selected = false;
    building = null;
    distance = 1;
    var;
    cameraposition = [0, 5, 10];

    constructor(root) {
        makeObservable(this, {
            selected: observable,
            building: observable,
            select: action,
            unselect: action,
            distance: observable,
            distplayer: action,
            cameraposition: observable,
            setcampos: action

        })

        this.rootStore = root;
    }

    select = (id, name, category, position, scale, floorShape) => {
        this.selected = true;
        this.building = new BuildingInfo(id, name, category, position, scale, floorShape);
    }

    unselect = () => {
        this.selected = false;
        this.building = null;
    }

    distplayer = (val) => {
        this.distance = val
    }

    setcampos = (x, y, z) => {
        // this.cameraposition = val.toArray()
        this.cameraposition = [x, y, z];
    }

}
