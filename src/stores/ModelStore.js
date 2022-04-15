import { action, makeObservable, observable } from "mobx";

export class ModelStore {
    rootStore;

    model = [];
    firstMed = null;

    constructor(root) {
        makeObservable(this, {
            model : observable,
            addModel : action,
        })

        this.rootStore = root;
    }

    addModel = (newModel) => {
        this.model = [...this.model, ...newModel['components']];
        this.firstMed = newModel['firstMed'];
    }

}
