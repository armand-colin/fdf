import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./NumberInput.scss";
import { Mathf } from "../../math/Mathf";

type Props = {
	min?: number,
	max?: number,
	value: number,
	onChange: (value: number) => void,
	label: string,
	step?: number
}

class DragController {

	startX: number
	initialValue: number
	onChange: (value: number) => void
	step: number

	constructor(opts: {
		event: MouseEvent,
		value: number,
		onChange: (value: number) => void,
		step?: number
	}) {
		this.startX = opts.event.pageX
		this.initialValue = opts.value
		this.onChange = opts.onChange
		this.step = opts.step ?? 0.05

		window.addEventListener('mousemove', this._onMouseMove)
		window.addEventListener('mouseup', this.stop)
	}

	stop = () => {
		window.removeEventListener('mousemove', this._onMouseMove)
	}

	private _onMouseMove = (e: globalThis.MouseEvent) => {
		const x = e.pageX
		const deltaX = (x - this.startX)
		const pixelRatio = Math.min(1, Math.abs(deltaX / 100))

		const grossValue = this.initialValue + deltaX * pixelRatio
		const value = grossValue - (grossValue % this.step)
		this.onChange(value)
	}

}

export function NumberInput(props: Props) {
	const [value, setValue] = useState<string>(props.value.toString())
	const dragController = useRef<DragController | null>(null)

	const min = props.min ?? -Infinity
	const max = props.max ?? Infinity

	useEffect(() => {
		setValue(props.value.toString())
	}, [props.value])

	useEffect(() => {
		return () => {
			if (dragController.current) {
				dragController.current.stop()
				dragController.current = null
			}
		}
	}, [])

	function set(value: number) {
		const clamped = Mathf.clamp(value, min, max)
		props.onChange(clamped)
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const value = Number.parseFloat(e.target.value)

		if (Number.isNaN(value) || e.target.value === "-0")
			setValue(e.target.value)
		else
			set(value)
	}

	function onMouseDown(e: MouseEvent) {
		const controller = new DragController({
			event: e,
			value: props.value,
			onChange: value => set(value),
			step: props.step
		})

		if (dragController.current) 
			dragController.current.stop()

		dragController.current = controller
	}

	return <div className="NumberInput">
		<label
			onMouseDown={onMouseDown}
		>{props.label}</label>
		<input
			type="number"
			onChange={onChange}
			value={value}
			min={props.min}
			max={props.max}
			step={props.step}
		/>
	</div>
}
