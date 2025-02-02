import { useEffect } from "react";
import { Object } from "../../Object";
import { Scene } from "../../Scene";
import { Checkbox } from "../checkbox/Checkbox";
import { Section } from "../section/Section";
import "./SceneEditor.scss";
import { RenderingContext } from "../../RenderingContext";
import { Injection } from "../../utils/Injection";
import { SelectionController } from "../../controllers/SelectionController";

type Props = {
	scene: Scene
}

export function SceneEditor(props: Props) {
	const objects = props.scene.objects
	const selection = Injection.get(SelectionController).useObject()

	return <Section
		className="SceneEditor"
		label="Scene"
	>
		<div className="SceneObjectRows">
			{
				objects.map(object => <SceneObjectRow
					key={object.id}
					object={object}
					selected={object === selection}
				/>)
			}
		</div>
	</Section>
}

function SceneObjectRow(props: { object: Object, selected: boolean }) {
	const { enabled } = props.object.useState()

	useEffect(() => {
		console.log('asked render')
		RenderingContext.render()
	}, [enabled])

	function onClick() {
		Injection.get(SelectionController).setObject(props.object)
	}

	return <div
		className="SceneObjectRow"
		onClick={onClick}
		data-selected={props.selected}
	>
		<p>{props.object.name}</p>
		<Checkbox
			onChange={value => props.object.enabled = value}
			value={enabled}
		/>
	</div>
}