import { DragEvent, HTMLAttributes, ReactNode } from "react";
import { Resource } from "../../../library/Resource";
import "./DraggableResource.scss";
import { Injection } from "../../../utils/Injection";
import { ResourceDragController } from "../../../controllers/ResourceDragController";

type Props = {
	resource: Resource,
	children?: ReactNode,
	className?: string,
	nativeProps?: HTMLAttributes<HTMLDivElement>,
	dataset?: Record<string, any>
}

export function DraggableResource(props: Props) {
	const className = `DraggableResource ${props.className ?? ""}`

	function onDragStart(e: DragEvent) {
		Injection.get(ResourceDragController).drag(e, props.resource)
	}

	return <div 
		className={className}
		draggable
		onDragStart={onDragStart}
		{...props.nativeProps}
		{...props.dataset}
	>
		{props.children}
	</div>
}
