import { Vec3 } from "./Vec3"

export class Mat4 {

    static identity() {
        return new Mat4(new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]))
    }

    static translation(v: Vec3, target: Mat4 = new Mat4()) {
        target.buffer.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            v.x, v.y, v.z, 1,
        ])

        return target
    }

    static scaling(v: Vec3, target: Mat4 = new Mat4()) {
        target.buffer.set([
            v.x, 0, 0, 0,
            0, v.y, 0, 0,
            0, 0, v.z, 0,
            0, 0, 0, 1,
        ])

        return target
    }

    static rotationX(angle: number, target: Mat4 = new Mat4()) {
        var c = Math.cos(angle)
        var s = Math.sin(angle)

        target.buffer.set([
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ])

        return target
    }

    static rotationY(angle: number, target: Mat4 = new Mat4()) {
        var c = Math.cos(angle)
        var s = Math.sin(angle)

        target.buffer.set([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ])

        return target
    }

    static rotationZ(angle: number, target: Mat4 = new Mat4()) {
        var c = Math.cos(angle)
        var s = Math.sin(angle)

        target.buffer.set([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ])

        return target
    }

    static multiply(a: Mat4, b: Mat4, target: Mat4 = new Mat4()) {
        const b00 = b.buffer[0 * 4 + 0]
        const b01 = b.buffer[0 * 4 + 1]
        const b02 = b.buffer[0 * 4 + 2]
        const b03 = b.buffer[0 * 4 + 3]
        const b10 = b.buffer[1 * 4 + 0]
        const b11 = b.buffer[1 * 4 + 1]
        const b12 = b.buffer[1 * 4 + 2]
        const b13 = b.buffer[1 * 4 + 3]
        const b20 = b.buffer[2 * 4 + 0]
        const b21 = b.buffer[2 * 4 + 1]
        const b22 = b.buffer[2 * 4 + 2]
        const b23 = b.buffer[2 * 4 + 3]
        const b30 = b.buffer[3 * 4 + 0]
        const b31 = b.buffer[3 * 4 + 1]
        const b32 = b.buffer[3 * 4 + 2]
        const b33 = b.buffer[3 * 4 + 3]
        const a00 = a.buffer[0 * 4 + 0]
        const a01 = a.buffer[0 * 4 + 1]
        const a02 = a.buffer[0 * 4 + 2]
        const a03 = a.buffer[0 * 4 + 3]
        const a10 = a.buffer[1 * 4 + 0]
        const a11 = a.buffer[1 * 4 + 1]
        const a12 = a.buffer[1 * 4 + 2]
        const a13 = a.buffer[1 * 4 + 3]
        const a20 = a.buffer[2 * 4 + 0]
        const a21 = a.buffer[2 * 4 + 1]
        const a22 = a.buffer[2 * 4 + 2]
        const a23 = a.buffer[2 * 4 + 3]
        const a30 = a.buffer[3 * 4 + 0]
        const a31 = a.buffer[3 * 4 + 1]
        const a32 = a.buffer[3 * 4 + 2]
        const a33 = a.buffer[3 * 4 + 3]

        const array = [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ]

        target.buffer.set(array, 0)

        return target
    }

    readonly buffer: Float32Array
    readonly size = 16

    constructor(buffer?: Float32Array) {
        if (!buffer)
            buffer = new Float32Array(16)

        this.buffer = buffer
    }

    set(i: number, value: number) {
        this.buffer[i] = value
    }

    translate(translation: Vec3, temp = new Mat4()) {
        Mat4.multiply(this, Mat4.translation(translation, temp), this)
    }

    rotate(euler: Vec3, temp = new Mat4()) {
        Mat4.multiply(this, Mat4.rotationX(euler.x, temp), this)
        Mat4.multiply(this, Mat4.rotationY(euler.y, temp), this)
        Mat4.multiply(this, Mat4.rotationZ(euler.z, temp), this)
    }

    copy(other: Mat4) {
        this.buffer.set(other.buffer)
    }

}