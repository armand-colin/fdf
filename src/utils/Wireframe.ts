import { Geometry } from "../Geometry";
import { Mathf } from "../math/Mathf";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";

export namespace Wireframe {

    export function make(opts: {
        length: number,
        // Subdivisions per line
        resolution: number,
        lineCount: number,
        hideX?: boolean,
        hideZ?: boolean
    }): Geometry {

        const minX = -opts.length * 0.5
        const maxX = opts.length * 0.5
        const minZ = -opts.length * 0.5
        const maxZ = opts.length * 0.5

        const hasX = opts.hideX ? 0 : 1
        const hasZ = opts.hideZ ? 0 : 1

        const axisCount = hasX + hasZ

        const mainVerticesPerEdge = opts.lineCount
        const midpointsPerEdge = (opts.lineCount - 1) * (opts.resolution - 1)

        const mainVerticesCount = mainVerticesPerEdge * mainVerticesPerEdge
        const midPointsPerAxis = midpointsPerEdge * opts.lineCount

        const totalVertexCount = mainVerticesCount + midPointsPerAxis * axisCount

        const segmentsPerEdge = opts.resolution * (opts.lineCount - 1)
        const segmentCount = segmentsPerEdge * opts.lineCount * axisCount

        const positions = new Float32Array(totalVertexCount * Vec3.size)
        const uvs = new Float32Array(totalVertexCount * Vec2.size)
        const indices = new Uint16Array(segmentCount * 2)

        function getMainPointIndex(X: number, Z: number) {
            return Z * opts.lineCount + X
        }

        function getXMidpointPointIndex(X: number, Z: number, R: number) {
            return mainVerticesCount + Z * midpointsPerEdge + X * (opts.resolution - 1) + R
        }

        function getZMidpointPointIndex(X: number, Z: number, R: number) {
            return mainVerticesCount + (midPointsPerAxis * hasX) + X * midpointsPerEdge + Z * (opts.resolution - 1) + R
        }

        // Base grid, x is x and z is y
        for (let Z = 0; Z < opts.lineCount; Z++) {
            const zt = Z / (opts.lineCount - 1)

            for (let X = 0; X < opts.lineCount; X++) {
                const xt = X / (opts.lineCount - 1)

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
            for (let Z = 0; Z < opts.lineCount; Z++) {
                const zt = Z / (opts.lineCount - 1)

                for (let X = 0; X < opts.lineCount - 1; X++) {
                    let previousIndex = getMainPointIndex(X, Z)

                    for (let R = 0; R < opts.resolution; R++) {
                        const xt = X / (opts.lineCount - 1) + (R / segmentsPerEdge)

                        const nextIndex = R === opts.resolution - 1 ?
                            getMainPointIndex(X + 1, Z) :
                            getXMidpointPointIndex(X, Z, R)

                        // Shall insert segment
                        indices.set([previousIndex, nextIndex], indicesI)
                        indicesI += 2
                        previousIndex = nextIndex

                        if (R === opts.resolution - 1)
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
            for (let X = 0; X < opts.lineCount; X++) {
                const xt = X / (opts.lineCount - 1)

                for (let Z = 0; Z < opts.lineCount - 1; Z++) {
                    let previousIndex = getMainPointIndex(X, Z)
                    for (let R = 0; R < opts.resolution; R++) {
                        const zt = Z / (opts.lineCount - 1) + (R / segmentsPerEdge)

                        const nextIndex = R === opts.resolution - 1 ?
                            getMainPointIndex(X, Z + 1) :
                            getZMidpointPointIndex(X, Z, R)

                        // Shall insert segment
                        indices.set([previousIndex, nextIndex], indicesI)
                        indicesI += 2
                        previousIndex = nextIndex

                        if (R === opts.resolution - 1)
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

        return new Geometry(
            positions,
            indices,
            uvs
        )
    }
}
