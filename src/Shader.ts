import { Color } from "./math/Color";
import { Mat4 } from "./math/Mat4";
import { Vec3 } from "./math/Vec3";

type Uniform = Mat4 | Color | Vec3 | number

export class Shader {

    private _module: GPUShaderModule

    constructor(opts: { device: GPUDevice, label: string, code: string }) {
        const module = opts.device.createShaderModule({
            label: opts.label,
            code: opts.code,
        })

        const pipeline = device.createRenderPipeline({
            label: 'our hardcoded red triangle pipeline',
            layout: 'auto',
            vertex: {
                entryPoint: 'vs',
                module,
            },
            fragment: {
                entryPoint: 'fs',
                module,
                targets: [{ format: presentationFormat }],
            },
        })
    }

}

