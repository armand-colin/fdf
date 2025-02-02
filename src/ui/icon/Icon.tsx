import "./Icon.scss";
import * as icons from "./icons"

export type IconName = keyof typeof icons

type Props = {
	name: IconName
}

export function Icon(props: Props) {
	return <i className="Icon">
		{icons[props.name]()}
	</i>
}
