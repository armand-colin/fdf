import { MouseEvent } from "react";
import { Icon, IconName } from "../icon/Icon";
import "./Button.scss";

type Props = {
	label?: string,
	icon?: IconName,
	contrast?: boolean,
	onClick: (e: MouseEvent) => void,
}

export function Button(props: Props) {
	return <button 
		className="Button"
		onClick={props.onClick}
		data-contrast={!!props.contrast}
		data-label={!!props.label}
	>
		{props.icon && <Icon name={props.icon} />}
		{props.label && <>{props.label}</>}
	</button>
}
