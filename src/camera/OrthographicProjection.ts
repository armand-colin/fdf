import { Projection } from "./Projection";

export class OrthographicProjection extends Projection {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this._updateProjection()
    }

    private _updateProjection() {
        const l = this.canvas.width * -1
        const r = this.canvas.width * 1
        const t = this.canvas.height * 1
        const b = this.canvas.height * -1

        const f = 100_000
        const n = 0.5

        this.matrix.set(0, 2 / (r - l))
        this.matrix.set(5, 2 / (t - b))
        this.matrix.set(10, -2 / (f - n))

        this.matrix.set(12, -1 * (r + l) / (r - l))
        this.matrix.set(13, -1 * (t + b) / (t - b))
        this.matrix.set(14, -1 * (f + n) / (f - n))
    }

}