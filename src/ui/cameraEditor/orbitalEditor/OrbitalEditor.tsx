import { OrbitalPosition } from "../../../utils/OrbitalPosition";
import "./OrbitalEditor.scss";
import { NumberInput } from "../../numberInput/NumberInput";
import { Vec3NumberInput } from "../../numberInput/vec3NumberInput/Vec3NumberInput";

type Props = {
	orbital: OrbitalPosition
}

export function OrbitalEditor(props: Props) {
	const {
		distance,
		xAngle,
		yAngle,
		lookAt
	} = props.orbital.useState()

	return <div className="OrbitalEditor">
		<label>Orbital Position</label>
		<NumberInput
			label="Distance"
			min={0}
			onChange={distance => props.orbital.setState({ distance })}
			value={distance}
		/>
		<NumberInput.Angle
			label="X Angle"
			onChange={xAngle => props.orbital.setState({ xAngle })}
			value={xAngle}
		/>
		<NumberInput.Angle
			label="Y Angle"
			onChange={yAngle => props.orbital.setState({ yAngle })}
			value={yAngle}
		/>
		<Vec3NumberInput
			label="Look At"
			onChange={lookAt => props.orbital.setState({ lookAt })}
			value={lookAt}
		/>
	</div>
}
