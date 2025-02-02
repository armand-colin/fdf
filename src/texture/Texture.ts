import { Emitter } from "@niloc/utils";
import { GL } from "../GL";
import { useObjectField } from "../hooks/useObjectField";
import { Image } from "./Image";
import { ITextureData } from "./ITextureData";

type Format = GL["RGBA"] | GL["RED"]

type Opts = {
    format: Format
}

export class Texture extends Emitter<{ change: void }> {

    private readonly _texture: WebGLTexture

    private _data: ITextureData

    static fromImage(imageUrl: string, opts?: Partial<Opts>) {
        const image = Image.fromUrl(imageUrl)
        return new Texture(image, opts)
    }

    private _format: Format

    constructor(data: ITextureData, opts?: Partial<Opts>) {
        super()
        this._texture = GL.createTexture()
        this._data = data
        this._format = opts?.format ?? GL.RGBA

        this.load()
    }

    get data(): ITextureData {
        return this._data
    }

    setData(data: ITextureData) {
        this._data = data
        this.load()
        this.emit('change', undefined)
    }

    useData() {
        return useObjectField({
            object: this,
            accessor: texture => texture.data,
            emitter: this as Texture,
            event: "change"
        })
    }

    load() {
        GL.bindTexture(GL.TEXTURE_2D, this._texture)
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this._format, GL.UNSIGNED_BYTE, this._data.getTextureData())
        GL.generateMipmap(GL.TEXTURE_2D)
        this._data.clearTextureDataDirty()
    }

    bind(location: WebGLUniformLocation | null, i: number) {
        if (this._data.isTextureDataDirty()) 
            this.load()
        
        GL.activeTexture(GL.TEXTURE0 + i)
        GL.bindTexture(GL.TEXTURE_2D, this._texture)
        GL.uniform1i(location, i)
    }

}