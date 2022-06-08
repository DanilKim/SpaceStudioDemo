import { action, makeObservable, observable } from "mobx";
import * as THREE from 'three';

export class SceneStore {
  rootStore;

  scene = new THREE.Scene;

  constructor(root) {
    makeObservable(this, {
      scene : observable,
      setScene : action
    })

    this.rootStore = root;
  }

  setScene = (scene) => {
    this.scene = scene;
  }
}