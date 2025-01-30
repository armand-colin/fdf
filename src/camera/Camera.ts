import { Mat4 } from "../math/Mat4"
import { Vec3 } from "../math/Vec3"

export class Camera {

    readonly position = new Vec3()
    readonly rotation = new Vec3()

    protected readonly projection = Mat4.identity()

    readonly matrix = Mat4.identity()

    update() {
        const temp = new Mat4()

        this.matrix.copy(this.projection)
        this.matrix.translate(this.position.inverse(), temp)
        this.matrix.rotate(this.rotation, temp)
    }

}