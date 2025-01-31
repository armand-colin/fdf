import { OrbitalPosition } from "../../../utils/OrbiltalPosition";
import "./OrbitalEditor.scss";
import { Slider } from "../../slider/Slider";
import { Mathf } from "../../../math/Mathf";

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
		<Slider
			label="Height"
			min={0}
			max={1000}
			onInput={height => props.orbital.height = height}
			value={height}
		/>
		<Slider
			label="Distance"
			min={0}
			max={1000}
			onInput={distance => props.orbital.distance = distance}
			value={distance}
		/>
		<Slider
			label="Angle"
			min={0}
			max={360}
			onInput={angle => props.orbital.angle = Mathf.degreesToRadians(angle)}
			value={Mathf.radiansToDegrees(angle)}
		/>
	</div>
}
