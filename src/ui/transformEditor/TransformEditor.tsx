import { useEffect } from "react";
import { RenderingContext } from "../../RenderingContext";
import { Transform } from "../../Transform";
import "./TransformEditor.scss";
import { Section } from "../section/Section";
import { Vec3NumberInput } from "../numberInput/vec3NumberInput/Vec3NumberInput";

type Props = {
	transform: Transform
}

export function TransformEditor(props: Props) {
	const { position, scale, rotation } = props.transform.useState()

	useEffect(() => {
		props.transform.on('change', RenderingContext.render)
		return () => props.transform.on('change', RenderingContext.render)
	}, [props.transform])

	return <Section 
		className="TransformEditor"
		label="Transform"
	>
		<Vec3NumberInput 
			label="Scale"
			value={scale}
			onChange={scale => props.transform.scale = scale}
		/>
		<Vec3NumberInput 
			label="Position"
			value={position}
			onChange={position => props.transform.position = position}
		/>
		<Vec3NumberInput.Euler
			label="Rotation"
			value={rotation}
			onChange={rotation => props.transform.rotation = rotation}
		/>
	</Section>
}
