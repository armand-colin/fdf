import { Camera } from "../camera/Camera"
import { Context } from "../Context"
import { Geometry } from "../Geometry"
import { Vec3 } from "../math/Vec3"
import { Shader } from "../Shader"
import { Material } from "./Material"

export class LineMaterial extends Material {

    protected readonly indexBuffer: WebGLBuffer

    protected readonly projectionLocation: WebGLUniformLocation | null
    protected readonly viewLocation: WebGLUniformLocation | null

    protected readonly positionLocation: GLint
    protected readonly positionBuffer: WebGLBuffer

    constructor(context: Context) {
        const shader = Shader.fromSource(context, vertex, fragment)
        if (!shader)
            throw new Error("Error while compiling shader")

        super(context, shader)

        // Get all locations
        this.projectionLocation = this.shader.getUniformLocation("u_projection")
        this.viewLocation = this.shader.getUniformLocation("u_view")
        this.positionLocation = this.shader.getAttributeLocation("a_position")

        this.indexBuffer = context.createBuffer()
        this.positionBuffer = context.createBuffer()
    }

    override draw(camera: Camera, geometry: Geometry): void {
        // Bind shader
        this.shader.bind()

        // Load camera data
        this.shader.setUniformMat4(this.projectionLocation, camera.projection)
        this.shader.setUniformMat4(this.viewLocation, camera.view)

        // Load indexBuffer
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        this.context.bufferData(
            this.context.ELEMENT_ARRAY_BUFFER,
            geometry.indices,
            this.context.STATIC_DRAW
        )

        // Load arrayBuffer
        this.context.enableVertexAttribArray(this.positionLocation)
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.positionBuffer)
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            geometry.positions,
            this.context.STATIC_DRAW
        )
        this.context.vertexAttribPointer(this.positionLocation, Vec3.size, this.context.FLOAT, false, 0, 0)

        // Draw elements
        const primitiveType = geometry.primitive
        const indexType = geometry.indexType
        const offset = 0
        const count = geometry.count

        this.context.lineWidth(1)

        this.context.drawElements(
            primitiveType,
            count,
            indexType,
            offset
        )
    }

}

const vertex = /*glsl*/`#version 300 es
 
uniform mat4 u_projection;
uniform mat4 u_view;
in vec4 a_position;
 
void main() {
    gl_Position = u_projection * u_view * a_position;
}
`

const fragment = /*glsl*/`#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
    // Just set the output to a constant reddish-purple
    outColor = vec4(1, 0, 0.5, 1);
}
`