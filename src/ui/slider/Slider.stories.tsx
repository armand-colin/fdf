import { Slider } from "./Slider";
export default {
    title: "Slider",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <Slider />
        </div>
    </>
}
