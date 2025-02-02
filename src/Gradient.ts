import { Emitter } from "@niloc/utils";
import { Color } from "./math/Color";
import { ITextureData, TextureRawData } from "./texture/ITextureData";

export type GradientPoint = {
    t: number,
    color: Color
}

export class Gradient extends Emitter<{ change: void }> implements ITextureData {

    readonly points: GradientPoint[]
    readonly imageData: ImageData

    private _resolution: number = 3
    private _dirty = true

    constructor(points: GradientPoint[]) {
        super()
        this.points = [...points].sort((a, b) => a.t - b.t)
        this.imageData = new ImageData(this._resolution, 1)
        this.bake()
    }

    bake() {
        for (let X = 0; X < this._resolution; X++) {
            const t = X / (this._resolution - 1)

            let i = -1
            for (let ii = 0; ii < this.points.length; ii++) {
                if (this.points[ii].t <= t)
                    i = ii
            }

            let color: Color
            if (i === -1) {
                color = this.points[0].color
            } else if (i === this.points.length - 1) {
                color = this.points[this.points.length - 1].color
            } else {
                // we are between point i and i + 1
                const prevT = this.points[i].t
                const nextT = this.points[i + 1].t

                const segmentT = (t - prevT) / (nextT - prevT)
                color = Color.lerp(this.points[i].color, this.points[i + 1].color, segmentT)
            }

            this.imageData.data[X * 4 + 0] = Math.round(color.r * 255)
            this.imageData.data[X * 4 + 1] = Math.round(color.g * 255)
            this.imageData.data[X * 4 + 2] = Math.round(color.b * 255)
            this.imageData.data[X * 4 + 3] = Math.round(color.a * 255)
        }
    }

    getTextureData(): TextureRawData {
        return this.imageData
    }

    isTextureDataDirty(): boolean {
        return this._dirty
    }

    clearTextureDataDirty(): void {
        this._dirty = false
    }

}