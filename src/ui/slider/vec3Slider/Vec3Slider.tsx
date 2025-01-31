import { useReducer } from "react";
import { Vec3 } from "../../../math/Vec3";
import { Slider } from "../Slider";
import "./Vec3Slider.scss";

type Props = {
	vec: Vec3,
	min: Vec3,
	max: Vec3,
	label: string,
	onChange: () => void
}

export function Vec3Slider(props: Props) {
	const [_, forceUpdate] = useReducer(x => x + 1, 0)

	function onInput(index: number, value: number) {
		props.vec.buffer[index] = value
		forceUpdate()
	}

	return <div className="Vec3Slider">
		<label>{props.label}</label>
		<Slider
			label="X"
			min={props.min.x}
			max={props.max.x}
			onInput={value => onInput(0, value)}
			value={props.vec.x}
		/>
		<Slider
			label="Y"
			min={props.min.y}
			max={props.max.y}
			onInput={value => onInput(1, value)}
			value={props.vec.y}
		/>
		<Slider
			label="Z"
			min={props.min.z}
			max={props.max.z}
			onInput={value => onInput(2, value)}
			value={props.vec.z}
		/>
	</div>
}
