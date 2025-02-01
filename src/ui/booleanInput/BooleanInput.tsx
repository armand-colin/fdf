import { ChangeEvent } from "react";
import "./BooleanInput.scss";

type Props = {
	label: string,
	value: boolean,
	onChange: (value: boolean) => void,
}

export function BooleanInput(props: Props) {

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		props.onChange(e.target.checked)
	}

	return <div className="BooleanInput">
		<label>{props.label}</label>
		<input
			type="checkbox"
			checked={props.value}
			onChange={onChange}
		/>
	</div>
}
