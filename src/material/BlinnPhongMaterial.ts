import { Camera } from "../camera/Camera";
import { Geometry } from "../geometry/Geometry";
import { GL } from "../GL";
import { Color } from "../math/Color";
import { Vec3 } from "../math/Vec3";
import { Shader } from "../Shader";
import { Material } from "./Material";

type State = {
    color: Color
}

export class BlinnPhongMaterial extends Material<State> {

    override readonly name = "Blinn Phong"

    protected readonly positionLocation: GLint
    protected readonly positionBuffer: WebGLBuffer

    protected readonly indexBuffer: WebGLBuffer

    protected readonly projectionLocation: WebGLUniformLocation | null
    protected readonly viewLocation: WebGLUniformLocation | null
    protected readonly colorLocation: WebGLUniformLocation | null

    constructor() {
        const shader = Shader.fromSource(vertex, fragment)
        if (!shader)
            throw new Error('Error while loading blinn phong shader')

        super(shader)

        this.positionLocation = this.shader.getAttributeLocation("a_position")
        this.positionBuffer = GL.createBuffer()

        this.indexBuffer = GL.createBuffer()

        this.projectionLocation = this.shader.getUniformLocation("u_projection")
        this.viewLocation = this.shader.getUniformLocation("u_view")
        this.colorLocation = this.shader.getUniformLocation("u_color")
    }

    protected override makeState(): State {
        return {
            color: Color.red()
        }
    }

    override draw(camera: Camera, geometry: Geometry): void {
        // Bind shader
        this.shader.bind()

        // Load camera data
        this.shader.setUniform(this.projectionLocation, camera.projection.matrix)
        this.shader.setUniform(this.viewLocation, camera.view)
        this.shader.setUniform(this.colorLocation, this.state.color)

        // Load indexBuffer
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        GL.bufferData(
            GL.ELEMENT_ARRAY_BUFFER,
            geometry.mesh.indices,
            GL.STATIC_DRAW
        )

        // Load positions
        GL.enableVertexAttribArray(this.positionLocation)
        GL.bindBuffer(GL.ARRAY_BUFFER, this.positionBuffer)
        GL.bufferData(
            GL.ARRAY_BUFFER,
            geometry.mesh.positions,
            GL.STATIC_DRAW
        )
        GL.vertexAttribPointer(this.positionLocation, Vec3.size, GL.FLOAT, false, 0, 0)

        // Draw elements
        const primitiveType = geometry.primitive
        const indexType = geometry.indexType
        const offset = 0
        const count = geometry.count

        GL.drawElements(
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
precision highp float;
 
uniform vec4 u_color;

out vec4 outColor;
 
void main() {
    outColor = u_color;
}
`