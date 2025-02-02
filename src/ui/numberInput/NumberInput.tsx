import { MouseEvent, useEffect, useRef, useState } from "react";
import "./NumberInput.scss";
import { Mathf } from "../../math/Mathf";
import { Input } from "../input/Input";
import { NumberDragController } from "../../controllers/NumberDragController";

type Props = {
	min?: number,
	max?: number,
	value: number,
	onChange: (value: number) => void,
	label: string,
	step?: number,
	strength?: number
}

export function NumberInput(props: Props) {
	const [value, setValue] = useState<string>(props.value.toString())
	const dragController = useRef<NumberDragController | null>(null)

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

	function onChange(text: string) {
		const value = Number.parseFloat(text)

		if (Number.isNaN(value) || text === "-0")
			setValue(text)
		else
			set(value)
	}

	function onMouseDown(e: MouseEvent) {
		const controller = new NumberDragController({
			event: e,
			value: props.value,
			onChange: value => set(value),
			step: props.step,
			strength: props.strength
		})

		if (dragController.current)
			dragController.current.stop()

		dragController.current = controller
	}

	return <div className="NumberInput">
		<label onMouseDown={onMouseDown}>
			{props.label}
		</label>
		<Input
			onChange={onChange}
			value={value}
			min={props.min}
			max={props.max}
			step={props.step}
		/>
	</div>
}

export namespace NumberInput {

	export function Angle(props: { 
		label: string,
		value: number, 
		onChange: (value: number) => void 
	}) {
		return <NumberInput 
			label={props.label}
			value={Mathf.radiansToDegrees(props.value)}
			onChange={value => props.onChange(Mathf.degreesToRadians(value))}
			min={0}
			max={360}
		/>
	}

}