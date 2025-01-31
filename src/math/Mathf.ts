export namespace Mathf {

    export function lerp(a: number, b: number, t: number) {
        return (b - a) * t + a
    }

    export function radiansToDegrees(radians: number) {
        return radians / (Math.PI * 2) * 360
    }

    export function degreesToRadians(degrees: number) {
        return degrees / 360 * (Math.PI * 2)
    }

}