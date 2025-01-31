import { useEffect, useRef } from "react"

export function useInstance<T>(constructor: () => T, destructor: (value: T) => void) {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        return () => {
            if (ref.current) {
                destructor(ref.current)
                ref.current = null
            }
        }
    }, [])

    if (!ref.current)
        ref.current = constructor()
    
    return ref.current
}