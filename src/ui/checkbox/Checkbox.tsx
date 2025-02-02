import { MouseEvent } from "react";
import "./Checkbox.scss";

type Props = {
	name?: string,
	value: boolean,
	onChange: (value: boolean) => void,
}

export function Checkbox(props: Props) {
	function onClick(e: MouseEvent) {
		e.stopPropagation()
		props.onChange(!props.value)
	}

	return <div
		onClick={onClick}
		className="Checkbox"
		data-checked={props.value}
	/>
}
