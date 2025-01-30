import { Camera } from "./Camera";
import { Scene } from "./Scene";

type Context = WebGL2RenderingContext

export class Renderer {

    constructor(protected readonly context: Context) {

    }

    render(camera: Camera, scene: Scene) {

    }

}