import { Emitter } from "@niloc/utils";
import { Camera } from "./camera/Camera";
import { Renderer } from "./Renderer";
import { Scene } from "./Scene";
import { useEffect, useReducer } from "react";

export namespace RenderingContext {

    export type State = {
        canvas: HTMLCanvasElement,
        renderer: Renderer,
        camera: Camera,
        scene: Scene
    }

    export let state: State

    const emitter = new Emitter<{ change: void }>()

    export function useState() {
        const [_, forceUpdate] = useReducer(x => x + 1, 0)

        useEffect(() => {
            emitter.on('change', forceUpdate)

            return () => {
                emitter.off('change', forceUpdate)
            }
        }, [])

        return { ...state }
    }

    export function init(initState: State) {
        state = initState
        emitter.emit("change", undefined)
    }

    export function set(partialState: Partial<State>) {
        state = { ...state, ...partialState }
        emitter.emit("change", undefined)
    }

    export function render() {
        state.renderer.render(state.camera, state.scene)
    }

}