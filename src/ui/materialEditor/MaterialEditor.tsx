import { useMemo } from "react";
import { Material } from "../../material/Material";
import "./MaterialEditor.scss";
import { LineMaterial } from "../../material/LineMaterial";
import { LineMaterialEditor } from "./lineMaterialEditor/LineMaterialEditor";

type Props = {
	material: Material
}

export function MaterialEditor(props: Props) {

	const body = useMemo(() => {
		if (props.material instanceof LineMaterial)
			return <LineMaterialEditor material={props.material} />
	}, [props.material])

	return <div className="MaterialEditor">
		<p>{props.material.name}</p>
		{body}
	</div>
}
