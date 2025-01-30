import { Geometry } from "./Geometry";
import { Material } from "./Material";

export class Object {

    constructor(
        public geometry: Geometry,
        public material: Material
    ) { }

}