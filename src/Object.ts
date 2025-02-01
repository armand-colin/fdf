import { nanoid } from "nanoid";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";

export class Object {

    readonly id = nanoid()
    name = "Object"
     
    constructor(
        public geometry: Geometry,
        public material: Material
    ) { }

}