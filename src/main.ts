import "./style.css"
import { OrthographicCamera } from "./camera/OrthographicCamera"
import { Geometry } from "./Geometry"
import { LineMaterial } from "./material/LineMaterial"
import { Vec3 } from "./math/Vec3"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"
import { Vec3Slider } from "./utils/Vec3Slider"
import { Strips } from "./utils/Strips"
import { PerspectiveCamera } from "./camera/PerspectiveCamera"
import { OrbitalPosition } from "./utils/OrbiltalPosition"
import { Slider } from "./ui/Slider"
import { OrbitalSlider } from "./utils/OrbitalSlider"

const canvas = document.body.querySelector("canvas")!
const context = canvas.getContext("webgl2")!

const renderer = new Renderer(canvas, context)

// Fits the viewport
renderer.fit()

const camera = new OrthographicCamera(canvas)
// const camera = new PerspectiveCamera({
//     canvas,
//     far: 10_000,
//     fov: Math.PI / 2,
//     near: 0.5
// })

const scene = new Scene()

const orbital = new OrbitalPosition(camera.position, camera.rotation)
orbital.on('change', render)

OrbitalSlider.make(orbital)

const stripsX = Strips.make({
    axis: Vec3.right(),
    direction: Vec3.forward(),
    length: 1000,
    lineCount: 20,
    resolution: 2
})
const stripsZ = Strips.make({
    axis: Vec3.forward(),
    direction: Vec3.right(),
    length: 1000,
    lineCount: 20,
    resolution: 2
})

const object = new Object(
    Geometry.fromLines([...stripsX, ...stripsZ]),
    new LineMaterial(context)
)

scene.add(object)

new Vec3Slider({
    label: "camera position ",
    max: 1000,
    min: -1000,
    target: camera.position,
    onChange: render
})

new Vec3Slider({
    label: "camera rotation ",
    max: Math.PI * 2,
    min: -Math.PI * 2,
    target: camera.rotation,
    step: 0.05,
    onChange: render
})

function render() {
    renderer.render(camera, scene)
}

render()