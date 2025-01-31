import { useMemo } from "react";
import { Camera } from "../../camera/Camera";
import "./CameraEditor.scss";
import { PerspectiveProjection } from "../../camera/PerspectiveProjection";
import { PerspectiveProjectionEditor } from "./perspectiveProjectionEditor/PerspectiveProjectionEditor";
import { RenderingContext } from "../../RenderingContext";
import { OrthographicProjection } from "../../camera/OrthographicProjection";
import { OrbitalEditor } from "./orbitalEditor/OrbitalEditor";
import { OrbitalPosition } from "../../utils/OrbiltalPosition";
import { useInstance } from "../../hooks/useInstance";

type Props = {
	camera: Camera
}

export function CameraEditor(props: Props) {
	const projection = props.camera.useProjection()

	const orbital = useInstance(() => {
		const orbital = new OrbitalPosition(props.camera.position, props.camera.rotation)
		orbital.on('change', RenderingContext.render)
		return orbital
	}, (orbital) => {
		orbital.off('change', RenderingContext.render)
	})

	const projectionEditor = useMemo(() => {
		if (projection instanceof PerspectiveProjection)
			return <PerspectiveProjectionEditor projection={projection} />

		return <></>
	}, [projection])

	return <div className="CameraEditor">
		<ProjectionSelect camera={props.camera} />
		<OrbitalEditor orbital={orbital} />
		{projectionEditor}
	</div>
}

const projections = [
	PerspectiveProjection,
	OrthographicProjection
]

function ProjectionSelect(props: { camera: Camera }) {
	function setCamera(projectionClass: (typeof projections)[number]) {
		const projection = new projectionClass(RenderingContext.state.canvas)
		RenderingContext.state.camera.projection = projection
		RenderingContext.render()
	}

	return projections.map(cameraClass => {
		return <div
			className="CameraSelect"
			key={cameraClass.name}
			onClick={() => setCamera(cameraClass)}
			data-selected={props.camera instanceof cameraClass}
		>
			{cameraClass.name}
		</div>
	})
}