import { useMemo } from "react";
import { Texture } from "../../Texture";
import "./TextureEditor.scss";

type Props = {
	label: string,
	texture: Texture | null
}

export function TextureEditor(props: Props) {
	return <div className="TextureEditor">
		<p>{props.label}</p>
		{
			props.texture === null ?
				<small>Aucune texture</small> :
				<TextureRenderer texture={props.texture} />
		}
	</div>
}

function TextureRenderer(props: { texture: Texture }) {
	// TODO: add hook
	const data = props.texture.data
	
	const inner = useMemo(() => {
		if (data instanceof HTMLImageElement)
			return <img src={data.src} />
	}, [data])

	return <div className="TextureRenderer">
		{inner}
	</div>
}