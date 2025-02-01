import { WireframeGeometry } from "../../../geometry/WireframeGeometry";
import { BooleanInput } from "../../booleanInput/BooleanInput";
import { NumberInput } from "../../numberInput/NumberInput";
import "./WireframeGeometryEditor.scss";

type Props = {
	geometry: WireframeGeometry
}

export function WireframeGeometryEditor(props: Props) {
	const {
		lineCount,
		length,
		resolution,
		hasX,
		hasZ
	} = props.geometry.useState()

	return <div className="WireframeGeometryEditor">
		<NumberInput 
			label="Line count"
			onChange={lineCount => props.geometry.setState({ lineCount })}
			value={lineCount}
			min={0}
			max={100}
			step={1}
		/>
		<NumberInput 
			label="Resolution"
			onChange={resolution => props.geometry.setState({ resolution })}
			value={resolution}
			min={1}
			max={100}
			step={1}
		/>
		<NumberInput 
			label="Length"
			onChange={length => props.geometry.setState({ length })}
			value={length}
			min={0}
			max={100}
		/>
		<BooleanInput 
			label="Has X"
			onChange={hasX => props.geometry.setState({ hasX })}
			value={hasX}
		/>
		<BooleanInput 
			label="Has Z"
			onChange={hasZ => props.geometry.setState({ hasZ })}
			value={hasZ}
		/>
	</div>
}
