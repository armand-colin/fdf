export type TextureRawData =
    ImageBitmap | ImageData | HTMLImageElement |
    HTMLCanvasElement | HTMLVideoElement | OffscreenCanvas |
    VideoFrame

export interface ITextureData {

    getTextureData(): TextureRawData
    isTextureDataDirty(): boolean
    clearTextureDataDirty(): void

}