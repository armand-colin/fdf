export class Color {

    readonly buffer

    static readonly size = 4
    readonly size = 4

    static red() {
        return new Color(1, 0, 0)
    }

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
        this.buffer = new Float32Array([r, g, b, a])
    }

    get r() { return this.buffer[0] }
    get g() { return this.buffer[1] }
    get b() { return this.buffer[2] }
    get a() { return this.buffer[3] }

}