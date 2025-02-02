import { Object } from "../../Object";
import { GeometryEditor } from "../geometryEditor/GeometryEditor";
import { MaterialEditor } from "../materialEditor/MaterialEditor";
import { TransformEditor } from "../transformEditor/TransformEditor";
import "./ObjectEditor.scss";

type Props = {
	object: Object
}

export function ObjectEditor(props: Props) {
	return <div className="ObjectEditor">
		<TransformEditor transform={props.object.transform} />
		<GeometryEditor geometry={props.object.geometry} />
		<MaterialEditor material={props.object.material} />
	</div>
}
