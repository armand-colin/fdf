export class Vec2 {

    readonly buffer: Float32Array
    readonly size = 2

    constructor(
        x: number = 0,
        y: number = 0
    ) {
        this.buffer = new Float32Array([x, y])
    }

    get x() {
        return this.buffer[0]
    }
    set x(value: number) {
        this.buffer[0] = value
    }

    get y() {
        return this.buffer[1]
    }
    set y(value: number) {
        this.buffer[1] = value
    }

}