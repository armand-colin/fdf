export class Geometry {

    readonly primitive = WebGL2RenderingContext.LINES
    readonly indexType = WebGL2RenderingContext.UNSIGNED_SHORT
    readonly count: number

    constructor(
        readonly positions: Float32Array,
        readonly indices: Uint16Array,
        readonly uvs: Float32Array
    ) {
        this.count = indices.length
    }

}