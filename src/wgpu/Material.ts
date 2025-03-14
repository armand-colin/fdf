import { nanoid } from "nanoid"
import { Camera } from "../camera/Camera"
import { Mat4 } from "../math/Mat4"
import { Transform } from "../Transform"
import { BufferedMesh } from "./BufferedMesh"
import { Color } from "../math/Color"

class InstancedAlbedoMaterial {

    pipeline: GPURenderPipeline

    private _uniformsBuffer: GPUBuffer
    private _uniformsBindGroup: GPUBindGroup
    private _uniforms: Float32Array

    constructor(
        format: GPUTextureFormat,
        readonly device: GPUDevice,
        readonly material: AlbedoMaterial
    ) {
        const module = device.createShaderModule({
            label: "shader",
            code: shader
        })

        this.pipeline = device.createRenderPipeline({
            label: "pipeline",
            layout: "auto",
            vertex: {
                module,
                buffers: [
                    {
                        arrayStride: 3 * 4,
                        attributes: [
                            {
                                format: "float32x3",
                                offset: 0,
                                shaderLocation: 0
                            }
                        ]
                    }
                ]
            },
            fragment: {
                module,
                targets: [{ format }],
            }
        })

        this._uniforms = new Float32Array(Mat4.size * 3)

        this._uniformsBuffer = device.createBuffer({
            size: this._uniforms.byteLength,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM
        })

        const a = this.pipeline.getBindGroupLayout(0)
        console.log(a)
        // this._uniformsBindGroup = device.createBindGroup({
        //     layout: this.pipeline.getBindGroupLayout(0),
        //     entries: [
        //         { binding: 0, resource: { buffer: this._uniformsBuffer } },
        //     ],
        // })
    }

    render(opts: {
        encoder: GPURenderPassEncoder,
        camera: Camera,
        transform: Transform,
        mesh: BufferedMesh
    }) {
        opts.encoder.setPipeline(this.pipeline)

        // Load uniforms
        this._uniforms.set(opts.transform.matrix.buffer, 0)
        this._uniforms.set(opts.camera.view.buffer, Mat4.size)
        this._uniforms.set(opts.camera.projection.matrix.buffer, Mat4.size * 2)
        this.device.queue.writeBuffer(this._uniformsBuffer, 0, this._uniforms)
        opts.encoder.setBindGroup(0, this._uniformsBindGroup)

        // Load buffers
        opts.encoder.setVertexBuffer(0, opts.mesh.positions.buffer)
        opts.encoder.setIndexBuffer(opts.mesh.indices.buffer, opts.mesh.indices.format, opts.mesh.indices.offset)

        opts.encoder.drawIndexed(opts.mesh.indexCount)
    }

}

export class AlbedoMaterial {

    id = nanoid()

    color: Color = Color.black()

    constructor() { }

    instantiate(device: GPUDevice, format: GPUTextureFormat) {
        return new InstancedAlbedoMaterial(format, device, this)
    }

}

const shader = /*wgsl*/`

struct Uniforms {
    model: mat4x4<f32>,
    view: mat4x4<f32>,
    projection: mat4x4<f32>,
};

struct VertexData {
    @location(0) position: vec3f,
};

struct FragmentData {
    @builtin(position) position: vec4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex 
fn vertex_shader(vertex: VertexData) -> FragmentData {
    var fragment: FragmentData;

    // fragment.position = uniforms.projection * uniforms.view * uniforms.model * vec4f(vertex.position, 1.0);
    fragment.position = vec4f(vertex.position, 1.0);
    
    return fragment;
}

@fragment 
fn fragment_shader(fragment: FragmentData) -> @location(0) vec4f {
    return vec4f(1.0, 0.0, 0.0, 1.0);
}

`