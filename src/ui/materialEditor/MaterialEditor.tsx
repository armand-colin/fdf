import { useMemo } from "react";
import { Material } from "../../material/Material";
import "./MaterialEditor.scss";
import { HeightMapMaterial } from "../../material/HeightMapMaterial";
import { LineMaterialEditor } from "./lineMaterialEditor/LineMaterialEditor";

type Props = {
	material: Material
}

export function MaterialEditor(props: Props) {

	const body = useMemo(() => {
		if (props.material instanceof HeightMapMaterial)
			return <LineMaterialEditor material={props.material} />
	}, [props.material])

	return <div className="MaterialEditor">
		<p>{props.material.name}</p>
		{body}
	</div>
}
