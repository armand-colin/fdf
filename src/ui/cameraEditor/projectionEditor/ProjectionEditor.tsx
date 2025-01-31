import { useEffect, useMemo } from "react";
import { Projection } from "../../../camera/Projection";
import { RenderingContext } from "../../../RenderingContext";
import "./ProjectionEditor.scss";
import { OrthographicProjectionEditor } from "../orthographicProjectionEditor/OrthographicProjectionEditor";
import { PerspectiveProjectionEditor } from "../perspectiveProjectionEditor/PerspectiveProjectionEditor";
import { PerspectiveProjection } from "../../../camera/PerspectiveProjection";
import { OrthographicProjection } from "../../../camera/OrthographicProjection";

type Props = {
	projection: Projection
}

export function ProjectionEditor(props: Props) {
	useEffect(() => {
		props.projection.on('change', RenderingContext.render)
		return () => props.projection.off('change', RenderingContext.render)
	}, [props.projection])

	const inner = useMemo(() => {
		if (props.projection instanceof PerspectiveProjection)
			return <PerspectiveProjectionEditor projection={props.projection} />

		if (props.projection instanceof OrthographicProjection)
			return <OrthographicProjectionEditor projection={props.projection} />

		return <></>
	}, [props.projection])

	return <div className="ProjectionEditor">
		{inner}
	</div>
}
