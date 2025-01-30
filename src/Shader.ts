import { Context } from "./Context";
import { Mat4 } from "./math/Mat4";

export class Shader {

    private static _createShader(context: Context, type: Context["VERTEX_SHADER"] | Context["FRAGMENT_SHADER"], source: string): WebGLShader | null {
        const shader = context.createShader(type)
        if (!shader)
            return null

        context.shaderSource(shader, source)
        context.compileShader(shader)

        const success = context.getShaderParameter(shader, context.COMPILE_STATUS)
        if (success)
            return shader

        console.error(context.getShaderInfoLog(shader))
        context.deleteShader(shader)
        return null
    }

    private static _createProgram(context: Context, vertex: WebGLShader, fragment: WebGLShader): WebGLProgram | null {
        const program = context.createProgram()
        context.attachShader(program, vertex)
        context.attachShader(program, fragment)
        context.linkProgram(program)

        const success = context.getProgramParameter(program, context.LINK_STATUS);
        if (success)
            return program
        
        console.error(context.getProgramInfoLog(program))
        context.deleteProgram(program)
        return null
    }

    static fromSource(context: Context, vertex: string, fragment: string): Shader | null {
        const vertexShader = this._createShader(context, context.VERTEX_SHADER, vertex)
        if (!vertexShader)
            return null

        const fragmentShader = this._createShader(context, context.FRAGMENT_SHADER, fragment)
        if (!fragmentShader) {
            context.deleteShader(vertexShader)
            return null
        }
        
        const program = this._createProgram(context, vertexShader, fragmentShader)
        if (!program) {
            context.deleteShader(vertexShader)
            context.deleteShader(fragmentShader)
            return null
        }

        return new Shader(context, program)
    }

    private _uniformLocations: Record<string, WebGLUniformLocation | null | undefined> = { }
    private _attributeLocations: Record<string, GLint | undefined> = { }

    private constructor(
        protected readonly context: Context,
        protected readonly program: WebGLProgram,
    ) { }

    bind() {
        this.context.useProgram(this.program)
    }

    getAttributeLocation(name: string) {
        if (this._attributeLocations[name] !== undefined)
            return this._attributeLocations[name]

        const location = this.context.getAttribLocation(this.program, name)
        this._attributeLocations[name] = location

        return location
    }

    getUniformLocation(name: string) {
        if (this._uniformLocations[name] !== undefined)
            return this._uniformLocations[name]

        const location = this.context.getUniformLocation(this.program, name)
        this._uniformLocations[name] = location

        return location
    }

    setUniformMat4(location: WebGLUniformLocation | null, value: Mat4) {
        this.context.uniformMatrix4fv(location, false, value.buffer)
    }

}