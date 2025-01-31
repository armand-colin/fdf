import { Editor } from "./Editor";
export default {
    title: "Editor",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <Editor />
        </div>
    </>
}
