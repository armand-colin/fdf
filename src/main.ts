import { Camera } from "./camera/Camera"
import { Geometry } from "./Geometry"
import { LineMaterial } from "./material/LineMaterial"
import { Vec3 } from "./math/Vec3"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"

async function main() {
    const canvas = document.body.querySelector("canvas")!
    const context = canvas.getContext("webgl2")!

    const renderer = new Renderer(canvas, context)
    // Fits the viewport
    renderer.fit()

    const camera = new Camera()
    const scene = new Scene()

    const object = new Object(
        Geometry.fromLines([[
            new Vec3(0, 0), 
            new Vec3(0, 1)
        ]]),
        new LineMaterial(context)
    )

    scene.add(object)

    renderer.render(camera, scene)
}

main()