import { Emitter } from "@niloc/utils";
import { Vec3 } from "../math/Vec3";
import { useObjectField } from "../hooks/useObjectField";

export class OrbitalPosition extends Emitter<{ change: void }> {

    private _distance: number = 1000
    private _height: number = 100
    private _angle: number = 0

    constructor(
        readonly position: Vec3,
        readonly rotation: Vec3
    ) {
        super()
    }

    get height() { return this._height } 
    set height(height: number) {
        this._height = height
        this.update()
    }
    
    get angle() { return this._angle } 
    set angle(angle: number) {
        this._angle = angle
        this.update()
    }
    
    get distance() { return this._distance } 
    set distance(distance: number) {
        this._distance = distance
        this.update()
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: orbital => ({
                height: orbital.height,
                distance: orbital.distance,
                angle: orbital.angle
            }),
            emitter: this as OrbitalPosition,
            event: "change"
        })
    }

    update() {
        const z = Math.cos(this._angle) * this._distance
        const x = Math.sin(this._angle) * this._distance

        this.position.x = x
        this.position.z = z
        this.position.y = this._height

        // Look at (0, 0, 0)

        this.rotation.y = this._angle
        this.rotation.x = -Math.atan(this._height / this._distance)
        this.rotation.z = 0

        this.emit('change', undefined)
    }

}