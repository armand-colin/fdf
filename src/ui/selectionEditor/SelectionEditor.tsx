import { SelectionController } from "../../controllers/SelectionController";
import { Injection } from "../../utils/Injection";
import { ObjectEditor } from "../objectEditor/ObjectEditor";
import { Section } from "../section/Section";
import "./SelectionEditor.scss";

type Props = {

}

export function SelectionEditor(props: Props) {
	const object = Injection.get(SelectionController).useObject()

	return <Section
		className="SelectionEditor"
		label={"Selection" + (object ? ` (${object.name})` : "")}
	>
		{
			object ? <ObjectEditor
				object={object}
			/> : undefined
		}
	</Section>
}
