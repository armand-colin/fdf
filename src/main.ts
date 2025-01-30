import "./style.css"
import { OrthographicCamera } from "./camera/OrthographicCamera"
import { Geometry } from "./Geometry"
import { LineMaterial } from "./material/LineMaterial"
import { Vec3 } from "./math/Vec3"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"
import { Vec3Slider } from "./utils/Vec3Slider"

const canvas = document.body.querySelector("canvas")!
const context = canvas.getContext("webgl2")!

const renderer = new Renderer(canvas, context)

// Fits the viewport
renderer.fit()

const camera = new OrthographicCamera(canvas)
const scene = new Scene()

const object = new Object(
    Geometry.fromLines([[
        new Vec3(-10, -10),
        new Vec3(10, 10)
    ]]),
    new LineMaterial(context)
)

scene.add(object)

new Vec3Slider({
    label: "camera position ",
    max: 100,
    min: -100,
    target: camera.position,
    onChange: render
})

function render() {
    renderer.render(camera, scene)
}

render()