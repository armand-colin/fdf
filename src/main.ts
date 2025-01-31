import "./style.css"
import { OrthographicCamera } from "./camera/OrthographicCamera"
import { LineMaterial } from "./material/LineMaterial"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"
import { Vec3Slider } from "./utils/Vec3Slider"
import { OrbitalPosition } from "./utils/OrbiltalPosition"
import { OrbitalSlider } from "./utils/OrbitalSlider"
import { Wireframe } from "./utils/Wireframe"
import { GL, setGl } from "./GL"
import cat from "./assets/cat.jpg"
import face from "./assets/face.png"
import island from "./assets/island.webp"
import cube from "./assets/monkey.obj?raw"
import { Texture } from "./Texture"
import { Slider } from "./ui/Slider"
import { Geometry } from "./Geometry"

const canvas = document.body.querySelector("canvas")!
const context = canvas.getContext("webgl2")!
setGl(context)

const renderer = new Renderer(canvas)

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

// const geometry = Wireframe.make({
//     length: 1000,
//     lineCount: 40,
//     resolution: 5,
//     hideZ: true
// })

const geometry = Geometry.fromOBJ(cube, 100)

const material = new LineMaterial()

const gradient = new ImageData(3, 1)
gradient.data.set([255, 0, 0, 255], 0)
gradient.data.set([0, 255, 0, 255], 4)
gradient.data.set([0, 0, 255, 255], 8)

const gradientTexture = new Texture(gradient)
material.gradient = gradientTexture

// Texture.fromImage(cat).then(texture => {
//     material.texture = texture
//     render()
// })
Texture.fromImage(face).then(texture => {
    material.texture = texture
    render()
})

const object = new Object(
    geometry,
    material
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

const heightSlider = new Slider({
    label: "Height",
    max: 1000,
    min: -1000,
    defaultValue: material.height,
    step: 1,
})

heightSlider.on('change', height => {
    material.height = height
    render()
})

function render() {
    renderer.render(camera, scene)
}

render()