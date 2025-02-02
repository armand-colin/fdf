import { Emitter } from "@niloc/utils";
import { useObjectField } from "../hooks/useObjectField";
import { Resource } from "../library/Resource";
import { DragEvent } from "react";

export class ResourceDragController extends Emitter<{ change: void }> {

    private _dragging: Resource | null = null

    constructor() {
        super()
        window.addEventListener("dragend", this.cancel)
        window.addEventListener("mouseup", this.cancel)
    }

    cancel = () => {
        if (this._dragging) {
            this._dragging = null
            this.emit('change', undefined)
        }
    }

    drop(e: DragEvent): Resource | null {
        e.preventDefault()
        const resource = this._dragging
        this._dragging = null
        this.emit('change', undefined)
        return resource
    }

    drag(_e: DragEvent, resource: Resource) {
        // e.preventDefault()
        this._dragging = resource
        this.emit('change', undefined)
    }

    useState() {
        return useObjectField({
            object: this,
            accessor: controller => ({
                dragging: controller._dragging
            }),
            emitter: this as ResourceDragController,
            event: "change"
        })
    }

}