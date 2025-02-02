import { useMemo } from "react";
import { Texture } from "../../texture/Texture";
import "./TextureEditor.scss";
import { Image } from "../../texture/Image";
import { Gradient } from "../../Gradient";
import { GradientEditor } from "../gradientEditor/GradientEditor";

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
				<TextureEditorNotNull texture={props.texture} />
		}
	</div>
}

function TextureEditorNotNull(props: { texture: Texture }) {
	const textureData = props.texture.useData()

	const inner = useMemo(() => {
		if (textureData instanceof Image)
			return <img src={textureData.image.src} />

		if (textureData instanceof Gradient)
			return <GradientEditor
				gradient={textureData}
				label="Gradient"
				onChange={gradient => props.texture.setData(gradient)}
			/>
	}, [textureData])

	return <div className="TextureRenderer">
		{inner}
	</div>
}