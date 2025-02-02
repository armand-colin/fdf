import { nanoid } from "nanoid";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";
import { Emitter } from "@niloc/utils";
import { useObjectField } from "./hooks/useObjectField";
import { Transform } from "./Transform";

export class SceneObject extends Emitter<{ change: void }> {

    readonly id = nanoid()

    name: string

    private _geometry: Geometry | null
    private _material: Material | null
    private _enabled = true

    readonly transform = new Transform()

    constructor(opts?: {
        geometry?: Geometry,
        material?: Material,
        name?: string
    }) {
        super()
        this._geometry = opts?.geometry ?? null
        this._material = opts?.material ?? null
        this.name = opts?.name ?? "Object"
    }

    get enabled() { return this._enabled }
    set enabled(value: boolean) {
        this._enabled = value
        this.emit('change', undefined)
    }

    get material() { return this._material }
    set material(material: Material | null) {
        this._material = material
        this.emit('change', undefined)
    }

    get geometry() { return this._geometry }
    set geometry(geometry: Geometry | null) {
        this._geometry = geometry
        this.emit('change', undefined)
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: object => ({
                enabled: object._enabled,
                geometry: this._geometry,
                material: this._material
            }),
            emitter: this as SceneObject,
            event: "change"
        })
    }
}