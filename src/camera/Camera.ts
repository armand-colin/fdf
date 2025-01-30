import { Mat4 } from "../math/Mat4"
import { Vec3 } from "../math/Vec3"

export class Camera {

    readonly position = new Vec3()
    readonly rotation = new Vec3()

    readonly projection = Mat4.identity()
    readonly view = Mat4.identity()

    update() {
        const temp = new Mat4()

        this.view.identity()
        this.view.rotate(this.rotation.inverse(), temp)
        this.view.translate(this.position.inverse(), temp)
    }

}