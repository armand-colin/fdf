import { Vec3 } from "../math/Vec3";
import { Slider } from "../ui/Slider";

export class Vec3Slider {

    constructor(opts: {
        target: Vec3,
        onChange: () => void,
        label: string,
        min: number,
        max: number,
        step?: number
    }) {
        const sliderX = new Slider({
            label: opts.label + "x",
            max: opts.max,
            min: opts.min,
            step: opts.step,
            defaultValue: opts.target.x
        })
        sliderX.on('change', x => {
            opts.target.x = x
            opts.onChange()
        })

        const sliderY = new Slider({
            label: opts.label + "y",
            max: opts.max,
            min: opts.min,
            step: opts.step,
            defaultValue: opts.target.y
        })
        sliderY.on('change', y => {
            opts.target.y = y
            opts.onChange()
        })

        const sliderZ = new Slider({
            label: opts.label + "z",
            max: opts.max,
            min: opts.min,
            step: opts.step,
            defaultValue: opts.target.z
        })
        sliderZ.on('change', z => {
            opts.target.z = z
            opts.onChange()
        })
    }

}