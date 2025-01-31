import { Emitter } from "@niloc/utils"
import { Mat4 } from "../math/Mat4"
import { Vec3 } from "../math/Vec3"
import { Projection } from "./Projection"
import { useObjectField } from "../hooks/useObjectField"

export class Camera extends Emitter<{ change: void }> { 

    readonly position = new Vec3()
    readonly rotation = new Vec3()

    readonly view = Mat4.identity()

    private _projection: Projection

    constructor(projection: Projection) {
        super()
        this._projection = projection
    }

    update() {
        const temp = new Mat4()

        this.view.identity()
        this.view.rotate(this.rotation.inverse(), temp)
        this.view.translate(this.position.inverse(), temp)

        this.projection.update()
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