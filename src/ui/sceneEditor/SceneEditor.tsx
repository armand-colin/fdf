import { MouseEvent, useEffect } from "react";
import { Object } from "../../Object";
import { Scene } from "../../Scene";
import { Checkbox } from "../checkbox/Checkbox";
import { Section } from "../section/Section";
import "./SceneEditor.scss";
import { RenderingContext } from "../../RenderingContext";
import { Injection } from "../../utils/Injection";
import { SelectionController } from "../../controllers/SelectionController";
import { Button } from "../button/Button";

type Props = {
	scene: Scene
}

export function SceneEditor(props: Props) {
	const objects = props.scene.useObjects()
	const selection = Injection.get(SelectionController).useObject()

	function onDelete(object: Object) {
		props.scene.remove(object)
	}

	useEffect(() => {
		props.scene.on('change', RenderingContext.render)
		return () => props.scene.off('change', RenderingContext.render)
	}, [props.scene])
	
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
					onDelete={() => onDelete(object)}
				/>)
			}
		</div>
	</Section>
}

function SceneObjectRow(props: {
	object: Object,
	selected: boolean,
	onDelete: () => void
}) {
	const { enabled } = props.object.useState()

	useEffect(() => {
		RenderingContext.render()
	}, [enabled])

	function onClick() {
		Injection.get(SelectionController).setObject(props.object)
	}

	function onDelete(e: MouseEvent) {
		props.onDelete()
		e.stopPropagation()
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
		<Button icon="trash" onClick={onDelete} />
	</div>
}