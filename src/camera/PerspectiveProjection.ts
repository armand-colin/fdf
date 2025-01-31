import { Emitter } from "@niloc/utils";
import { Projection } from "./Projection";
import { useObjectField } from "../hooks/useObjectField";

type State = {
    fov: number,
    near: number,
    far: number
}

export class PerspectiveProjection extends Projection {

    private _fov: number
    private _near: number
    private _far: number

    protected emitter = new Emitter<{ change: void }>()

    constructor(canvas: HTMLCanvasElement, opts?: Partial<{
        fov: number,
        near: number,
        far: number
    }>) {
        super(canvas)

        this._fov = opts?.fov ?? Math.PI / 2
        this._near = opts?.near ?? 0.5
        this._far = opts?.far ?? 10_000

        this._updateProjection()
    }

    private _updateProjection() {
        const aspect = this.canvas.width / this.canvas.height
        const f = Math.tan(Math.PI * 0.5 - 0.5 * this._fov);
        const rangeInv = 1.0 / (this._near - this._far);

        this.matrix.buffer.set([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (this._near + this._far) * rangeInv, -1,
            0, 0, this._near * this._far * rangeInv * 2, 0,
        ])
    }

    useState() {
        return useObjectField({
            object: this,
            emitter: this.emitter,
            accessor: projection => ({
                fov: projection._fov,
                far: projection._far,
                near: projection._near
            } as State),
            event: "change"
        })
    }

    set(state: Partial<State>) {
        this._fov = state?.fov ?? this._fov
        this._near = state?.near ?? this._near
        this._far = state?.far ?? this._far

        this._updateProjection()
        this.emitter.emit('change', undefined)
    }

}