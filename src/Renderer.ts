import { Camera } from "./camera/Camera";
import { Scene } from "./Scene";

type Context = WebGL2RenderingContext

export class Renderer {

    constructor(
        protected readonly canvas: HTMLCanvasElement,
        protected readonly context: Context
    ) { }

    fit(): boolean {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const displayWidth = this.canvas.clientWidth
        const displayHeight = this.canvas.clientHeight

        // Check if the canvas is not the same size.
        const needResize = this.canvas.width !== displayWidth ||
            this.canvas.height !== displayHeight

        if (needResize) {
            // Make the canvas the same size
            this.canvas.width = displayWidth
            this.canvas.height = displayHeight
        }

        return needResize
    }

    render(camera: Camera, scene: Scene) {
        // Set the viewport
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height)

        // Clear the canvas
        this.context.clearColor(0, 0, 0, 0)
        this.context.clear(this.context.COLOR_BUFFER_BIT)

        for (const object of scene.objects)
            object.material.draw(camera, object.geometry)
    }

}