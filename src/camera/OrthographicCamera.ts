import { Camera } from "./Camera";

export class OrthographicCamera extends Camera {

    constructor() {
        super()

        const width = 300
        const height = 150
        const depth = 400

        this.matrix.set(0, 2 / width)
        this.matrix.set(5, 2 / height)
        this.matrix.set(10, 2 / depth)

        this.matrix.set(12, -1)
        this.matrix.set(13, 1)
    }

}