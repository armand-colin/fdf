
export type IndicesArray = Uint8Array | Uint16Array | Uint32Array

export namespace IndicesArray {

    export function fromVertexCount(vertexCount: number, data: number | Iterable<number>): IndicesArray {
        if (vertexCount < 256)
            return new Uint8Array(data as any)

        if (vertexCount < 65_536)
            return new Uint16Array(data as any)

        if (vertexCount < 4_294_967_296)
            return new Uint32Array(data as any)

        throw "Too many vertices for indices array"
    }

}