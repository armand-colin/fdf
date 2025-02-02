import { MouseEvent } from "react";
import "./Icon.scss";
import * as icons from "./icons"

export type IconName = keyof typeof icons

type Props = {
	name: IconName,
	onClick?: (e: MouseEvent) => void
}

export function Icon(props: Props) {
	return <i
		className="Icon"
		onClick={props.onClick}
	>
		{icons[props.name]()}
	</i>
}
