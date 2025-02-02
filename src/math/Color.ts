import { Mathf } from "./Mathf"

export class Color {

    readonly buffer

    static readonly size = 4
    readonly size = 4

    static red() {
        return new Color(1, 0, 0)
    }
    static green() {
        return new Color(0, 1, 0)
    }
    static blue() {
        return new Color(0, 0, 1)
    }

    static black() {
        return new Color(0, 0, 0)
    }

    static lerp(a: Color, b: Color, t: number) {
        return new Color(
            Mathf.lerp(a.r, b.r, t),
            Mathf.lerp(a.g, b.g, t),
            Mathf.lerp(a.b, b.b, t),
            Mathf.lerp(a.a, b.a, t),
        )
    }

    static fromHex(hex: string) {
        if (hex.startsWith("#"))
            hex = hex.slice(1)

        if (hex.length < 6) {
            console.error("Malformed color: ", hex)
            return Color.black()
        }

        const r = Number.parseInt(hex.slice(0, 2), 16) / 255
        const g = Number.parseInt(hex.slice(2, 4), 16) / 255
        const b = Number.parseInt(hex.slice(4, 6), 16) / 255

        const a = hex.length === 8 ?
            Number.parseInt(hex.slice(6, 8), 16) / 255 :
            1

        return new Color(r, g, b, a)
    }

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
        this.buffer = new Float32Array([r, g, b, a])
    }

    get r() { return this.buffer[0] }
    get g() { return this.buffer[1] }
    get b() { return this.buffer[2] }
    get a() { return this.buffer[3] }

    toHex(): string {
        const r = Math.round(this.r * 255).toString(16).padStart(2, "0")
        const g = Math.round(this.g * 255).toString(16).padStart(2, "0")
        const b = Math.round(this.b * 255).toString(16).padStart(2, "0")

        return `#` + r + g + b
    }

}