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

    constructor(root) {
        makeObservable(this, {
            selected: observable,
            building: observable,
            select: action,
            unselect: action
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

}
