import { Color } from "./math/Color";
import { Mat4 } from "./math/Mat4";
import { Vec3 } from "./math/Vec3";

type Uniform = Mat4 | Color | Vec3 | number

export class Pipeline {

    private _pipeline: GPURenderPipeline

    constructor(opts: { 
        device: GPUDevice, 
        presentationFormat: GPUTextureFormat 
    }) {
        const module = opts.device.createShaderModule({
            label: "shader",
            code: shader
        })

        this._pipeline = opts.device.createRenderPipeline({
            label: "pipeline",
            layout: 'auto',
            vertex: {
                entryPoint: 'vertex_shader',
                module,
            },
            fragment: {
                entryPoint: 'fragment_shader',
                module,
                targets: [{ format: opts.presentationFormat }],
            }
        })
    }

    render(opts: { 
        view: GPUTextureView,
        encoder: GPUCommandEncoder
    }) {
        // make a render pass encoder to encode render specific commands
        const pass = opts.encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: opts.view,
                    loadOp: "clear",
                    storeOp: "store",
                    clearValue: Color.black().buffer
                }
            ]
        })

        pass.setPipeline(this._pipeline)
        pass.draw(3)
        pass.end()
    }

}

const shader = /*wgsl*/`

@vertex 
fn vertex_shader(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
    let pos = array(
        vec2f( 0.0,  0.5), 
        vec2f(-0.5, -0.5),
        vec2f( 0.5, -0.5)
    );

    return vec4f(pos[vertexIndex], 0.0, 1.0);
}

@fragment 
fn fragment_shader() -> @location(0) vec4f {
    return vec4f(1.0, 0.0, 0.0, 1.0);
}

`