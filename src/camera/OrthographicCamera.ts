import { Camera } from "./Camera";

export class OrthographicCamera extends Camera {

    constructor(protected readonly canvas: HTMLCanvasElement) {
        super()
        this._updateProjection()
    }

    private _updateProjection() {
        const l = this.canvas.width * -1
        const r = this.canvas.width * 1
        const t = this.canvas.height * 1
        const b = this.canvas.height * -1

        const f = 100_000
        const n = 0.5

        this.projection.set(0, 2 / (r - l))
        this.projection.set(5, 2 / (t - b))
        this.projection.set(10, -2 / (f - n))

        this.projection.set(12, -1 * (r + l) / (r - l))
        this.projection.set(13, -1 * (t + b) / (t - b))
        this.projection.set(14, -1 * (f + n) / (f - n))
    }

}