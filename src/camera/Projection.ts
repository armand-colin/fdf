import { Mat4 } from "../math/Mat4";

export class Projection {

    readonly matrix = Mat4.identity()

    constructor(protected readonly canvas: HTMLCanvasElement) { }

}