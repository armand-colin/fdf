import { Geometry } from "../geometry/Geometry";
import { IndicesArray } from "../geometry/IndicesArray";
import { StaticGeometry } from "../geometry/StaticGeometry";

export namespace ObjLoader {

    export function load(objText: string): StaticGeometry {
        const v = []
        const vn = []
        const vt = []

        const lines = objText.split("\n")
        // Read v (positions)
        for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts[0] !== "v")
                continue

            v.push(...parts.slice(1).map(x => parseFloat(x)))
        }

        // Read vn (normals)
        for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts[0] !== "vn")
                continue

            vn.push(...parts.slice(1).map(x => parseFloat(x)))
        }

        // Read vt (texture coordinates)
        for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts[0] !== "vt")
                continue

            vt.push(...parts.slice(1).map(x => parseFloat(x)))
        }

        const positions: number[] = []
        const indices: number[] = []
        const normals: number[] = []
        const uvs: number[] = []

        // Read f
        for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts[0] !== "f")
                continue

            // Face data
            const faceVertices = parts.slice(1)
            const facePositions = []
            const faceNormals = []
            const faceUVs = []

            for (const faceVertice of faceVertices) {
                // Doing "- 1", because .obj indices start at 1

                const components = faceVertice.split("/")
                facePositions.push(parseInt(components[0]) - 1)

                if (components.length > 1) {
                    if (components[1].length > 0)
                        faceUVs.push(parseInt(components[1]) - 1)
                }

                if (components.length > 2)
                    faceNormals.push(parseInt(components[2]) - 1)
            }

            const i = positions.length / 3

            for (let i = 0; i < facePositions.length; i++) {
                positions.push(
                    v[facePositions[i] * 3],
                    v[facePositions[i] * 3 + 1],
                    v[facePositions[i] * 3 + 2]
                )

                if (faceNormals.length > i)
                    normals.push(
                        vn[faceNormals[i] * 3],
                        vn[faceNormals[i] * 3 + 1],
                        vn[faceNormals[i] * 3 + 2],
                    )
                else
                    normals.push(0, 1, 0)

                if (faceUVs.length > i)
                    uvs.push(
                        vt[faceUVs[i] * 2],
                        vt[faceUVs[i] * 2 + 1],
                    )
                else
                    uvs.push(0, 0)
            }

            indices.push(i, i + 1, i + 2)

            if (facePositions.length > 3)
                indices.push(i, i + 2, i + 3)
        }

        const vertexCount = positions.length / 3

        return new StaticGeometry(Geometry.Triangles, {
            positions: new Float32Array(positions),
            uvs: new Float32Array(uvs),
            normals: new Float32Array(normals),
            indices: IndicesArray.fromVertexCount(vertexCount, indices)
        })
    }

}