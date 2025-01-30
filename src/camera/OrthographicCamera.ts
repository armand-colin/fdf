import { Camera } from "./Camera";

export class OrthographicCamera extends Camera {

    constructor(canvas: HTMLCanvasElement) {
        super()

        const depth = 400

        this.projection.set(0, 2 / canvas.width)
        this.projection.set(5, 2 / canvas.height)
        this.projection.set(10, 2 / depth)
    }

}