import { nanoid } from "nanoid";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";
import { Emitter } from "@niloc/utils";
import { useObjectField } from "./hooks/useObjectField";
import { Transform } from "./Transform";

export class Object extends Emitter<{ change: void }> {

    readonly id = nanoid()

    name: string

    geometry: Geometry
    material: Material

    private _enabled = true

    readonly transform = new Transform()

    constructor(opts: {
        geometry: Geometry,
        material: Material,
        name?: string
    }) {
        super()
        this.geometry = opts.geometry
        this.material = opts.material
        this.name = opts.name ?? "Object"
    }

    get enabled() {
        return this._enabled
    }
    set enabled(value: boolean) {
        this._enabled = value
        this.emit('change', undefined)
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: object => ({
                enabled: object._enabled
            }),
            emitter: this as Object,
            event: "change"
        })
    }
}