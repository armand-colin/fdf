import { OrbitalPosition } from "../../../utils/OrbitalPosition";
import "./OrbitalEditor.scss";
import { Mathf } from "../../../math/Mathf";
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
		<p>Orbital Position</p>
		<NumberInput
			label="Distance"
			min={0}
			onChange={distance => props.orbital.setState({ distance })}
			value={distance}
		/>
		<NumberInput
			label="X Angle"
			min={0}
			max={360}
			onChange={xAngle => props.orbital.setState({ xAngle: Mathf.degreesToRadians(xAngle) })}
			value={Mathf.radiansToDegrees(xAngle)}
		/>
		<NumberInput
			label="Y Angle"
			min={0}
			max={360}
			onChange={yAngle => props.orbital.setState({ yAngle: Mathf.degreesToRadians(yAngle) })}
			value={Mathf.radiansToDegrees(yAngle)}
		/>
		<Vec3NumberInput
			label="Look At"
			onChange={lookAt => props.orbital.setState({ lookAt })}
			value={lookAt}
		/>
	</div>
}
