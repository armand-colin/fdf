import { MouseEvent } from "react";
import { ContextualMenuController } from "../../controllers/ContextualMenuController";
import { Library } from "../../library/Library";
import { Resource } from "../../library/Resource";
import { Injection } from "../../utils/Injection";
import { ResourceDropZone } from "../dragAndDrop/resourceDropZone/ResourceDropZone";
import "./LibraryWindow.scss";
import { ResourceTile } from "./resourceTile/ResourceTile";
import { BlinnPhongMaterial } from "../../material/BlinnPhongMaterial";
import { SelectionController } from "../../controllers/SelectionController";
import { HeightMapMaterial } from "../../material/HeightMapMaterial";
import { PlaneGeometry } from "../../geometry/PlaneGeometry";
import { WireframeGeometry } from "../../geometry/WireframeGeometry";
import { StaticGeometry } from "../../geometry/StaticGeometry";
import { ObjLoader } from "../../utils/ObjLoader";

type Props = {
	library: Library
}


async function createStaticMesh(): Promise<StaticGeometry | null> {
	return new Promise((resolve) => {
		const input = document.createElement("input")
		input.type = "file"
		input.accept = ".obj"
		input.onchange = async () => {
			if (!input.files || input.files.length === 0)
				return resolve(null)
			
			const file = input.files.item(0)
			if (!file)
				return resolve(null)
	
			const text = await file.text()
			const geometry = ObjLoader.load(text)
			resolve(geometry)
		}
		input.click()
	})
}

function createResource(factory: () => (Resource | null) | Promise<Resource | null>) {
	return async function () {
		const resource = await factory()
		if (!resource)
			return

		Injection.get(Library).add(resource)
		Injection.get(SelectionController).setSelection(resource)
	}
}

export function LibraryWindow(props: Props) {
	const resources = props.library.useResources()


	function onContextMenu(e: MouseEvent) {
		Injection.get(ContextualMenuController).open(e, [
			{
				label: "Material",
				actions: [
					{
						label: "Blinn Phong",
						action: createResource(() => new BlinnPhongMaterial())
					},
					{
						label: "Height Map",
						action: createResource(() => new HeightMapMaterial())
					}
				]
			},
			{
				label: "Geometry",
				actions: [
					{
						label: "Plane",
						action: createResource(() => new PlaneGeometry())
					},
					{
						label: "Wireframe",
						action: createResource(() => new WireframeGeometry())
					},
					{
						label: "Static",
						action: createResource(createStaticMesh)
					}
				]
			}
		])
	}

	return <div
		className="LibraryWindow"
		onContextMenu={onContextMenu}
	>
		{
			resources.map(resource => <ResourceTile
				resource={resource}
				key={resource.id}
			/>)
		}

		<ResourceDropZone
			onDrop={console.log.bind("DROPPED")}
			allows={(r): r is Resource => true}
		>
			Drop zone
		</ResourceDropZone>
	</div>
}
