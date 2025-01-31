import { Emitter } from "@niloc/utils";
import { Mat4 } from "../math/Mat4";
import { useObjectField } from "../hooks/useObjectField";

export abstract class Projection<State = any> extends Emitter<{ change: void }> {

    readonly matrix = Mat4.identity()

    private _state: State

    constructor(protected readonly canvas: HTMLCanvasElement) {
        super()
        this._state = this.makeState()
    }

    abstract update(): void
    protected abstract makeState(): State

    get state(): State {
        return this._state
    }

    useState(): Readonly<State> {
        return useObjectField({
            object: this,
            accessor: projection => ({ ...projection._state }),
            emitter: this as Projection<State>,
            event: "change"
        })
    }

    setState(state: Partial<State>) {
        for (const key in state) {
            if (state[key] !== undefined)
                this._state[key] = state[key]
        }

        this.emit('change', undefined)
    }

}