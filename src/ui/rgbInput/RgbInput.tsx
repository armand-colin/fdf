import { ChangeEvent } from "react";
import { Color } from "../../math/Color";
import "./RgbInput.scss";

type Props = {
	label: string,
	value: Color,
	onChange: (value: Color) => void
}

export function RgbInput(props: Props) {
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const hex = e.target.value
		const color = Color.fromHex(hex)
		props.onChange(color)
	}
	return <div className="RgbInput">
		<label>{props.label}</label>
		<input
			type="color"
			value={props.value.toHex()}
			onChange={onChange}
		/>
	</div>
}
