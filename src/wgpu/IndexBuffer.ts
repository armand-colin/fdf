import { IndicesArray } from "../geometry/IndicesArray";

export class IndexBuffer {

    readonly buffer: GPUBuffer;
    readonly offset: number;
    readonly format: GPUIndexFormat;

    constructor(opts: {
        device: GPUDevice;
        array: IndicesArray;
    }) {
        this.buffer = opts.device.createBuffer({
            size: opts.array.byteLength,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.INDEX
        });

        this.offset = 0;
        this.format = opts.array.BYTES_PER_ELEMENT === 2 ? "uint16" : "uint32";

        opts.device.queue.writeBuffer(this.buffer, 0, opts.array);
    }
}
