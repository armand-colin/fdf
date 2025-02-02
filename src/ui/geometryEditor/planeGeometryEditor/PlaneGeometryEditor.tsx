import { PlaneGeometry } from "../../../geometry/PlaneGeometry";
import { NumberInput } from "../../numberInput/NumberInput";
import "./PlaneGeometryEditor.scss";

type Props = {
	geometry: PlaneGeometry
}

export function PlaneGeometryEditor(props: Props) {
	const { resolution } = props.geometry.useState()

	return <div className="PlaneGeometryEditor">
		<NumberInput 
			step={1}
			label="Resolution"
			onChange={resolution => props.geometry.setState({ resolution })}
			value={resolution}
			min={2}
		/>
	</div>
}
