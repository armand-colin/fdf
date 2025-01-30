import { Camera } from "./Camera";

export class PerspectiveCamera extends Camera {

    constructor(opts: {
        canvas: HTMLCanvasElement,
        fov: number,
        near: number,
        far: number
    }) {
        super()

        const aspect = opts.canvas.width / opts.canvas.height
        const f = Math.tan(Math.PI * 0.5 - 0.5 * opts.fov);
        const rangeInv = 1.0 / (opts.near - opts.far);

        this.projection.buffer.set([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (opts.near + opts.far) * rangeInv, -1,
            0, 0, opts.near * opts.far * rangeInv * 2, 0,
        ])
    }

}