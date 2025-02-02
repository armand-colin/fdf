import { Checkbox } from "./Checkbox";
export default {
    title: "Checkbox",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <Checkbox />
        </div>
    </>
}
