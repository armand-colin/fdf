export class VertexBuffer {

    readonly buffer: GPUBuffer;
    readonly offset: number;

    constructor(opts: {
        device: GPUDevice;
        array: Float32Array;
    }) {
        this.buffer = opts.device.createBuffer({
            size: opts.array.byteLength,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX
        })

        this.offset = 0

        opts.device.queue.writeBuffer(this.buffer, 0, opts.array)
    }
}
