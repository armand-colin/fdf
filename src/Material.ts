import { Camera } from "./camera/Camera";
import { Shader } from "./Shader";

export class Material {

    constructor(protected shader: Shader) {
    }

    load(camera: Camera) {
        // Loads the shader, this the adapted parameters
    }

}