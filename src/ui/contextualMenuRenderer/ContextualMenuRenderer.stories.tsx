import { ContextualMenuRenderer } from "./ContextualMenuRenderer";
export default {
    title: "ContextualMenuRenderer",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <ContextualMenuRenderer />
        </div>
    </>
}
