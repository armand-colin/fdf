import { OrbitalPosition } from "../../../utils/OrbiltalPosition";
import "./OrbitalEditor.scss";
import { Slider } from "../../slider/Slider";
import { Mathf } from "../../../math/Mathf";
import { NumberInput } from "../../numberInput/NumberInput";

type Props = {
	orbital: OrbitalPosition
}

export function OrbitalEditor(props: Props) {
	const {
		height,
		distance,
		angle
	} = props.orbital.useState()

	return <div className="OrbitalEditor">
		<p>Orbital Position</p>
		<NumberInput
			label="Height"
			min={0}
			onChange={height => props.orbital.height = height}
			value={height}
		/>
		<NumberInput
			label="Distance"
			min={0}
			onChange={distance => props.orbital.distance = distance}
			value={distance}
		/>
		<NumberInput
			label="Angle"
			min={0}
			max={360}
			onChange={angle => props.orbital.angle = Mathf.degreesToRadians(angle)}
			value={Mathf.radiansToDegrees(angle)}
		/>
	</div>
}
