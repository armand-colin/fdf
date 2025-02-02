import { Mathf } from "../math/Mathf";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Geometry } from "./Geometry";
import { GeometryPrimitive } from "./GeometryPrimitive";
import { IndicesArray } from "./IndicesArray";
import { Mesh } from "./Mesh";

type State = {
    length: number,
    // Subdivisions per line
    resolution: number,
    lineCount: number,
    hasX: boolean,
    hasZ: boolean
}


export class WireframeGeometry extends Geometry<State> {

    override readonly primitive: GeometryPrimitive = GeometryPrimitive.Lines

    override bake(): Mesh {
        const {
            length,
            resolution,
            lineCount,
            hasX,
            hasZ
        } = this.state

        const minX = -length * 0.5
        const maxX = length * 0.5
        const minZ = -length * 0.5
        const maxZ = length * 0.5

        const countX = hasX ? 1 : 0
        const countZ = hasZ ? 1 : 0

        const axisCount = countX + countZ

        const mainVerticesPerEdge = lineCount
        const midpointsPerEdge = (lineCount - 1) * (resolution - 1)

        const mainVerticesCount = mainVerticesPerEdge * mainVerticesPerEdge
        const midPointsPerAxis = midpointsPerEdge * lineCount

        const totalVertexCount = mainVerticesCount + midPointsPerAxis * axisCount

        const segmentsPerEdge = resolution * (lineCount - 1)
        const segmentCount = segmentsPerEdge * lineCount * axisCount

        const positions = new Float32Array(totalVertexCount * Vec3.size)
        const uvs = new Float32Array(totalVertexCount * Vec2.size)
        const indices = IndicesArray.fromVertexCount(totalVertexCount, segmentCount * 2)

        function getMainPointIndex(X: number, Z: number) {
            return Z * lineCount + X
        }

        function getXMidpointPointIndex(X: number, Z: number, R: number) {
            return mainVerticesCount + Z * midpointsPerEdge + X * (resolution - 1) + R
        }

        function getZMidpointPointIndex(X: number, Z: number, R: number) {
            return mainVerticesCount + (midPointsPerAxis * countX) + X * midpointsPerEdge + Z * (resolution - 1) + R
        }

        // Base grid, x is x and z is y
        for (let Z = 0; Z < lineCount; Z++) {
            const zt = Z / (lineCount - 1)

            for (let X = 0; X < lineCount; X++) {
                const xt = X / (lineCount - 1)

                const x = Mathf.lerp(minX, maxX, xt)
                const z = Mathf.lerp(minZ, maxZ, zt)

                const point = new Vec3(x, 0, z)
                positions.set(point.buffer, getMainPointIndex(X, Z) * Vec3.size)
                uvs.set([xt, zt], getMainPointIndex(X, Z) * Vec2.size)
            }
        }

        let indicesI = 0

        // x midpoints
        if (hasX) {
            for (let Z = 0; Z < lineCount; Z++) {
                const zt = Z / (lineCount - 1)

                for (let X = 0; X < lineCount - 1; X++) {
                    let previousIndex = getMainPointIndex(X, Z)

                    for (let R = 0; R < resolution; R++) {
                        const xt = X / (lineCount - 1) + (R / segmentsPerEdge)

                        const nextIndex = R === resolution - 1 ?
                            getMainPointIndex(X + 1, Z) :
                            getXMidpointPointIndex(X, Z, R)

                        // Shall insert segment
                        indices.set([previousIndex, nextIndex], indicesI)
                        indicesI += 2
                        previousIndex = nextIndex

                        if (R === resolution - 1)
                            break

                        const x = Mathf.lerp(minX, maxX, xt)
                        const z = Mathf.lerp(minZ, maxZ, zt)

                        const point = new Vec3(x, 0, z)

                        positions.set(point.buffer, getXMidpointPointIndex(X, Z, R) * Vec3.size)
                        uvs.set([xt, zt], getXMidpointPointIndex(X, Z, R) * Vec2.size)
                    }
                }
            }
        }

        // z midpoints
        if (hasZ) {
            for (let X = 0; X < lineCount; X++) {
                const xt = X / (lineCount - 1)

                for (let Z = 0; Z < lineCount - 1; Z++) {
                    let previousIndex = getMainPointIndex(X, Z)
                    for (let R = 0; R < resolution; R++) {
                        const zt = Z / (lineCount - 1) + (R / segmentsPerEdge)

                        const nextIndex = R === resolution - 1 ?
                            getMainPointIndex(X, Z + 1) :
                            getZMidpointPointIndex(X, Z, R)

                        // Shall insert segment
                        indices.set([previousIndex, nextIndex], indicesI)
                        indicesI += 2
                        previousIndex = nextIndex

                        if (R === resolution - 1)
                            break

                        const x = Mathf.lerp(minX, maxX, xt)
                        const z = Mathf.lerp(minZ, maxZ, zt)

                        const point = new Vec3(x, 0, z)

                        positions.set(point.buffer, getZMidpointPointIndex(X, Z, R) * Vec3.size)
                        uvs.set([xt, zt], getZMidpointPointIndex(X, Z, R) * Vec2.size)
                    }
                }
            }
        }

        return {
            positions,
            uvs,
            indices,
            normals: new Float32Array()
        }
    }

    override makeState(): State {
        return {
            length: 1,
            hasX: true,
            hasZ: false,
            lineCount: 10,
            resolution: 2
        }
    }

}