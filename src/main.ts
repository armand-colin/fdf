import { Camera } from "./Camera"
import { Geometry } from "./Geometry"
import { Material } from "./Material"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"
import { Shader } from "./Shader"

async function main() {
    const canvas = document.body.querySelector("canvas")!
    const context = canvas.getContext("webgl2")!

    const renderer = new Renderer(context)

    const shader = new Shader()
    const camera = new Camera()

    const scene = new Scene()

    const object = new Object(
        new Geometry(),
        new Material(shader)
    )

    scene.add(object)

    renderer.render(camera, scene)
}

main()

console.log("hello")