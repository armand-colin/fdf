import { Emitter } from "@niloc/utils";
import { SceneObject } from "./SceneObject";
import { useObjectField } from "./hooks/useObjectField";

export class Scene extends Emitter<{ change: void }> {

    private _objects: SceneObject[] = []

    constructor() {
        super()
    }

    get objects() {
        return this._objects
    }

    add(object: SceneObject) {
        this._objects.push(object)
        this.emit('change', undefined)
    }

    remove(object: SceneObject) {
        const index = this._objects.indexOf(object)
        if (index ===-1)
            return
        this._objects.splice(index, 1)
        this.emit('change', undefined)
    }

    useObjects() {
        return useObjectField({
            object: this,
            accessor: scene => [...scene._objects],
            emitter: this as Scene,
            event: "change"
        })
    }

}