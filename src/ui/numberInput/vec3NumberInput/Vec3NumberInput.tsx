import { Mathf } from "../../../math/Mathf";
import { Vec3 } from "../../../math/Vec3";
import { NumberInput } from "../NumberInput";
import "./Vec3NumberInput.scss";

type Props = {
	value: Vec3,
	label: string,
	min?: Vec3,
	max?: Vec3,
	onChange: (value: Vec3) => void,
	type?: "number" | "angle"
}

export function Vec3NumberInput(props: Props) {

	function onChange(index: number, value: number) {
		const vec = props.value.clone()
		vec.buffer[index] = value
		props.onChange(vec)
	}

	return <div className="Vec3NumberInput">
		<label>{props.label}</label>

		<section>
			<NumberInput
				label="X"
				onChange={x => onChange(0, x)}
				value={props.value.x}
				min={props.min?.x}
				max={props.max?.x}
			/>
			<NumberInput
				label="Y"
				onChange={y => onChange(1, y)}
				value={props.value.y}
				min={props.min?.y}
				max={props.max?.y}
			/>
			<NumberInput
				label="Z"
				onChange={z => onChange(2, z)}
				value={props.value.z}
				min={props.min?.z}
				max={props.max?.z}
			/>
		</section>
	</div>
}

export namespace Vec3NumberInput {

	function radiansToDegrees(vec: Vec3) {
		return new Vec3(
			Mathf.radiansToDegrees(vec.x),
			Mathf.radiansToDegrees(vec.y),
			Mathf.radiansToDegrees(vec.z),
		)
	}

	function degreesToRadians(vec: Vec3) {
		return new Vec3(
			Mathf.degreesToRadians(vec.x),
			Mathf.degreesToRadians(vec.y),
			Mathf.degreesToRadians(vec.z),
		)
	}

	const minAngle = new Vec3()
	const maxAngle = new Vec3(360, 360, 360)

	export function Euler(props: { 
		value: Vec3, 
		onChange: (euler: Vec3) => Vec3,
		label: string
	}) {
		return <Vec3NumberInput 
			label={props.label}
			onChange={value => props.onChange(degreesToRadians(value))}
			value={radiansToDegrees(props.value)}
			min={minAngle}
			max={maxAngle}
		/>
	}

}