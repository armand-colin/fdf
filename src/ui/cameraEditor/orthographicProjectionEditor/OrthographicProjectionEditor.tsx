import { OrthographicProjection } from "../../../camera/OrthographicProjection";
import { NumberInput } from "../../numberInput/NumberInput";
import "./OrthographicProjectionEditor.scss";

type Props = {
	projection: OrthographicProjection
}

export function OrthographicProjectionEditor(props: Props) {
	const { zoom } = props.projection.useState()

	return <div className="OrthographicProjectionEditor">
		<p>Orthographic</p>
		<NumberInput 
			label="Zoom"
			onChange={zoom => {
				console.log("onchange", zoom)
				props.projection.setState({ zoom })
			}}
			min={0.1}
			value={zoom}
			step={0.05}
		/>
	</div>
}
