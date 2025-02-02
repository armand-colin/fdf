import "./style/index.scss"
import "./style.css"
import { HeightMapMaterial } from "./material/HeightMapMaterial"
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
import { Texture } from "./texture/Texture"
import { WireframeGeometry } from "./geometry/WireframeGeometry"
import monkeyObj from "./assets/monkey.obj?raw"
import { BlinnPhongMaterial } from "./material/BlinnPhongMaterial"
import { ObjLoader } from "./utils/ObjLoader"
import { PlaneGeometry } from "./geometry/PlaneGeometry"
import { Color } from "./math/Color"
import { Gradient } from "./Gradient"
import { Image } from "./texture/Image"
import { CanvasContainer } from "./utils/CanvasContainer"

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

const heightMapData = Image.fromUrl(face)
const heightMap = new Texture(heightMapData)

heightMapData.on('load', RenderingContext.render)

const wireframe = (() => {
    const geometry = new WireframeGeometry()
    const material = new HeightMapMaterial()

    const gradient = new Gradient([
        { t: 0, color: Color.red() },
        { t: 0.5, color: Color.green() },
        { t: 1, color: Color.blue() },
    ])

    const gradientTexture = new Texture(gradient)
    material.setState({
        gradient: gradientTexture,
        heightMap,
        height: -0.5
    })

    return new Object({
        name: "Wireframe",
        geometry,
        material
    })
})()

const wireframeUnder = (() => {
    const geometry = new PlaneGeometry()
    const material = new HeightMapMaterial()

    const gradient = new Gradient([
        { t: 0, color: Color.red() },
        { t: 0.5, color: Color.green() },
        { t: 1, color: Color.blue() },
    ])

    const gradientTexture = new Texture(gradient)

    const heightMapData = Image.fromUrl(face)
    const heightMap = new Texture(heightMapData)

    material.setState({
        gradient: gradientTexture,
        heightMap,
        height: -0.5
    })

    return new Object({
        name: "Wireframe Back",
        geometry,
        material
    })
})()

const monkey = (() => {
    const geometry = ObjLoader.load(monkeyObj)
    const material = new BlinnPhongMaterial()

    return new Object({
        name: "Monkey",
        geometry,
        material
    })
})()

// Texture.fromImage(cat).then(texture => {
//     material.texture = texture
//     render()
// })

wireframe.enabled = false
monkey.enabled = false

scene.add(wireframe)
scene.add(wireframeUnder)
scene.add(monkey)

function render() {
    renderer.render(camera, scene)
}

render()

// Render your React component instead
const root = createRoot(document.getElementById('app')!)
root.render(<Editor />)

new CanvasContainer(document.querySelector("#canvas-container")!)