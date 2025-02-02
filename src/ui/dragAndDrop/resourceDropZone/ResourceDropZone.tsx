import { DragEvent, HTMLAttributes, ReactNode } from "react";
import "./ResourceDropZone.scss";
import { Resource } from "../../../library/Resource";
import { Injection } from "../../../utils/Injection";
import { ResourceDragController } from "../../../controllers/ResourceDragController";

type Props<T extends Resource> = {
	className?: string
	children?: ReactNode
	allows: (resource: Resource) => resource is T
	onDrop: (resource: T) => void
	nativeProps?: HTMLAttributes<HTMLDivElement>
}

export function ResourceDropZone<T extends Resource = Resource>(props: Props<T>) {
	const { 
		dragging 
	} = Injection.get(ResourceDragController).useState()

	const className = `ResourceDropZone ${props.className ?? ""}`

	function onDragOver(e: DragEvent) {
		e.preventDefault()
	}

	function onDrop(e: DragEvent) {
		const resource = Injection.get(ResourceDragController).drop(e)
		
		if (!resource)
			return

		if (!props.allows(resource))
			return

		props.onDrop(resource)
	}

	return <div
		className={className}
		onDragOver={onDragOver}
		onDrop={onDrop}
		data-dragging={!!dragging}
		data-allows={dragging && props.allows(dragging)}
		{...props.nativeProps}
	>
		{props.children}
	</div>
}
