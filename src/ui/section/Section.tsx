import { ReactNode, useState } from "react";
import "./Section.scss";
import { Icon } from "../icon/Icon";

type Props = {
	label: string,
	children?: ReactNode,
	defaultState?: boolean,
	className?: string
}

export function Section(props: Props) {
	const [open, setOpen] = useState(props.defaultState ?? true)

	const className = `Section ${props.className ?? ""}`

	return <div
		className={className}
		data-open={open}
	>
		<label onClick={() => setOpen(open => !open)}>
			<Icon name="arrow_down" />
			{props.label}
		</label>
		<article>
			{props.children}
		</article>
	</div>
}
