import { ChangeEvent, CSSProperties, MouseEvent, useRef } from "react";
import { Color } from "../../math/Color";
import "./RgbInput.scss";

type Props = {
	label: string,
	value: Color,
	onChange: (value: Color) => void
}

export function RgbInput(props: Props) {
	const ref = useRef<HTMLInputElement | null>(null)

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const hex = e.target.value
		const color = Color.fromHex(hex)
		props.onChange(color)
	}
	function onClick(e: MouseEvent) {
		e.stopPropagation()
		ref.current?.click()
	}

	return <div className="RgbInput" onClick={onClick}>
		<label>{props.label}</label>
		<div
			className="RgbInput__visualizer"
			style={{
				"--color": props.value.toHex()
			} as CSSProperties}
		/>
		<input
			type="color"
			value={props.value.toHex()}
			onChange={onChange}
			ref={ref}
		/>
	</div>
}
