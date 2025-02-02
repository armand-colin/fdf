import { Emitter } from "@niloc/utils";
import { Vec3 } from "../math/Vec3";
import { useObjectField } from "../hooks/useObjectField";
import { Transform } from "../Transform";

type State = {
    yAngle: number,
    xAngle: number,
    distance: number,
    lookAt: Vec3
}

export class OrbitalPosition extends Emitter<{ change: void }> {

    private _state: State

    constructor(readonly transform: Transform) {
        super()

        this._state = {
            distance: 1,
            xAngle: Math.PI / 5,
            yAngle: 0,
            lookAt: new Vec3()
        }
    }

    setState(state: Partial<State>) {
        Object.assign(this._state, state)
        this.update()
        this.emit('change', undefined)
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: orbital => ({ ...orbital.state }),
            emitter: this as OrbitalPosition,
            event: "change"
        })
    }

    get state(): Readonly<State> {
        return this._state
    }

    update() {
        const { xAngle, yAngle, distance, lookAt } = this._state

        const y = distance * Math.sin(xAngle)
        const xzDistance = distance * Math.cos(xAngle)

        const z = Math.cos(yAngle) * xzDistance
        const x = Math.sin(yAngle) * xzDistance

        this.transform.position = new Vec3(x, y, z).add(lookAt)
        this.transform.rotation = new Vec3(-xAngle, yAngle, 0)
    }

}