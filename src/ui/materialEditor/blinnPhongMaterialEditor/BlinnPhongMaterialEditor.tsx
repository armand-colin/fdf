import { BlinnPhongMaterial } from "../../../material/BlinnPhongMaterial";
import { RgbInput } from "../../rgbInput/RgbInput";
import "./BlinnPhongMaterialEditor.scss";

type Props = {
	material: BlinnPhongMaterial
}

export function BlinnPhongMaterialEditor(props: Props) {
	const {
		color
	} = props.material.useState()

	return <div className="BlinnPhongMaterialEditor">
		<RgbInput 
			label="Color"
			onChange={color => props.material.setState({ color })}
			value={color}
		/>
	</div>
}
