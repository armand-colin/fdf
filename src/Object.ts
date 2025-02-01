import { nanoid } from "nanoid";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";

export class Object {

    readonly id = nanoid()

    name: string

    geometry: Geometry
    material: Material

    enabled: boolean = true

    constructor(opts: {
        geometry: Geometry,
        material: Material,
        name?: string
    }) {
        this.geometry = opts.geometry
        this.material = opts.material
        this.name = opts.name ?? "Object"
    }

}