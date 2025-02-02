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

    static inverse(mat: Mat4, target = new Mat4()) {
        const m00 = mat.buffer[0 * 4 + 0]
        const m01 = mat.buffer[0 * 4 + 1]
        const m02 = mat.buffer[0 * 4 + 2]
        const m03 = mat.buffer[0 * 4 + 3]
        const m10 = mat.buffer[1 * 4 + 0]
        const m11 = mat.buffer[1 * 4 + 1]
        const m12 = mat.buffer[1 * 4 + 2]
        const m13 = mat.buffer[1 * 4 + 3]
        const m20 = mat.buffer[2 * 4 + 0]
        const m21 = mat.buffer[2 * 4 + 1]
        const m22 = mat.buffer[2 * 4 + 2]
        const m23 = mat.buffer[2 * 4 + 3]
        const m30 = mat.buffer[3 * 4 + 0]
        const m31 = mat.buffer[3 * 4 + 1]
        const m32 = mat.buffer[3 * 4 + 2]
        const m33 = mat.buffer[3 * 4 + 3]
        const tmp_0 = m22 * m33
        const tmp_1 = m32 * m23
        const tmp_2 = m12 * m33
        const tmp_3 = m32 * m13
        const tmp_4 = m12 * m23
        const tmp_5 = m22 * m13
        const tmp_6 = m02 * m33
        const tmp_7 = m32 * m03
        const tmp_8 = m02 * m23
        const tmp_9 = m22 * m03
        const tmp_10 = m02 * m13
        const tmp_11 = m12 * m03
        const tmp_12 = m20 * m31
        const tmp_13 = m30 * m21
        const tmp_14 = m10 * m31
        const tmp_15 = m30 * m11
        const tmp_16 = m10 * m21
        const tmp_17 = m20 * m11
        const tmp_18 = m00 * m31
        const tmp_19 = m30 * m01
        const tmp_20 = m00 * m21
        const tmp_21 = m20 * m01
        const tmp_22 = m00 * m11
        const tmp_23 = m10 * m01

        const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        target.buffer.set([
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
        ])
    }

    readonly buffer: Float32Array
    readonly size = 16

    constructor(buffer?: Float32Array) {
        if (!buffer)
            buffer = new Float32Array(16)

        this.buffer = buffer
    }
 
    toString() {
        return `(
${this.buffer[0]},${this.buffer[1]},${this.buffer[2]},${this.buffer[3]},
${this.buffer[4]},${this.buffer[5]},${this.buffer[6]},${this.buffer[7]},
${this.buffer[8]},${this.buffer[9]},${this.buffer[10]},${this.buffer[11]},
${this.buffer[12]},${this.buffer[13]},${this.buffer[14]},${this.buffer[15]}
)`
    }

    /**
     * Sets this matrix to identity matrix, in place
     */
    identity(): this {
        this.buffer.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ])

        return this
    }

    set(i: number, value: number) {
        this.buffer[i] = value
    }

    translate(translation: Vec3, temp = new Mat4()) {
        Mat4.multiply(this, Mat4.translation(translation, temp), this)
    }

    scale(scale: Vec3, temp = new Mat4()) {
        Mat4.multiply(this, Mat4.scaling(scale, temp), this)
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