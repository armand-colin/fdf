import { useEffect } from "react";
import { LineMaterial } from "../../../material/LineMaterial";
import { RenderingContext } from "../../../RenderingContext";
import { NumberInput } from "../../numberInput/NumberInput";
import "./LineMaterialEditor.scss";

type Props = {
	material: LineMaterial
}

export function LineMaterialEditor(props: Props) {
	const { height } = props.material.useState()

	useEffect(() => {
		props.material.on('change', RenderingContext.render)

		return () => {
			props.material.off('change', RenderingContext.render)
		}
	}, [props.material])

	return <div className="LineMaterialEditor">
		<NumberInput
			label="Height"
			onChange={height => props.material.setState({ height })}
			value={height}
		/>
	</div>
}
