import { useEffect, useMemo } from "react";
import { Material } from "../../material/Material";
import "./MaterialEditor.scss";
import { HeightMapMaterial } from "../../material/HeightMapMaterial";
import { LineMaterialEditor } from "./lineMaterialEditor/LineMaterialEditor";
import { BlinnPhongMaterial } from "../../material/BlinnPhongMaterial";
import { BlinnPhongMaterialEditor } from "./blinnPhongMaterialEditor/BlinnPhongMaterialEditor";
import { RenderingContext } from "../../RenderingContext";
import { Section } from "../section/Section";

type Props = {
	material: Material
}

export function MaterialEditor(props: Props) {
	useEffect(() => {
		props.material.on('change', RenderingContext.render)

		return () => {
			props.material.off('change', RenderingContext.render)
		}
	}, [props.material])

	const body = useMemo(() => {
		if (props.material instanceof HeightMapMaterial)
			return <LineMaterialEditor material={props.material} />
		if (props.material instanceof BlinnPhongMaterial)
			return <BlinnPhongMaterialEditor material={props.material} />
	}, [props.material])

	return <Section
		className="MaterialEditor"
		label={`Material (${props.material.name})`}
	>
		{body}
	</Section>
}
