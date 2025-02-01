import { GL } from "./GL";
import { Color } from "./math/Color";
import { Mat4 } from "./math/Mat4";

type Uniform = Mat4 | Color | number

export class Shader {

    private static _createShader(type: GL["VERTEX_SHADER"] | GL["FRAGMENT_SHADER"], source: string): WebGLShader | null {
        const shader = GL.createShader(type)
        if (!shader)
            return null

        GL.shaderSource(shader, source)
        GL.compileShader(shader)

        const success = GL.getShaderParameter(shader, GL.COMPILE_STATUS)
        if (success)
            return shader

        console.error(GL.getShaderInfoLog(shader))
        GL.deleteShader(shader)
        return null
    }

    private static _createProgram(vertex: WebGLShader, fragment: WebGLShader): WebGLProgram | null {
        const program = GL.createProgram()
        GL.attachShader(program, vertex)
        GL.attachShader(program, fragment)
        GL.linkProgram(program)

        const success = GL.getProgramParameter(program, GL.LINK_STATUS);
        if (success)
            return program
        
        console.error(GL.getProgramInfoLog(program))
        GL.deleteProgram(program)
        return null
    }

    static fromSource(vertex: string, fragment: string): Shader | null {
        const vertexShader = this._createShader(GL.VERTEX_SHADER, vertex)
        if (!vertexShader)
            return null

        const fragmentShader = this._createShader(GL.FRAGMENT_SHADER, fragment)
        if (!fragmentShader) {
            GL.deleteShader(vertexShader)
            return null
        }
        
        const program = this._createProgram(vertexShader, fragmentShader)
        if (!program) {
            GL.deleteShader(vertexShader)
            GL.deleteShader(fragmentShader)
            return null
        }

        return new Shader(program)
    }

    private _uniformLocations: Record<string, WebGLUniformLocation | null | undefined> = { }
    private _attributeLocations: Record<string, GLint | undefined> = { }

    private constructor(
        protected readonly program: WebGLProgram,
    ) { }

    bind() {
        GL.useProgram(this.program)
    }

    getAttributeLocation(name: string) {
        if (this._attributeLocations[name] !== undefined)
            return this._attributeLocations[name]

        const location = GL.getAttribLocation(this.program, name)
        this._attributeLocations[name] = location

        return location
    }

    getUniformLocation(name: string) {
        if (this._uniformLocations[name] !== undefined)
            return this._uniformLocations[name]

        const location = GL.getUniformLocation(this.program, name)
        this._uniformLocations[name] = location

        return location
    }

    setUniform(location: WebGLUniformLocation | null, value: Uniform) {
        if (value instanceof Mat4)
            GL.uniformMatrix4fv(location, false, value.buffer)
        else if (value instanceof Color)
            GL.uniform4f(location, value.r, value.g, value.b, value.a)
        else if (typeof value === "number")
            GL.uniform1f(location, value)
    }

}