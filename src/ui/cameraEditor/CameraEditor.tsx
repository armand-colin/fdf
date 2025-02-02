import { Camera } from "../../camera/Camera";
import "./CameraEditor.scss";
import { PerspectiveProjection } from "../../camera/PerspectiveProjection";
import { RenderingContext } from "../../RenderingContext";
import { OrthographicProjection } from "../../camera/OrthographicProjection";
import { OrbitalEditor } from "./orbitalEditor/OrbitalEditor";
import { OrbitalPosition } from "../../utils/OrbitalPosition";
import { useInstance } from "../../hooks/useInstance";
import { ProjectionEditor } from "./projectionEditor/ProjectionEditor";
import { Section } from "../section/Section";
import { Button } from "../button/Button";

type Props = {
	camera: Camera
}

export function CameraEditor(props: Props) {
	const projection = props.camera.useProjection()

	const orbital = useInstance(() => {
		const orbital = new OrbitalPosition(props.camera.position, props.camera.rotation)
		orbital.on('change', RenderingContext.render)
		orbital.update()
		return orbital
	}, (orbital) => {
		orbital.off('change', RenderingContext.render)
	})

	return <Section
		label="Camera"
		className="CameraEditor"
	>
		<ProjectionSelect camera={props.camera} />
		<ProjectionEditor projection={projection} />
		<OrbitalEditor orbital={orbital} />
	</Section>
}

const projections = [{
	label: "Perspective",
	class: PerspectiveProjection,
}, {
	label: "Orthographic",
	class: OrthographicProjection
}]

function ProjectionSelect(props: { camera: Camera }) {
	function setProjection(projectionItem: (typeof projections)[number]) {
		const projection = new projectionItem.class(RenderingContext.state.canvas)
		RenderingContext.state.camera.projection = projection
		RenderingContext.render()
	}

	return <div className="ProjectionSelect">
		{
			projections.map(projectionItem => {
				return <Button
					label={projectionItem.label}
					onClick={() => setProjection(projectionItem)}
					contrast={!!(props.camera.projection instanceof projectionItem.class)}
				/>
			})
		}
	</div>
}