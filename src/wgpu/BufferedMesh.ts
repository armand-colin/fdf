import { Mesh } from "../geometry/Mesh";
import { IndexBuffer } from "./IndexBuffer";
import { VertexBuffer } from "./VertexBuffer";

export class BufferedMesh {

    readonly positions: VertexBuffer
    readonly uvs: VertexBuffer
    readonly normals: VertexBuffer

    readonly indices: IndexBuffer

    indexCount: number

    constructor(mesh: Mesh, device: GPUDevice) {
        this.positions = new VertexBuffer({
            array: mesh.positions,
            device
        })
        this.uvs = new VertexBuffer({
            array: mesh.uvs,
            device
        })
        this.normals = new VertexBuffer({
            array: mesh.normals,
            device
        })
        this.indices = new IndexBuffer({
            array: mesh.indices,
            device
        })

        this.indexCount = mesh.indices.length
    }

}