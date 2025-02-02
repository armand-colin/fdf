import { useEffect } from "react";
import { Geometry } from "../../geometry/Geometry";
import { Material } from "../../material/Material";
import { SceneObject } from "../../SceneObject";
import { ResourceView } from "../resourceView/ResourceView";
import { TransformEditor } from "../transformEditor/TransformEditor";
import "./SceneObjectEditor.scss";
import { RenderingContext } from "../../RenderingContext";

type Props = {
	object: SceneObject
}

export function SceneObjectEditor(props: Props) {
	const { geometry, material } = props.object.useState()

	useEffect(() => {
		props.object.on('change', RenderingContext.render)
		return () => props.object.off('change', RenderingContext.render)
	}, [])

	return <div className="SceneObjectEditor">
		<TransformEditor transform={props.object.transform} />

		<ResourceView
			label="Geometry"
			resource={geometry}
			allows={resource => resource instanceof Geometry}
			onChange={geometry => props.object.geometry = geometry}
		/>

		<ResourceView
			label="Material"
			resource={material}
			allows={resource => resource instanceof Material}
			onChange={material => props.object.material = material}
		/>
	</div>
}
