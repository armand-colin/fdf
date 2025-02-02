import { Emitter } from "@niloc/utils"
import { GL } from "../GL"
import { GeometryPrimitive } from "./GeometryPrimitive"
import { Mesh } from "./Mesh"
import { useObjectField } from "../hooks/useObjectField"

type IndexType = GL["UNSIGNED_SHORT"] | GL["UNSIGNED_BYTE"] | GL["UNSIGNED_INT"]

export abstract class Geometry<State = {}> extends Emitter<{ change: void }> {

    static readonly Lines = WebGL2RenderingContext.LINES
    static readonly Triangles = WebGL2RenderingContext.TRIANGLES

    abstract primitive: GeometryPrimitive

    readonly mesh: Mesh

    private _state: State

    constructor(initState?: Partial<State>) {
        super()
        this._state = { ...this.makeState(), ...initState }
        this.mesh = this.bake()
    }

    get count() {
        return this.mesh.indices.length
    }

    get indexType(): IndexType {
        switch (this.mesh.indices.BYTES_PER_ELEMENT) {
            case 2:
                return GL.UNSIGNED_SHORT
            case 1:
                return GL.UNSIGNED_BYTE
            case 4:
                return GL.UNSIGNED_INT
        }
        throw "Unsupported index type"
    }

    get state(): Readonly<State> {
        return this._state
    }

    update() {
        const mesh = this.bake()

        this.mesh.positions = mesh.positions
        this.mesh.indices = mesh.indices
        this.mesh.uvs = mesh.uvs

        this.emit('change', undefined)
    }

    setState(state: Partial<State>) {
        for (const key in state) {
            if (state[key] !== undefined)
                this._state[key] = state[key]
        }
        this.update()
    }

    useMesh() {
        return useObjectField({
            object: this,
            accessor: geometry => ({ ...geometry.mesh }),
            emitter: this as Geometry<State>,
            event: "change"
        })
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: geometry => ({ ...geometry.state }),
            emitter: this as Geometry<State>,
            event: "change"
        })
    }

    protected abstract bake(): Mesh
    protected abstract makeState(): State

}