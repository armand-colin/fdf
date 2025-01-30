import { Slider } from "../ui/Slider";
import { OrbitalPosition } from "./OrbiltalPosition";

export namespace OrbitalSlider {

    export function make(orbital: OrbitalPosition) {
        const angleSlider = new Slider({
            min: Math.PI * -2,
            max: Math.PI * 2,
            step: 0.05,
            label: "orbital angle"
        })
        angleSlider.on('change', angle => orbital.angle = angle)

        const heightSlider = new Slider({
            min: 0,
            max: 1000,
            label: "orbital height"
        })
        heightSlider.on('change', height => orbital.height = height)

        const distanceSlider = new Slider({
            min: 0,
            max: 1000,
            label: "obital distance"
        })
        distanceSlider.on('change', distance => orbital.distance = distance)
    }

}