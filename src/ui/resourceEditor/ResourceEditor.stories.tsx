import { ResourceEditor } from "./ResourceEditor";
export default {
    title: "ResourceEditor",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <ResourceEditor />
        </div>
    </>
}
