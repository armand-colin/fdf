import "./style/index.scss"
import "./style.css"
// import { HeightMapMaterial } from "./material/HeightMapMaterial"
// import { SceneObject } from "./SceneObject"
// import { Renderer } from "./Renderer"
// import { Scene } from "./Scene"
// import { setGl } from "./GL"
// import face from "./assets/face.png"
// import { createRoot } from 'react-dom/client';
// import { Editor } from "./ui/editor/Editor"
// import { RenderingContext } from "./RenderingContext"
// import { OrthographicProjection } from "./camera/OrthographicProjection"
// import { Camera } from "./camera/Camera"
// import { Texture } from "./texture/Texture"
// import { WireframeGeometry } from "./geometry/WireframeGeometry"
// import monkeyObj from "./assets/monkey.obj?raw"
import cubeObj from "./assets/cube.obj?raw"
// import { BlinnPhongMaterial } from "./material/BlinnPhongMaterial"
// import { ObjLoader } from "./utils/ObjLoader"
// import { PlaneGeometry } from "./geometry/PlaneGeometry"
// import { Color } from "./math/Color"
// import { Gradient } from "./Gradient"
// import { Image } from "./texture/Image"
// import { CanvasContainer } from "./utils/CanvasContainer"
// import { LibraryWindow } from "./ui/libraryWindow/LibraryWindow"
// import { Library } from "./library/Library"
// import { Injection } from "./utils/Injection"
import { AlbedoMaterial } from "./wgpu/Material"
import { ObjLoader } from "./utils/ObjLoader"
import { BufferedMesh } from "./wgpu/BufferedMesh"
import { Camera } from "./camera/Camera"
import { OrthographicProjection } from "./camera/OrthographicProjection"
import { Transform } from "./Transform"

async function setup() {
    const canvas = document.body.querySelector("canvas")!
    const context = canvas.getContext("webgpu")!
    navigator.gpu

    const adapter = await navigator.gpu?.requestAdapter()
    const device = await adapter?.requestDevice()

    if (!device) {
        alert("Failed to start WebGPU")
        return
    }

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat()

    context.configure({
        device,
        format: presentationFormat,
    })

    const material = new AlbedoMaterial()
    const mesh = ObjLoader.load(cubeObj)
    const iMesh = new BufferedMesh(mesh, device)
    const camera = new Camera(new OrthographicProjection(canvas))

    const iMaterial = material.instantiate(device, presentationFormat)

    function render() {
        const encoder = device!.createCommandEncoder({
            label: "command encoder"
        })

        const view = context.getCurrentTexture().createView()
        const passEncoder = encoder.beginRenderPass({
            label: "render pass encoder",
            colorAttachments: [
                {
                    loadOp: "clear",
                    storeOp: "store",
                    view: view,
                    clearValue: [0, 0, 0, 0],
                }
            ]
        })

        iMaterial.render({
            encoder: passEncoder,
            camera,
            mesh: iMesh,
            transform: new Transform()
        })

        passEncoder.end()

        const commandBuffer = encoder.finish()
        device!.queue.submit([commandBuffer])
    }

    // render()

    const button = document.createElement("button")
    button.onclick = () => render()
    button.innerText = "render"
    document.body.append(button)

    // const library = new Library()
    // Injection.set(Library, library)

    // const renderer = new Renderer(canvas)
    // // Fits the viewport
    // renderer.fit()

    // const projection = new OrthographicProjection(canvas)
    // const camera = new Camera(projection)
    // const scene = new Scene()

    // RenderingContext.init({
    //     canvas,
    //     camera,
    //     renderer,
    //     scene,
    // })

    // const heightMapData = Image.fromUrl(face)
    // const heightMap = new Texture(heightMapData)

    // heightMapData.on('load', RenderingContext.render)

    // const wireframe = (() => {
    //     const geometry = new WireframeGeometry()
    //     const material = new HeightMapMaterial()

    //     library.add(material)

    //     const gradient = new Gradient([
    //         { t: 0, color: Color.red() },
    //         { t: 0.5, color: Color.green() },
    //         { t: 1, color: Color.blue() },
    //     ])

    //     const gradientTexture = new Texture(gradient)
    //     material.setState({
    //         gradient: gradientTexture,
    //         heightMap,
    //         height: -0.5
    //     })

    //     return new SceneObject({
    //         name: "Wireframe",
    //         geometry,
    //         material
    //     })
    // })()

    // const wireframeUnder = (() => {
    //     const geometry = new PlaneGeometry()
    //     const material = new HeightMapMaterial()

    //     const gradient = new Gradient([
    //         { t: 0, color: Color.red() },
    //         { t: 0.5, color: Color.green() },
    //         { t: 1, color: Color.blue() },
    //     ])

    //     const gradientTexture = new Texture(gradient)

    //     const heightMapData = Image.fromUrl(face)
    //     const heightMap = new Texture(heightMapData)

    //     material.setState({
    //         gradient: gradientTexture,
    //         heightMap,
    //         height: -0.5
    //     })

    //     return new SceneObject({
    //         name: "Wireframe Back",
    //         geometry,
    //         material
    //     })
    // })()

    // const monkey = (() => {
    //     const geometry = ObjLoader.load(monkeyObj)
    //     const material = new BlinnPhongMaterial()

    //     return new SceneObject({
    //         name: "Monkey",
    //         geometry,
    //         material
    //     })
    // })()

    // // Texture.fromImage(cat).then(texture => {
    // //     material.texture = texture
    // //     render()
    // // })

    // wireframe.enabled = false
    // monkey.enabled = false

    // scene.add(wireframe)
    // scene.add(wireframeUnder)
    // scene.add(monkey)

    // function render() {
    //     renderer.render(camera, scene)
    // }

    // render()

    // // Render your React component instead
    // const editorRoot = createRoot(document.getElementById('editor')!)
    // editorRoot.render(<Editor />)

    // // Render your React component instead
    // const libraryRoot = createRoot(document.getElementById('library')!)
    // libraryRoot.render(<LibraryWindow library={library} />)

    // new CanvasContainer(document.querySelector("#canvas-container")!)
}

setup()