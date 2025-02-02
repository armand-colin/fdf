import { Emitter } from "@niloc/utils";
import { Resource as Resource } from "./Resource";
import { useObjectField } from "../hooks/useObjectField";

export class Library extends Emitter<{ change: void }> {

    private _resources: Resource[] = []

    add(resource: Resource) {
        this._resources.push(resource)
        this.emit('change', undefined)
    }

    useResources() {
        return useObjectField({
            object: this,
            accessor: library => [...library._resources],
            emitter: this as Library,
            event: "change"
        })
    }

}