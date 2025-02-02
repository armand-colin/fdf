import { RenderingContext } from "../../RenderingContext";
import { CameraEditor } from "../cameraEditor/CameraEditor";
import { SceneEditor } from "../sceneEditor/SceneEditor";
import { SelectionEditor } from "../selectionEditor/SelectionEditor";
import "./Editor.scss";

type Props = {

}

export function Editor(props: Props) {
	const { camera, scene } = RenderingContext.useState()

	return <div className="Editor">
		<div className="Editor__column">
			<SelectionEditor />
		</div>
		<div className="Editor__column">
			<CameraEditor camera={camera} />
			<SceneEditor scene={scene} />
		</div>
	</div>
}
