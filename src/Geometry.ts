import { Vec3 } from "./math/Vec3"

export class Geometry {

    static fromLines(lines: Array<Vec3[]>): Geometry {
        let lineCount = 0
        let vertexCount = 0

        for (const line of lines) {
            lineCount += line.length - 1
            vertexCount += line.length
        }

        const positions = new Float32Array(vertexCount * Vec3.size)
        const indices = new Uint16Array(lineCount * 2)

        let positionI = 0
        let indexI = 0

        for (const line of lines) {
            for (let i = 0; i < line.length; i++) {
                positions.set(line[i].buffer, positionI * Vec3.size)
                if (i > 0) {
                    // add line
                    indices.set([positionI - 1, positionI], indexI + i - 1)
                    indexI += 2
                }
                positionI++
            }
        }

        return new Geometry(positions, indices)
    }

    readonly primitive = WebGL2RenderingContext.LINES
    readonly indexType = WebGL2RenderingContext.UNSIGNED_SHORT
    readonly count: number

    constructor(
        readonly positions: Float32Array,
        readonly indices: Uint16Array
    ) {
        this.count = indices.length
    }

}