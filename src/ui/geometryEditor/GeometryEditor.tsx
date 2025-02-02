import { useEffect, useMemo } from "react";
import { Geometry } from "../../geometry/Geometry";
import { Vec3 } from "../../math/Vec3";
import "./GeometryEditor.scss";
import { GeometryPrimitive } from "../../geometry/GeometryPrimitive";
import { WireframeGeometry } from "../../geometry/WireframeGeometry";
import { WireframeGeometryEditor } from "./wireframeGeometryEditor/WireframeGeometryEditor";
import { RenderingContext } from "../../RenderingContext";
import { PlaneGeometry } from "../../geometry/PlaneGeometry";
import { PlaneGeometryEditor } from "./planeGeometryEditor/PlaneGeometryEditor";
import { Section } from "../section/Section";

type Props = {
	geometry: Geometry
}

export function GeometryEditor(props: Props) {
	const mesh = props.geometry.useMesh()

	useEffect(() => {
		props.geometry.on('change', RenderingContext.render)
		return () => props.geometry.off('change', RenderingContext.render)
	}, [props.geometry])

	const elementCount = useMemo(() => {
		switch (props.geometry.primitive) {
			case GeometryPrimitive.Triangles:
				return <>{mesh.indices.length / 3} triangles</>
			case GeometryPrimitive.Lines:
				return <>{mesh.indices.length / 2} lines</>
		}
	}, [props.geometry.primitive, mesh.indices])

	const inner = useMemo(() => {
		if (props.geometry instanceof WireframeGeometry)
			return <WireframeGeometryEditor geometry={props.geometry} />
		if (props.geometry instanceof PlaneGeometry)
			return <PlaneGeometryEditor geometry={props.geometry} />

		return <></>
	}, [props.geometry])

	return <Section 
		className="GeometryEditor"
		label="Geometry"
	>
		<p>Vertices: {mesh.positions.length / Vec3.size}</p>
		<p>Indices: {mesh.indices.length}</p>
		<p>Elements: {elementCount}</p>
		{inner}
	</Section>
}
