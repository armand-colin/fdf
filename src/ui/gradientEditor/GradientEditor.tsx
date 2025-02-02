import { CSSProperties, useEffect, useMemo } from "react";
import { Gradient, GradientPoint } from "../../Gradient";
import { Color } from "../../math/Color";
import { NumberInput } from "../numberInput/NumberInput";
import { RgbInput } from "../rgbInput/RgbInput";
import "./GradientEditor.scss";
import { Button } from "../button/Button";

type Props = {
	gradient: Gradient,
	onChange: (value: Gradient) => void
}

export function GradientEditor(props: Props) {
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

	const cssGradient = useMemo(() => {
		const colors = props.gradient.points.map(point => {
			return `${point.color.toHex()} ${point.t * 100}%`
		}).join(', ')

		return `linear-gradient(90deg, ${colors})`
	}, [props.gradient])

	return <div className="GradientEditor">
		<div className="GradientEditor__visualizer"
			style={{
				"--gradient": cssGradient
			} as CSSProperties}
		/>
		<div className="GradientEditor__points">
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
		console.log('on t change', t)
		props.onChange({ ...props.point, t })
	}

	return <div className="PointEditor">
		<div className="PointEditor__inputs">
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
				step={0.001}
				strength={0.005}
			/>
		</div>

		<Button onClick={props.onDelete} label="X" />
	</div>
}
