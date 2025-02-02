import { useMemo } from "react";
import { Resource } from "../../library/Resource";
import "./ResourceEditor.scss";
import { Material } from "../../material/Material";
import { MaterialEditor } from "../materialEditor/MaterialEditor";
import { Geometry } from "../../geometry/Geometry";
import { GeometryEditor } from "../geometryEditor/GeometryEditor";

type Props = {
	resource: Resource
}

export function ResourceEditor(props: Props) {
	const inner = useMemo(() => {
		if (props.resource instanceof Material)
			return <MaterialEditor material={props.resource} />
		if (props.resource instanceof Geometry)
			return <GeometryEditor geometry={props.resource} />

		return <>Unsupported resource type</>
	}, [props.resource])
	
	return <div className="ResourceEditor">
		{inner}
	</div>
}
