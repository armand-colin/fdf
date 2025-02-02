import { Emitter } from "@niloc/utils";
import { useObjectField } from "../hooks/useObjectField";
import { MouseEvent } from "react";
import { Vec2 } from "../math/Vec2";

type Drag = {
    startMouse: Vec2,
    startPosition: Vec2,
    active: boolean
}

const DRAG_SQ_THRESHOLD = 100
const DRAG_TIMING_THRESHOLD = 50

export class FloatingSectionController extends Emitter<{ change: void }> {

    private _lastDrag = -1
    private _floating = false
    private _position = new Vec2()

    private _drag: Drag | null = null

    constructor() {
        super()
        window.addEventListener('mousemove', this._onMouseMove)
        window.addEventListener('mouseup', this._onMouseUp)
    }

    setFloating(value: boolean, e?: MouseEvent) {
        if (
            this._drag?.active ||
            Date.now() < this._lastDrag + DRAG_TIMING_THRESHOLD
        )
            return

        this._floating = value

        if (value && e)
            this._position = new Vec2(e.pageX - 300, e.pageY)

        this.emit('change', undefined)
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: controller => ({
                floating: controller._floating,
                position: controller._position,
                dragging: !!(this._drag && this._drag.active)
            }),
            emitter: this as FloatingSectionController,
            event: "change"
        })
    }

    onMouseDown = (e: MouseEvent) => {
        if (!this._floating)
            return

        this._drag = {
            active: false,
            startMouse: new Vec2(e.pageX, e.pageY),
            startPosition: this._position.clone()
        }
    }

    destroy() {
        this.removeAllListeners()
        window.removeEventListener('mousemove', this._onMouseMove)
        window.removeEventListener('mouseup', this._onMouseUp)
    }

    private _onMouseUp = (_e: globalThis.MouseEvent) => {
        if (this._drag) {
            if (this._drag.active) 
                this._lastDrag = Date.now()

            this._drag = null
            this.emit('change', undefined)
        }
    }

    private _onMouseMove = (e: globalThis.MouseEvent) => {
        if (!this._drag)
            return

        const mousePosition = new Vec2(e.pageX, e.pageY)
        const delta = mousePosition.sub(this._drag.startMouse)

        if (!this._drag.active) {
            const passed = delta.sqMagnitude > DRAG_SQ_THRESHOLD
            if (!passed)
                return

            this._drag.active = true
        }

        this._position = this._drag.startPosition.add(delta)
        this.emit('change', undefined)
    }

}