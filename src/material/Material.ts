import { Emitter } from "@niloc/utils"
import { Camera } from "../camera/Camera"
import { Geometry } from "../Geometry"
import { Shader } from "../Shader"
import { useObjectField } from "../hooks/useObjectField"

export abstract class Material<State = any> extends Emitter<{ change: void }> {

    abstract name: string

    private _state: State

    constructor(protected readonly shader: Shader) {
        super()
        shader.bind()
        this._state = this.makeState()
    }

    get state(): State {
        return this._state
    }

    protected abstract makeState(): State

    abstract draw(camera: Camera, geometry: Geometry): void

    useState(): State {
        return useObjectField({
            object: this,
            accessor: material => material.state,
            emitter: this as Material<State>,
            event: "change"
        })
    }

    setState(state: Partial<State>) {
        this._state = { ...this._state, ...state }
        this.emit('change', undefined)
    }

}