import { Object } from "../../Object";
import { BooleanInput } from "../booleanInput/BooleanInput";
import { GeometryEditor } from "../geometryEditor/GeometryEditor";
import { MaterialEditor } from "../materialEditor/MaterialEditor";
import "./ObjectEditor.scss";
import { useUpdate } from "../../hooks/useUpdate";

type Props = {
	object: Object
}

export function ObjectEditor(props: Props) {
	const update = useUpdate()

	function onEnabledChange(enabled: boolean) {
		props.object.enabled = enabled
		update()
	}

	return <div className="ObjectEditor">
		<p>{props.object.name}</p>
		<BooleanInput
			value={props.object.enabled}
			label="Enabled"
			onChange={onEnabledChange}
		/>
		<GeometryEditor geometry={props.object.geometry} />
		<MaterialEditor material={props.object.material} />
	</div>
}
