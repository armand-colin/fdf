import { FormEvent } from "react";
import "./Slider.scss";

type Props = {
	value: number,
	min: number,
	max: number,
	onInput: (value: number) => void,
	label: string
}

export function Slider(props: Props) {
	function onInput(e: FormEvent<HTMLInputElement>) {
		const value = Number.parseFloat(e.currentTarget.value)
		props.onInput(value)
	}

	return <div className="Slider">
		<label>{props.label}</label>
		<input
			type="range"
			onInput={onInput}
			value={props.value}
			min={props.min}
			max={props.max}
		/>
	</div>
}
