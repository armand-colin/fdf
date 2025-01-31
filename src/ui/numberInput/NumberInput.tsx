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
	pixelRatio: number
	onChange: (value: number) => void

	constructor(opts: {
		event: MouseEvent,
		value: number,
		pixelRatio?: number,
		onChange: (value: number) => void
	}) {
		this.startX = opts.event.pageX
		this.initialValue = opts.value
		this.pixelRatio = opts.pixelRatio ?? 1
		this.onChange = opts.onChange

		window.addEventListener('mousemove', this._onMouseMove)
		window.addEventListener('mouseup', this.stop)
	}

	stop = () => {
		window.removeEventListener('mousemove', this._onMouseMove)
	}

	private _onMouseMove = (e: globalThis.MouseEvent) => {
		const x = e.pageX
		const delta = (x - this.startX) * this.pixelRatio
		const value = this.initialValue + delta
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

		if (Number.isNaN(value))
			setValue(e.target.value)
		else
			set(value)
	}

	function onMouseDown(e: MouseEvent) {
		const controller = new DragController({
			event: e,
			value: props.value,
			pixelRatio: props.step,
			onChange: value => set(value)
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
		/>
	</div>
}
