
export type IndicesArray = Uint8Array | Uint16Array | Uint32Array

export namespace IndicesArray {

    export function fromVertexCount(vertexCount: number, length: number): IndicesArray {
        if (vertexCount < 256)
            return new Uint8Array(length)

        if (vertexCount < 65_536)
            return new Uint16Array(length)

        if (vertexCount < 4_294_967_296)
            return new Uint32Array(length)

        throw "Too many vertices for indices array"
    }

}