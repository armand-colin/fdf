import { RenderingContext } from "../../RenderingContext";
import { CameraEditor } from "../cameraEditor/CameraEditor";
import "./Editor.scss";

type Props = {

}

export function Editor(props: Props) {
	const { camera } = RenderingContext.useState()

	return <div className="Editor">
		<CameraEditor camera={camera} />
	</div>
}
