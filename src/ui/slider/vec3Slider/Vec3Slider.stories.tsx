import { Vec3Slider } from "./Vec3Slider";
export default {
    title: "Vec3Slider",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <Vec3Slider />
        </div>
    </>
}
