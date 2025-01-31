import { nanoid } from "nanoid";
import { Geometry } from "./Geometry";
import { Material } from "./material/Material";

export class Object {

    readonly id = nanoid()
    name = "Object"
     
    constructor(
        public geometry: Geometry,
        public material: Material
    ) { }

}