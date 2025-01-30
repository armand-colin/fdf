export class Vec3 {

    readonly buffer: Float32Array

    static readonly size = 3

    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
    ) {
        this.buffer = new Float32Array([x, y, z])
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

    get z() {
        return this.buffer[2]
    }
    set z(value: number) {
        this.buffer[2] = value
    }

    inverse(target = new Vec3()) {
        target.x = -1 * this.x
        target.y = -1 * this.y
        target.z = -1 * this.z

        return target
    }

}