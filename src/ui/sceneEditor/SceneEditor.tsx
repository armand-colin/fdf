import { MouseEvent, useEffect } from "react";
import { SceneObject } from "../../SceneObject";
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
	const selection = Injection.get(SelectionController).useSelection()

	function onDelete(object: SceneObject) {
		props.scene.remove(object)
	}

	function onAdd() {
		const object = new SceneObject()
		props.scene.add(object)
		Injection.get(SelectionController).setSelection(object)
	}

	useEffect(() => {
		props.scene.on('change', RenderingContext.render)
		return () => props.scene.off('change', RenderingContext.render)
	}, [props.scene])
	
	return <Section
		className="SceneEditor"
		label="Scene"
	>
		<Button icon="add" onClick={onAdd} label="Add" />
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
	object: SceneObject,
	selected: boolean,
	onDelete: () => void
}) {
	const { enabled } = props.object.useState()

	useEffect(() => {
		RenderingContext.render()
	}, [enabled])

	function onClick() {
		Injection.get(SelectionController).setSelection(props.object)
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