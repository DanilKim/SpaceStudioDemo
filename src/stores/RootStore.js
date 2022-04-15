import { PlaymodeStore } from "./PlaymodeStore";
import { ControlStore } from "./ControlStore";
import { ModelStore } from "./ModelStore";

export class RootStore{
    PlaymodeStore;
    ControlStore;
    ModelStore;
    // 다른 Store들 여기에 계속 추가

    constructor() {
        this.PlaymodeStore = new PlaymodeStore(this);
        this.ControlStore = new ControlStore(this);
        this.ModelStore = new ModelStore(this);
    }
}