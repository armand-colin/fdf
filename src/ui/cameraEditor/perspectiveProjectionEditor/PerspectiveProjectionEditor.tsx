import { PerspectiveProjection } from "../../../camera/PerspectiveProjection";
import { Mathf } from "../../../math/Mathf";
import { RenderingContext } from "../../../RenderingContext";
import { Slider } from "../../slider/Slider";
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
		<p>Perspective</p>
		<Slider
			label="Far"
			max={100_000}
			min={10}
			onInput={far =>  {
				props.projection.set({ far })
				RenderingContext.render()
			}}
			value={far}
		/>
		<Slider
			label="Near"
			max={100}
			min={0}
			onInput={near =>  {
				props.projection.set({ near })
				RenderingContext.render()
			}}
			value={near}
		/>
		<Slider
			label="FOV"
			max={180}
			min={20}
			onInput={fov =>  {
				props.projection.set({ fov: Mathf.degreesToRadians(fov) })
				RenderingContext.render()
			}}
			value={Mathf.radiansToDegrees(fov)}
		/>
	</div>
}
