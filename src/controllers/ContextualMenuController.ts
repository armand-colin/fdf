import { Emitter } from "@niloc/utils";
import { Vec2 } from "../math/Vec2";
import { useObjectField } from "../hooks/useObjectField";
import { MouseEvent } from "react";

export type ContextualMenuAction = { label: string } & ({
    action: () => void
} | {
    actions: ContextualMenuAction[]
})

const CLOSE_THRESHOLD = 50

export class ContextualMenuController extends Emitter<{ change: void }> {

    private _open = false
    private _position = new Vec2()
    private _actions: ContextualMenuAction[] = []
    private _lastOpen = -1

    constructor() {
        super()
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: controller => ({
                open: controller._open,
                position: controller._position,
                actions: controller._actions,
            }),
            emitter: this as ContextualMenuController,
            event: "change"
        })
    }

    open(event: MouseEvent | globalThis.MouseEvent, actions: ContextualMenuAction[]) {
        event.preventDefault()
        event.stopPropagation()

        this._open = true
        this._position = new Vec2(event.pageX, event.pageY)
        this._actions = actions
        this.emit('change', undefined)
    }

    close() {
        if (Date.now() < this._lastOpen + CLOSE_THRESHOLD)
            return

        this._open = false
        this.emit('change', undefined)
    }

}