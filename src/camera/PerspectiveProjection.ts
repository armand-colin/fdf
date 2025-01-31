import { Emitter } from "@niloc/utils";
import { Projection } from "./Projection";

type State = {
    fov: number,
    near: number,
    far: number
}

export class PerspectiveProjection extends Projection<State> {

    protected emitter = new Emitter<{ change: void }>()

    constructor(canvas: HTMLCanvasElement, opts?: Partial<{
        fov: number,
        near: number,
        far: number
    }>) {
        super(canvas)

        this.setState({
            far: opts?.far,
            fov: opts?.fov,
            near: opts?.near
        })
    }

    protected override makeState(): State {
        return {
            far: 10_000,
            fov: Math.PI / 2,
            near: 0.5
        }
    }

    override update() {
        const { near, far, fov } = this.state

        const aspect = this.canvas.width / this.canvas.height
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1.0 / (near - far);

        this.matrix.buffer.set([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0,
        ])
    }

}