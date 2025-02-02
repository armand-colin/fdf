import { SelectionEditor } from "./SelectionEditor";
export default {
    title: "SelectionEditor",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <SelectionEditor />
        </div>
    </>
}
