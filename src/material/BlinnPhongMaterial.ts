import { Camera } from "../camera/Camera";
import { Geometry } from "../geometry/Geometry";
import { GL } from "../GL";
import { Color } from "../math/Color";
import { Vec3 } from "../math/Vec3";
import { Shader } from "../Shader";
import { Transform } from "../Transform";
import { Material } from "./Material";

type State = {
    color: Color,
    lightDirection: Vec3,

}

export class BlinnPhongMaterial extends Material<State> {

    override readonly name = "Blinn Phong"

    protected readonly positionLocation: GLint
    protected readonly positionBuffer: WebGLBuffer
    
    protected readonly normalLocation: GLint
    protected readonly normalBuffer: WebGLBuffer

    protected readonly indexBuffer: WebGLBuffer

    protected readonly projectionLocation: WebGLUniformLocation | null
    protected readonly viewLocation: WebGLUniformLocation | null
    protected readonly modelLocation: WebGLUniformLocation | null

    protected readonly colorLocation: WebGLUniformLocation | null
    protected readonly lightDirectionLocation: WebGLUniformLocation | null

    constructor() {
        const shader = Shader.fromSource(vertex, fragment)
        if (!shader)
            throw new Error('Error while loading blinn phong shader')

        super(shader)

        this.positionLocation = this.shader.getAttributeLocation("a_position")
        this.positionBuffer = GL.createBuffer()

        this.normalLocation = this.shader.getAttributeLocation("a_normal")
        this.normalBuffer = GL.createBuffer()

        this.indexBuffer = GL.createBuffer()

        this.projectionLocation = this.shader.getUniformLocation("u_projection")
        this.viewLocation = this.shader.getUniformLocation("u_view")
        this.modelLocation = this.shader.getUniformLocation("u_model")

        this.colorLocation = this.shader.getUniformLocation("u_color")
        this.lightDirectionLocation = this.shader.getUniformLocation("u_light_direction")
    }

    protected override makeState(): State {
        return {
            color: Color.red(),
            lightDirection: new Vec3(0.3, 1, 0.4)
        }
    }

    override draw(camera: Camera, transform: Transform, geometry: Geometry): void {
        // Bind shader
        this.shader.bind()

        // Load camera data
        this.shader.setUniform(this.projectionLocation, camera.projection.matrix)
        this.shader.setUniform(this.viewLocation, camera.view)
        this.shader.setUniform(this.modelLocation, transform.matrix)
        this.shader.setUniform(this.colorLocation, this.state.color)
        this.shader.setUniform(this.lightDirectionLocation, this.state.lightDirection.normalized())

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

        // Load normals
        GL.enableVertexAttribArray(this.normalLocation)
        GL.bindBuffer(GL.ARRAY_BUFFER, this.normalBuffer)
        GL.bufferData(
            GL.ARRAY_BUFFER,
            geometry.mesh.normals,
            GL.STATIC_DRAW
        )
        GL.vertexAttribPointer(this.normalLocation, Vec3.size, GL.FLOAT, false, 0, 0)

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
uniform mat4 u_model;

in vec4 a_position;
in vec3 a_normal;

out vec3 o_normal;

void main() {
    o_normal = a_normal;
    gl_Position = u_projection * u_view * u_model * a_position;
}
`

const fragment = /*glsl*/`#version 300 es
precision highp float;
 
uniform vec4 u_color;
uniform vec3 u_light_direction;

in vec3 o_normal;
out vec4 outColor;
 
void main() {
    vec3 normal = normalize(o_normal);
    float light = dot(normal, u_light_direction);
    outColor = u_color;
    outColor.rgb *= light;
}
`