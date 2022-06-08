import { action, makeObservable, observable } from "mobx";

export class ModeStore {
  rootStore;

  isEdit = false;
  isPlay = false;
  indoorValue = 0;
  pauseState = false;

  constructor(root) {
    makeObservable(this, {
      isEdit: observable,
      isPlay: observable,
      indoorValue: observable,
      pauseState : observable,
      setIsEdit: action,
      pause : action,
      play : action,
      enterPm : action,
      exitPm : action,
      setIndoorValue: action
    })

    this.rootStore = root;
  }

  setIsEdit = (bool) => {
      this.isEdit = bool;
  }

  pause = () => {
      this.pauseState = true;
  };

  play = () => {
      this.pauseState = false;
  };

  enterPm = () => {
      this.isPlay = true;
  };

  exitPm = () => {
      this.isPlay = false;
  };

  setIndoorValue = () => {
      this.indoorValue ? (this.indoorValue = 0) : (this.indoorValue = 1);
  }

}