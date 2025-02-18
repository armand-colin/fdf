import { Camera } from "./camera/Camera";
import { GL } from "./GL";
import { Scene } from "./Scene";

export class Renderer {

    constructor(
        protected readonly canvas: HTMLCanvasElement,
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
        GL.viewport(0, 0, this.canvas.width, this.canvas.height)
        GL.enable(GL.CULL_FACE)
        GL.enable(GL.DEPTH_TEST)

        // Clear the canvas
        GL.clearColor(0, 0, 0, 0)
        GL.clear(GL.COLOR_BUFFER_BIT)

        this.fit()
        camera.update()

        for (const object of scene.objects) {
            if (!object.enabled)
                continue

            if (object.material && object.geometry)
                object.material.draw(camera, object.transform, object.geometry)
        }
    }

}