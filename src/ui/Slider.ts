import { Emitter } from "@niloc/utils"

export class Slider extends Emitter<{ change: number }> {

    private _value: number
    private _input: HTMLInputElement
    private _display: HTMLElement

    constructor(protected opts: {
        min: number,
        max: number,
        label: string
    }) {
        super()

        const input = document.createElement("input")
        const value = (opts.max - opts.min) / 2 + opts.min
        input.type = "range"
        input.min = opts.min.toString()
        input.max = opts.max.toString()
        input.value = value.toString()

        input.oninput = this.onInput

        const label = document.createElement("label")
        label.innerText = opts.label

        const display = document.createElement("p")

        const container = document.createElement("div")
        container.append(label, input, display)

        document.body.append(container)

        this._input = input
        this._value = value
        this._display = display

        this._updateDisplay()
    }

    onInput = (e: Event) => {
        const value = Number.parseFloat((e.target as HTMLInputElement).value)
        this._value = value
        this._updateDisplay()
        this.emit('change', value)
    }

    get value() {
        return this._value
    }

    set value(value: number) {
        this._input.value = value.toString()
        this._updateDisplay()
    }

    private _updateDisplay() {
        this._display.innerText = this._value.toString()
    }
}