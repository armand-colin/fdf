import { Camera } from "../camera/Camera"
import { Context } from "../Context"
import { Geometry } from "../Geometry"
import { Shader } from "../Shader"

export abstract class Material {

    constructor(
        protected readonly context: Context,
        protected readonly shader: Shader
    ) {
        shader.bind()
    }

    abstract draw(camera: Camera, geometry: Geometry): void

}