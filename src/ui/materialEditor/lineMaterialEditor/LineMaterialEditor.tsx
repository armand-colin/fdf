import { Gradient } from "../../../Gradient";
import { useUpdate } from "../../../hooks/useUpdate";
import { HeightMapMaterial } from "../../../material/HeightMapMaterial";
import { Texture } from "../../../texture/Texture";
import { GradientInput } from "../../gradientInput/GradientInput";
import { NumberInput } from "../../numberInput/NumberInput";
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
		{
			gradient && gradient.data instanceof Gradient ?
				<GradientInput 
					gradient={gradient.data}
					label="Height Gradient"
					onChange={onGradientChange}
				/> :
				undefined
		}
	</div>
}
