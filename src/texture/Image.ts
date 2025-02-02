import { Emitter } from "@niloc/utils";
import { ITextureData, TextureRawData } from "./ITextureData";

const defaultImage = new ImageData(1, 1)
defaultImage.data.set([0, 0, 0, 1])

export class Image extends Emitter<{ load: void }> implements ITextureData {

    private _dirty = true

    static fromUrl(imageUrl: string) {
        const image = new globalThis.Image()
        image.src = imageUrl
        return new Image(image)
    }

    constructor(readonly image: HTMLImageElement) {
        super()
        if (!image.complete)
            image.onload = () => {
                this._dirty = true
                this.emit('load', undefined)
            }
    }

    getTextureData(): TextureRawData {
        if (!this.image.complete)
            return defaultImage

        return this.image
    }

    isTextureDataDirty(): boolean {
        return this._dirty
    }

    clearTextureDataDirty(): void {
        this._dirty = false
    }

}