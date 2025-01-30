import { Vec3 } from "../math/Vec3";

export namespace Strips {

    export function make(opts: {
        length: number,
        axis: Vec3,
        direction: Vec3,
        resolution: number,
        lineCount: number
    }): Array<Vec3[]> {

        const minStart = opts.axis.multiplyScalar(-opts.length / 2)
            .add(opts.direction.multiplyScalar(-opts.length / 2))

        const maxStart = opts.axis.multiplyScalar(-opts.length / 2)
            .add(opts.direction.multiplyScalar(opts.length / 2))

        const minEnd = opts.axis.multiplyScalar(opts.length / 2)
            .add(opts.direction.multiplyScalar(-opts.length / 2))

        const maxEnd = opts.axis.multiplyScalar(opts.length / 2)
            .add(opts.direction.multiplyScalar(opts.length / 2))

        const lines: Array<Vec3[]> = []

        // Horizontal lines
        for (let i = 0; i < opts.lineCount; i++) {
            const t = i / (opts.lineCount - 1)

            const lineStart = Vec3.lerp(minStart, maxStart, t)
            const lineEnd = Vec3.lerp(minEnd, maxEnd, t)
            const line: Vec3[] = []

            for (let k = 0; k < opts.resolution; k++) {
                const t = k / (opts.resolution - 1)

                const point = Vec3.lerp(lineStart, lineEnd, t)
                line.push(point)
            }

            lines.push(line)
        }

        return lines
    }

}