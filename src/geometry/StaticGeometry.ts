import { Geometry } from "./Geometry"
import { GeometryPrimitive } from "./GeometryPrimitive"
import { Mesh } from "./Mesh"

type State = {
    mesh: Mesh
}

export class StaticGeometry extends Geometry<State> {

    constructor(
        readonly primitive: GeometryPrimitive,
        mesh: Mesh
    ) {
        super({ mesh })
    }

    override bake(): Mesh {
        return this.state.mesh
    }

    override makeState(): State {
        return {
            mesh: {
                positions: new Float32Array(),
                indices: new Uint8Array(),
                normals: new Float32Array(),
                uvs: new Float32Array()
            }
        }
    }

}