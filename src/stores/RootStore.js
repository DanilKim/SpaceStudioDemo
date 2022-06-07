import { ModeStore } from "./ModeStore";
import { ControlStore } from "./ControlStore";
import { ModelStore } from "./ModelStore";
import { SidebarStore } from "./SidebarStore";
import { PortalStore } from "./PortalStore";
import { SceneStore } from "./SceneStore";

export class RootStore{
    ModeStore;
    ControlStore;
    ModelStore;
    SidebarStore;
    PortalStore;
    SceneStore;
    // 다른 Store들 여기에 계속 추가

    constructor() {
        this.ModeStore = new ModeStore(this);
        this.ControlStore = new ControlStore(this);
        this.ModelStore = new ModelStore(this);
        this.SidebarStore = new SidebarStore(this);
        this.PortalStore = new PortalStore(this);
        this.SceneStore = new SceneStore(this);
    }
}