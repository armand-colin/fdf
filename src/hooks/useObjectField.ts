import { Emitter } from "@niloc/utils";
import { useEffect, useState } from "react";

export type IEmitter<U> = {
    on(key: keyof U, callback: () => void): void
    off(key: keyof U, callback: () => void): void
}

export type EventsOf<E> = E extends IEmitter<infer U> ? keyof U : never


export function useObjectField<T, V, E extends Emitter<any>>(params: {
    object: T,
    accessor: (object: T) => V,
    emitter: E,
    event: EventsOf<E> | EventsOf<E>[],
    deps?: React.DependencyList
}): V {
    const [value, setValue] = useState(() => params.accessor(params.object))

    useEffect(() => {
        const events = Array.isArray(params.event) ?
            params.event :
            [params.event]

        function update() {
            setValue(() => params.accessor(params.object))
        }

        for (const event of events)
            params.emitter.on(event, update)

        update()

        return () => {
            for (const event of events)
                params.emitter.off(event, update)
        }
    }, [params.object, ...(params.deps ?? [])])

    return value
}