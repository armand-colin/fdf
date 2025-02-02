import { Emitter } from "@niloc/utils"
import { Projection } from "./Projection"
import { useObjectField } from "../hooks/useObjectField"
import { Transform } from "../Transform"

export class Camera extends Emitter<{ change: void }> { 

    readonly transform = new Transform()

    private _projection: Projection

    constructor(projection: Projection) {
        super()
        this._projection = projection
    }

    update() {
        this.projection.update()
    }

    get view()  {
        return this.transform.inverseMatrix
    }

    useProjection() {
        return useObjectField({
            object: this,
            accessor: camera => camera._projection,
            emitter: this as Camera,
            event: "change"
        })
    }

    get projection() {
        return this._projection
    }
    set projection(projection: Projection) {
        this._projection = projection
        this.emit("change", undefined)
    }

}