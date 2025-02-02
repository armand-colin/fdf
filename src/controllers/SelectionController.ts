import { Emitter } from "@niloc/utils";
import { Object } from "../Object";
import { useObjectField } from "../hooks/useObjectField";

export class SelectionController extends Emitter<{ change: void }> {

    private _object: Object | null = null

    useObject() {
        return useObjectField({
            object: this,
            accessor: controller => controller._object,
            emitter: this as SelectionController,
            event: "change"
        })
    }

    setObject(object: Object | null) {
        if (object === this._object)
            return

        this._object = object
        this.emit('change', undefined)
    }

}