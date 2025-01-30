import { Object } from "./Object";

export class Scene {

    public objects: Object[] = []

    constructor() {

    }

    add(object: Object) {
        this.objects.push(object)
    }

}