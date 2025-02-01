import { BooleanInput } from "./BooleanInput";
export default {
    title: "BooleanInput",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <BooleanInput />
        </div>
    </>
}
