import { Gradient } from "../../../Gradient";
import { useUpdate } from "../../../hooks/useUpdate";
import { HeightMapMaterial } from "../../../material/HeightMapMaterial";
import { Texture } from "../../../texture/Texture";
import { GradientEditor } from "../../gradientEditor/GradientEditor";
import { NumberInput } from "../../numberInput/NumberInput";
import { Section } from "../../section/Section";
import "./LineMaterialEditor.scss";

type Props = {
	material: HeightMapMaterial
}

export function LineMaterialEditor(props: Props) {
	const { height, gradient } = props.material.useState()
	const update = useUpdate()

	function onGradientChange(gradient: Gradient) {
		if (props.material.state.gradient) {
			props.material.state.gradient.setData(gradient)
			update()
		} else {
			props.material.setState({ gradient: new Texture(gradient) })
		}
	}

	return <div className="LineMaterialEditor">
		<NumberInput
			label="Height"
			onChange={height => props.material.setState({ height })}
			value={height}
		/>
		<Section
			label="Height Gradient"
		>
			{
				gradient ?
					<GradientEditor
						gradient={gradient.data}
						onChange={onGradientChange}
					/> :
					undefined
			}
		</Section>
	</div>
}
