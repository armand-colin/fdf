import { Camera } from "../camera/Camera"
import { Geometry } from "../Geometry"
import { GL } from "../GL"
import { Vec2 } from "../math/Vec2"
import { Vec3 } from "../math/Vec3"
import { Shader } from "../Shader"
import { Texture } from "../Texture"
import { Material } from "./Material"

export class LineMaterial extends Material {

    protected readonly indexBuffer: WebGLBuffer

    protected readonly projectionLocation: WebGLUniformLocation | null
    protected readonly viewLocation: WebGLUniformLocation | null

    protected readonly positionLocation: GLint
    protected readonly positionBuffer: WebGLBuffer

    protected readonly uvLocation: GLint
    protected readonly uvBuffer: WebGLBuffer

    protected readonly textureLocation: WebGLUniformLocation | null
    protected readonly gradientLocation: WebGLUniformLocation | null
    protected readonly heightLocation: WebGLUniformLocation | null

    texture: Texture | null = null
    gradient: Texture | null = null
    height: number = 50

    constructor() {
        const shader = Shader.fromSource(vertex, fragment)
        if (!shader)
            throw new Error("Error while compiling shader")

        super(shader)

        // Get all locations
        this.projectionLocation = this.shader.getUniformLocation("u_projection")
        this.viewLocation = this.shader.getUniformLocation("u_view")
        this.textureLocation = this.shader.getUniformLocation("u_texture")
        this.gradientLocation = this.shader.getUniformLocation("u_gradient")
        this.heightLocation = this.shader.getUniformLocation("u_height")

        this.positionLocation = this.shader.getAttributeLocation("a_position")
        this.positionBuffer = GL.createBuffer()

        this.uvLocation = this.shader.getAttributeLocation("a_uv")
        this.uvBuffer = GL.createBuffer()

        this.indexBuffer = GL.createBuffer()
    }

    override draw(camera: Camera, geometry: Geometry): void {
        // Bind shader
        this.shader.bind()

        // Load camera data
        this.shader.setUniformMat4(this.projectionLocation, camera.projection)
        this.shader.setUniformMat4(this.viewLocation, camera.view)
        this.shader.setUniform1f(this.heightLocation, this.height)

        if (this.texture) {
            GL.activeTexture(GL.TEXTURE0)
            GL.uniform1i(this.textureLocation, 0)
            this.texture.bind()
        }

        if (this.gradient) {
            GL.activeTexture(GL.TEXTURE1)
            GL.uniform1i(this.gradientLocation, 1)
            this.gradient.bind()
        }

        // Load indexBuffer
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
        GL.bufferData(
            GL.ELEMENT_ARRAY_BUFFER,
            geometry.indices,
            GL.STATIC_DRAW
        )

        // Load positions
        GL.enableVertexAttribArray(this.positionLocation)
        GL.bindBuffer(GL.ARRAY_BUFFER, this.positionBuffer)
        GL.bufferData(
            GL.ARRAY_BUFFER,
            geometry.positions,
            GL.STATIC_DRAW
        )
        GL.vertexAttribPointer(this.positionLocation, Vec3.size, GL.FLOAT, false, 0, 0)

        // Load uvs
        GL.enableVertexAttribArray(this.uvLocation)
        GL.bindBuffer(GL.ARRAY_BUFFER, this.uvBuffer)
        GL.bufferData(
            GL.ARRAY_BUFFER,
            geometry.uvs,
            GL.STATIC_DRAW
        )
        GL.vertexAttribPointer(this.uvLocation, Vec2.size, GL.FLOAT, false, 0, 0)

        // Draw elements
        const primitiveType = geometry.primitive
        const indexType = geometry.indexType
        const offset = 0
        const count = geometry.count

        GL.lineWidth(1)

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
uniform sampler2D u_texture;
uniform sampler2D u_gradient;
uniform float u_height;

in vec4 a_position;
in vec2 a_uv;
out vec4 o_color;

void main() {
    float height = texture(u_texture, a_uv).x;
    vec4 color = vec4(texture(u_gradient, vec2(height, height)).xyz, 1.0);
    vec4 position = a_position + vec4(0.0, height * u_height, 0.0, 0.0);

    gl_Position = u_projection * u_view * position;
    o_color = color;
}
`

const fragment = /*glsl*/`#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
in vec4 o_color;
out vec4 outColor;
 
void main() {
    // Just set the output to a constant reddish-purple
    outColor = o_color;
}
`