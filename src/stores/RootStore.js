import { PlaymodeStore } from "./PlaymodeStore";
import { ControlStore } from "./ControlStore";
import { ModelStore } from "./ModelStore";
import { SidebarStore } from "./SidebarStore";

export class RootStore{
    PlaymodeStore;
    ControlStore;
    ModelStore;
    SidebarStore;
    // 다른 Store들 여기에 계속 추가

    constructor() {
        this.PlaymodeStore = new PlaymodeStore(this);
        this.ControlStore = new ControlStore(this);
        this.ModelStore = new ModelStore(this);
        this.SidebarStore = new SidebarStore(this);
    }
}