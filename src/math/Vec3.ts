import { Mathf } from "./Mathf"

export class Vec3 {

    readonly buffer: Float32Array

    static readonly size = 3

    static lerp(a: Vec3, b: Vec3, t: number, target = new Vec3()) {
        target.x = Mathf.lerp(a.x, b.x, t)
        target.y = Mathf.lerp(a.y, b.y, t)
        target.z = Mathf.lerp(a.z, b.z, t)

        return target
    }

    static right() { return new Vec3(1, 0, 0) }
    static forward() { return new Vec3(0, 0, 1) }

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

    clone() {
        return new Vec3(this.x, this.y, this.z)
    }

    toString(limit = 2) {
        return `(${this.x.toFixed(limit)}, ${this.y.toFixed(limit)}, ${this.z.toFixed(limit)})`
    }
    inverse(target = new Vec3()) {
        target.x = -1 * this.x
        target.y = -1 * this.y
        target.z = -1 * this.z

        return target
    }

    multiplyScalar(k: number, target = new Vec3()) {
        target.x = this.x * k
        target.y = this.y * k
        target.z = this.z * k

        return target
    }

    add(other: Vec3, target = new Vec3()) {
        target.x = this.x + other.x
        target.y = this.y + other.y
        target.z = this.z + other.z

        return target
    }
}