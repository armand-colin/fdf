import { Emitter } from "@niloc/utils";
import { Vec3 } from "./math/Vec3";
import { Mat4 } from "./math/Mat4";
import { useObjectField } from "./hooks/useObjectField";

export class Transform extends Emitter<{ change: void }> {

    private _position = new Vec3()
    private _rotation = new Vec3()
    private _scale = new Vec3(1, 1, 1)

    private _matrixDirty = false
    private _matrix = Mat4.identity()

    private _inverseMatrixDirty = false
    private _inverseMatrix = Mat4.identity()

    get matrix() {
        if (this._matrixDirty)
            this._computeMatrix()

        return this._matrix
    }

    get inverseMatrix() {
        if (this._inverseMatrixDirty)
            this._computeInverseMatrix()

        return this._inverseMatrix
    }

    get scale() { return this._scale }
    set scale(scale: Vec3) {
        this._scale = scale
        this._matrixDirty = true
        this._inverseMatrixDirty = true
        this.emit("change", undefined)
    }

    get position() { return this._position }
    set position(position: Vec3) {
        this._position = position
        this._matrixDirty = true
        this._inverseMatrixDirty = true
        this.emit("change", undefined)
    }

    get rotation() { return this._rotation }
    set rotation(rotation: Vec3) {
        this._rotation = rotation
        this._matrixDirty = true
        this._inverseMatrixDirty = true
        this.emit("change", undefined)
    }

    private _computeMatrix() {
        // TODO: bake matrix, I mean do it in one big calculus
        this._matrix.identity()

        this._matrix.translate(this._position)
        this._matrix.rotate(this._rotation)
        this._matrix.scale(this._scale)

        this._matrixDirty = false
    }

    private _computeInverseMatrix() {
        // TODO: bake matrix, I mean do it in one big calculus
        this._inverseMatrix.identity()

        const temp = new Mat4()

        // this._inverseMatrix.scale(this._scale.inverse())
        this._inverseMatrix.rotate(this._rotation.inverse(), temp)
        this._inverseMatrix.translate(this._position.inverse(), temp)

        this._inverseMatrixDirty = false
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: transform => ({
                scale: transform.scale,
                position: transform.position,
                rotation: transform.rotation,
            }),
            emitter: this as Transform,
            event: "change"
        })
    }

}