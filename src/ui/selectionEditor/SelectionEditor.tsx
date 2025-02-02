import { SelectionController } from "../../controllers/SelectionController";
import { SceneObject } from "../../SceneObject";
import { Injection } from "../../utils/Injection";
import { SceneObjectEditor } from "../objectEditor/SceneObjectEditor";
import { ResourceEditor } from "../resourceEditor/ResourceEditor";
import "./SelectionEditor.scss";

type Props = {

}

export function SelectionEditor(props: Props) {
	const selection = Injection.get(SelectionController).useSelection()

	if (selection === null)
		return <></>

	if (selection instanceof SceneObject)
		return <SceneObjectEditor object={selection} />

	return <ResourceEditor resource={selection} />
}
