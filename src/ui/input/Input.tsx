import "./Input.scss";

type Props = {
	value: number | string,
	min?: number,
	max?: number,
	step?: number,
	name?: string,
	placeholder?: string,
	onChange: (value: string) => void
}

export function Input(props: Props) {
	return <div className="Input">
		<input
			placeholder={props.placeholder}
			value={props.value}
			name={props.name}
			min={props.min}
			max={props.max}
			step={props.step}
			onChange={e => props.onChange(e.target.value)}
		/>
	</div>
}
