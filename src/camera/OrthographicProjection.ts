import { Projection } from "./Projection";

type State = {
    zoom: number,
    far: number,
    near: number
}

export class OrthographicProjection extends Projection<State> {

    protected override makeState(): State {
        return {
            zoom: 1,
            far: 100_000,
            near: 0.1
        }
    }

    override update() {
        const { zoom, far, near } = this.state
        const aspectRatio = this.canvas.width / this.canvas.height

        const l = -1 * aspectRatio
        const r = 1 * aspectRatio
        const t = 1
        const b = -1

        const f = far
        const n = near

        this.matrix.set(0, zoom * 2 / (r - l))
        this.matrix.set(5, zoom * 2 / (t - b))
        this.matrix.set(10, -2 / (f - n))

        this.matrix.set(12, -1 * (r + l) / (r - l))
        this.matrix.set(13, -1 * (t + b) / (t - b))
        this.matrix.set(14, -1 * (f + n) / (f - n))
    }

}