import { OrthographicCamera } from "./camera/OrthographicCamera"
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

    const camera = new OrthographicCamera()
    const scene = new Scene()

    const object = new Object(
        Geometry.fromLines([[
            new Vec3(100, 100, -100),
            new Vec3(-1000, -1000, 100)
        ]]),
        new LineMaterial(context)
    )

    scene.add(object)

    renderer.render(camera, scene)
}

main()