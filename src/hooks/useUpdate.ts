import { useReducer } from "react";
import { RenderingContext } from "../RenderingContext";

export function useUpdate() {
    const [_, update] = useReducer(x => x+1, 0)

    return () => {
        RenderingContext.render()
        update()
    }
}