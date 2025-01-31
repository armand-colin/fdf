import "./style.css"
import { LineMaterial } from "./material/LineMaterial"
import { Object } from "./Object"
import { Renderer } from "./Renderer"
import { Scene } from "./Scene"
import { setGl } from "./GL"
import face from "./assets/face.png"
import { createRoot } from 'react-dom/client';
import { Editor } from "./ui/editor/Editor"
import { RenderingContext } from "./RenderingContext"
import { OrthographicProjection } from "./camera/OrthographicProjection"
import { Camera } from "./camera/Camera"
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

const projection = new OrthographicProjection(canvas)
const camera = new Camera(projection)
const scene = new Scene()

RenderingContext.init({
    canvas,
    camera,
    renderer,
    scene,
})

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

// Render your React component instead
const root = createRoot(document.getElementById('app')!)
root.render(<Editor />)