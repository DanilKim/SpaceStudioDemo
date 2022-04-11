import { PlaymodeStore } from "./PlaymodeStore";
import { ControlStore } from "./ControlStore";

export class RootStore{
    PlaymodeStore;
    ControlStore;
    // 다른 Store들 여기에 계속 추가

    constructor() {
        this.PlaymodrStore = new PlaymodeStore(this);
        this.ControlStore = new ControlStore(this);
    }
}