import { OrthographicProjection } from "../../../camera/OrthographicProjection";
import { NumberInput } from "../../numberInput/NumberInput";
import "./OrthographicProjectionEditor.scss";

type Props = {
	projection: OrthographicProjection
}

export function OrthographicProjectionEditor(props: Props) {
	const { zoom, far, near } = props.projection.useState()

	return <div className="OrthographicProjectionEditor">
		<p>Orthographic</p>
		<NumberInput 
			label="Zoom"
			onChange={zoom => props.projection.setState({ zoom })}
			min={0.1}
			value={zoom}
		/>
		<NumberInput 
			label="Far"
			onChange={far => props.projection.setState({ far })}
			min={0.1}
			value={far}
		/>
		<NumberInput 
			label="Near"
			onChange={near => props.projection.setState({ near })}
			min={0}
			value={near}
		/>
	</div>
}
