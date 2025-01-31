import { GL } from "./GL";

type Data = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | OffscreenCanvas | VideoFrame


type Format = GL["RGBA"] | GL["RED"]

type Opts = {
    format: Format
}

export class Texture {

    private readonly _texture: WebGLTexture
    private _data: Data

    static fromImage(imageUrl: string, opts?: Partial<Opts>): Promise<Texture> {
        return new Promise<Texture>((resolve, reject) => {
            const image = new Image()
            image.src = imageUrl

            image.onload = () => {
                const texture = new Texture(image, opts)
                resolve(texture)
            }

            image.onerror = reject
        })
    }

    private _format: Format

    constructor(data: Data, opts?: Partial<Opts>) {
        this._texture = GL.createTexture()
        this._data = data
        this._format = opts?.format ?? GL.RGBA

        GL.bindTexture(GL.TEXTURE_2D, this._texture)
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this._format, GL.UNSIGNED_BYTE, this._data)
        GL.generateMipmap(GL.TEXTURE_2D)
    }

    bind() {
        GL.bindTexture(GL.TEXTURE_2D, this._texture)
    }

}