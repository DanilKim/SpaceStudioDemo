import { action, makeObservable, observable } from "mobx";

export class ModelStore {
    rootStore;

    model = {};

    constructor(root) {
        makeObservable(this, {
            model : observable,
            addModel : action
        })

        this.rootStore = root;

        this.model = { 'components': [], 'firstMed': null };

    }

    addModel (newModel) {
        this.model = { 'components' : [...this.model['components'], ...newModel['components']], 'firstMed' : newModel['firstMed'] }
    }

}
