import { Camera } from "../camera/Camera"
import { Geometry } from "../Geometry"
import { Shader } from "../Shader"

export abstract class Material {

    constructor(protected readonly shader: Shader) {
        shader.bind()
    }

    abstract draw(camera: Camera, geometry: Geometry): void

}