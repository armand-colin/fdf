import { Geometry } from "./Geometry"
import { GeometryPrimitive } from "./GeometryPrimitive"
import { Mesh } from "./Mesh"

export class StaticGeometry extends Geometry {

    static fromObj(objText: string, scale: number = 1): StaticGeometry {
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

        return new StaticGeometry(Geometry.Triangles, {
            positions: new Float32Array(positions),
            indices: new Uint16Array(indices),
            uvs: new Float32Array(positions.length)
        })
    }

    constructor(
        readonly primitive: GeometryPrimitive,
        readonly mesh: Mesh
    ) {
        super()
    }

    override bake(): Mesh {
        return this.mesh
    }

    override makeState(): {} {
        return {}
    }

}