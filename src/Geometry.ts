export class Geometry {

    static fromOBJ(objText: string, scale: number): Geometry {
        const positions: number[] = []
        const indices: number[] = []

        const lines = objText.split("\n")
        for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts[0] === "v")
                positions.push(...parts.slice(1).map(parseFloat).map(v => v * scale))
            else if (parts[0] === "f")
                indices.push(...parts.slice(1).map(v => parseInt(v.split("/")[0]) - 1))
        }

        return new Geometry(new Float32Array(positions), new Uint16Array(indices), new Float32Array())
    }

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