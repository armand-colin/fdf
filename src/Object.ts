import { Geometry } from "./Geometry";
import { Material } from "./material/Material";

export class Object {

    constructor(
        public geometry: Geometry,
        public material: Material
    ) { }

}