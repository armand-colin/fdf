import { Vec3 } from "../../../math/Vec3";
import { NumberInput } from "../NumberInput";
import "./Vec3NumberInput.scss";

type Props = {
	value: Vec3,
	label: string,
	onChange: (value: Vec3) => void,
}

export function Vec3NumberInput(props: Props) {
	
	function onChange(index: number, value: number) {
		const vec = props.value.clone()
		vec.buffer[index] = value
		props.onChange(vec)
	}

	return <div className="Vec3NumberInput">
		<p>{props.label}</p>
		<NumberInput 
			label="X"
			onChange={x => onChange(0, x)}
			value={props.value.x}
		/>
		<NumberInput 
			label="Y"
			onChange={y => onChange(1, y)}
			value={props.value.y}
		/>
		<NumberInput 
			label="Z"
			onChange={z => onChange(2, z)}
			value={props.value.z}
		/>
	</div>
}
