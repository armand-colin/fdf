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
import { Texture } from "./Texture"
import { WireframeGeometry } from "./geometry/WireframeGeometry"
import { StaticGeometry } from "./geometry/StaticGeometry"
import monkeyObj from "./assets/monkey.obj?raw"
import { BlinnPhongMaterial } from "./material/BlinnPhongMaterial"

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


const wireframe = (() => {
    const geometry = new WireframeGeometry()
    const material = new HeightMapMaterial()

    const gradient = new ImageData(3, 1)
    gradient.data.set([255, 0, 0, 255], 0)
    gradient.data.set([0, 255, 0, 255], 4)
    gradient.data.set([0, 0, 255, 255], 8)

    const gradientTexture = new Texture(gradient)
    material.setState({
        gradient: gradientTexture,
        height: 1
    })

    Texture.fromImage(face).then(texture => {
        material.setState({ heightMap: texture })
        render()
    })

    return new Object({ 
        name: "Wireframe",
        geometry, 
        material 
    })
})()

const monkey = (() => {
    const geometry = StaticGeometry.fromObj(monkeyObj)
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

scene.add(wireframe)
scene.add(monkey)

function render() {
    renderer.render(camera, scene)
}

render()

// Render your React component instead
const root = createRoot(document.getElementById('app')!)
root.render(<Editor />)