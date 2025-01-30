export class Mat4 {

    readonly buffer: Float32Array
    readonly size = 16
    
    constructor(buffer?: Float32Array) {
        if (!buffer)
            buffer = new Float32Array(16)

        this.buffer = buffer
    }

}