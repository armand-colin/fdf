import { PerspectiveProjection } from "../../../camera/PerspectiveProjection";
import { Mathf } from "../../../math/Mathf";
import { RenderingContext } from "../../../RenderingContext";
import { NumberInput } from "../../numberInput/NumberInput";
import "./PerspectiveProjectionEditor.scss";

type Props = {
	projection: PerspectiveProjection
}

export function PerspectiveProjectionEditor(props: Props) {
	const {
		fov,
		near,
		far
	} = props.projection.useState()

	return <div className="PerspectiveProjectionEditor">
		<NumberInput
			label="Far"
			max={100_000}
			min={10}
			onChange={far =>  {
				props.projection.setState({ far })
				RenderingContext.render()
			}}
			value={far}
		/>
		<NumberInput
			label="Near"
			max={100}
			min={0}
			onChange={near =>  {
				props.projection.setState({ near })
				RenderingContext.render()
			}}
			value={near}
		/>
		<NumberInput
			label="FOV"
			max={180}
			min={20}
			onChange={fov =>  {
				props.projection.setState({ fov: Mathf.degreesToRadians(fov) })
				RenderingContext.render()
			}}
			value={Mathf.radiansToDegrees(fov)}
		/>
	</div>
}
