import { SelectionController } from "../../controllers/SelectionController";
import { Injection } from "../../utils/Injection";
import { ObjectEditor } from "../objectEditor/ObjectEditor";
import "./SelectionEditor.scss";

type Props = {

}

export function SelectionEditor(props: Props) {
	const object = Injection.get(SelectionController).useObject()

	return object ? <ObjectEditor
		object={object}
	/> : undefined

}
