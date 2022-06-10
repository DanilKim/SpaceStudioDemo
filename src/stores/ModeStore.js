import { action, makeObservable, observable } from "mobx";

export class ModeStore {
  rootStore;

  isEdit = false;
  isPlay = false;
  isRiding = false;
  indoorValue = 0;
  pauseState = false;

  constructor(root) {
    makeObservable(this, {
      isEdit: observable,
      isPlay: observable,
      isRiding: observable,
      indoorValue: observable,
      pauseState : observable,
      setIsEdit: action,
      pause : action,
      play : action,
      enterPm : action,
      exitPm : action,
      enterRm : action,
      exitRm: action,
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

  enterRm = () => {
    this.isRiding = true;
  }

  exitRm = () => {
    this.isRiding = false;
  }

  setIndoorValue = () => {
      this.indoorValue ? (this.indoorValue = 0) : (this.indoorValue = 1);
  }

}