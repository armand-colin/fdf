import "./BooleanInput.scss";
import { Checkbox } from "../checkbox/Checkbox";

type Props = {
	label: string,
	value: boolean,
	onChange: (value: boolean) => void,
}

export function BooleanInput(props: Props) {

	return <div className="BooleanInput">
		<label onClick={() => props.onChange(!props.value)}>{props.label}</label>
		<Checkbox
			value={props.value}
			onChange={props.onChange}
		/>
	</div>
}
