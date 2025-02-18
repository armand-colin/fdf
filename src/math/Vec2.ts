export class Vec2 {

    readonly buffer: Float32Array

    static readonly size = 2
    readonly size = 2

    constructor(
        x: number = 0,
        y: number = 0
    ) {
        this.buffer = new Float32Array([x, y])
    }

    get sqMagnitude() {
        return this.x * this.x + this.y * this.y
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    sub(other: Vec2, target = new Vec2()) {
        target.x = this.x - other.x
        target.y = this.y - other.y

        return target
    }

    add(other: Vec2, target = new Vec2()) {
        target.x = this.x + other.x
        target.y = this.y + other.y

        return target
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