import { Scene } from "../../Scene";
import { ObjectEditor } from "../objectEditor/ObjectEditor";
import "./SceneEditor.scss";

type Props = {
	scene: Scene
}

export function SceneEditor(props: Props) {
	const objects = props.scene.objects

	return <div className="SceneEditor">
		<p>Scene</p>
		{
			objects.map(object => {
				return <ObjectEditor
					key={object.id}
					object={object}
				/>
			})
		}
	</div>
}
