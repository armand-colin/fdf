import { ResourceDropZone } from "./ResourceDropZone";
export default {
    title: "ResourceDropZone",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <ResourceDropZone />
        </div>
    </>
}
