import { SelectionController } from "../../../controllers/SelectionController";
import { Resource } from "../../../library/Resource";
import { Injection } from "../../../utils/Injection";
import { DraggableResource } from "../../dragAndDrop/draggableResource/DraggableResource";
import "./ResourceTile.scss";

type Props = {
	resource: Resource
}

export function ResourceTile(props: Props) {
	const selection = Injection.get(SelectionController).useSelection()

	function onDoubleClick() {
		Injection.get(SelectionController).setSelection(props.resource)
	}

	return <DraggableResource
		className="ResourceTile"
		resource={props.resource}
		nativeProps={{
			onDoubleClick,
		}}
		dataset={{
			"data-selected": selection === props.resource
		}}
	>
		<p>{props.resource.name}</p>
	</DraggableResource>

}
