export class Mat4 {

    readonly buffer: Float32Array
    readonly size = 16

    static identity() {
        return new Mat4(new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]))
    }

    constructor(buffer?: Float32Array) {
        if (!buffer)
            buffer = new Float32Array(16)

        this.buffer = buffer
    }

    set(i: number, value: number) {
        this.buffer[i] = value
    }

}