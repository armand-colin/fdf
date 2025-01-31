import { RenderingContext } from "../../RenderingContext";
import { CameraEditor } from "../cameraEditor/CameraEditor";
import { SceneEditor } from "../sceneEditor/SceneEditor";
import "./Editor.scss";

type Props = {

}

export function Editor(props: Props) {
	const { camera, scene } = RenderingContext.useState()

	return <div className="Editor">
		<CameraEditor camera={camera} />
		<SceneEditor scene={scene} />
	</div>
}
