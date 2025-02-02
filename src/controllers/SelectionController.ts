import { Emitter } from "@niloc/utils";
import { SceneObject } from "../SceneObject";
import { useObjectField } from "../hooks/useObjectField";
import { Resource } from "../library/Resource";

export class SelectionController extends Emitter<{ change: void }> {

    private _selection: SceneObject | Resource | null = null

    useSelection() {
        return useObjectField({
            object: this,
            accessor: controller => controller._selection,
            emitter: this as SelectionController,
            event: "change"
        })
    }

    setSelection(object: SceneObject | Resource | null) {
        if (object === this._selection)
            return

        this._selection = object
        this.emit('change', undefined)
    }

}