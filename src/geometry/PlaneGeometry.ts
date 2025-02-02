import { Mathf } from "../math/Mathf";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { Geometry } from "./Geometry";
import { GeometryPrimitive } from "./GeometryPrimitive";
import { IndicesArray } from "./IndicesArray";
import { Mesh } from "./Mesh";

type State = {
    resolution: number,
}

export class PlaneGeometry extends Geometry<State> {

    override primitive: GeometryPrimitive = GeometryPrimitive.Triangles

    protected override bake(): Mesh {
        const { resolution } = this.state

        const vertexCount = resolution * resolution

        const minX = -0.5
        const maxX = 0.5
        const minZ = -0.5
        const maxZ = 0.5

        function getVertexIndex(X: number, Z: number) {
            return X + Z * resolution
        }

        const squaresCount = (resolution - 1) * (resolution - 1)

        const positions = new Float32Array(vertexCount * Vec3.size)
        const normals = new Float32Array(vertexCount * Vec3.size)
        const uvs = new Float32Array(vertexCount * Vec2.size)
        const indices = IndicesArray.fromVertexCount(vertexCount, squaresCount * 6)

        let indexI = 0
        for (let Z = 0; Z < resolution; Z++) {
            for (let X = 0; X < resolution; X++) {
                if (X < resolution - 1 && Z < resolution - 1) {
                    // Can make a square
                    indices.set([
                        getVertexIndex(X, Z),
                        getVertexIndex(X + 1, Z + 1),
                        getVertexIndex(X + 1, Z),

                        getVertexIndex(X, Z),
                        getVertexIndex(X, Z + 1),
                        getVertexIndex(X + 1, Z + 1),
                    ], indexI)

                    indexI += 6
                }

                const index = getVertexIndex(X, Z)

                const xt = X / (resolution - 1)
                const zt = Z / (resolution - 1)

                positions.set([
                    Mathf.lerp(minX, maxX, xt),
                    0,
                    Mathf.lerp(minZ, maxZ, zt),
                ], index * Vec3.size)

                normals.set([0, 1, 0], index * Vec3.size)

                uvs.set([xt, zt], index * Vec2.size)
            }
        }

        return {
            indices,
            normals,
            positions,
            uvs
        }
    }

    protected override makeState(): State {
        return {
            resolution: 3,
        }
    }

}