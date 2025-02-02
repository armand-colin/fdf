import { SelectionController } from "../../controllers/SelectionController";
import { Resource } from "../../library/Resource";
import { Injection } from "../../utils/Injection";
import { ResourceDropZone } from "../dragAndDrop/resourceDropZone/ResourceDropZone";
import "./ResourceView.scss";

type Props<T extends Resource> = {
	label: string,
	resource: Resource | null,
	allows: (resource: Resource) => resource is T,
	onChange: (resource: T) => void
}

export function ResourceView<T extends Resource>(props: Props<T>) {
	function onDoubleClick() {
		if (props.resource) {
			Injection.get(SelectionController).setSelection(props.resource)
		}
	}

	return <ResourceDropZone
		className="ResourceView"
		allows={props.allows}
		onDrop={props.onChange}
		nativeProps={{ onDoubleClick }}
	>
		{`${props.label} (${props.resource?.name ?? "None"})`}
	</ResourceDropZone>
}
