import { MouseEvent } from "react"

export class NumberDragController {

    startX: number
    initialValue: number
    onChange: (value: number) => void
    step: number
    strength: number

    constructor(opts: {
        event: MouseEvent | globalThis.MouseEvent,
        value: number,
        onChange: (value: number) => void,
        step?: number,
        strength?: number
    }) {
        this.startX = opts.event.pageX
        this.initialValue = opts.value
        this.onChange = opts.onChange
        this.step = opts.step ?? 0.05
        this.strength = opts.strength ?? 1

        window.addEventListener('mousemove', this._onMouseMove)
        window.addEventListener('mouseup', this.stop)
    }

    stop = () => {
        window.removeEventListener('mousemove', this._onMouseMove)
    }

    private _onMouseMove = (e: globalThis.MouseEvent) => {
        const x = e.pageX
        const deltaX = (x - this.startX)
        const pixelRatio = Math.min(1, Math.abs(deltaX / 100)) * this.strength

        const grossValue = this.initialValue + deltaX * pixelRatio
        const value = grossValue - (grossValue % this.step)
        this.onChange(value)
    }

}