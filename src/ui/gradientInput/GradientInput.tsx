import { useEffect } from "react";
import { Gradient, GradientPoint } from "../../Gradient";
import { Color } from "../../math/Color";
import { NumberInput } from "../numberInput/NumberInput";
import { RgbInput } from "../rgbInput/RgbInput";
import "./GradientInput.scss";

type Props = {
	label: string,
	gradient: Gradient,
	onChange: (value: Gradient) => void
}

export function GradientInput(props: Props) {
	useEffect(() => {
		console.log('Gradient change')
	}, [props.gradient])
	
	function onPointChange(i: number, point: GradientPoint) {
		const points = [...props.gradient.points]
		points[i] = point
		props.onChange(new Gradient(points))
	}

	function onDelete(i: number) {
		const points = [...props.gradient.points]
		points.splice(i, 1)
		props.onChange(new Gradient(points))
	}

	return <div className="GradientInput">
		<label>{props.label}</label>
		{
			props.gradient.points.map((point, i) => {
				return <PointEditor
					key={i}
					point={point}
					onChange={point => onPointChange(i, point)}
					onDelete={() => onDelete(i)}
				/>
			})
		}
	</div>
}

function PointEditor(props: {
	point: GradientPoint,
	onChange: (value: GradientPoint) => void,
	onDelete: () => void
}) {
	function onColorChange(color: Color) {
		props.onChange({ ...props.point, color })
	}

	function onTChange(t: number) {
		props.onChange({ ...props.point, t })
	}

	return <div className="PointEditor">
		<RgbInput
			label="Color"
			value={props.point.color}
			onChange={onColorChange}
		/>
		<NumberInput
			label="T"
			onChange={onTChange}
			value={props.point.t}
			min={0}
			max={1}
		/>
		<button onClick={props.onDelete}>delete</button>
	</div>
}
