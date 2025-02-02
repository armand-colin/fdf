import { RenderingContext } from "../RenderingContext"
import './CanvasContainer.scss'

export class CanvasContainer {

    private _observer: ResizeObserver

    constructor(
        protected readonly container: HTMLElement,
    ) {
        container.classList.add("CanvasContainer")
        this._observer = new ResizeObserver(this._onResize)
        this._observer.observe(container)
        this._onResize()
    }

    private _onResize = () => {
        RenderingContext.render()
        const canvas = RenderingContext.state.canvas
        const canvasAspectRatio = canvas.width / (canvas.height ?? 1)
        const containerAspectRatio = this.container.offsetWidth / (this.container.offsetHeight ?? 1)

        console.log({ canvasAspectRatio, containerAspectRatio })

        this.container.dataset["display"] = canvasAspectRatio > containerAspectRatio ? "vertical" : "horizontal"
    }

}