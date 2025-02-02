import { ResourceView } from "./ResourceView";
export default {
    title: "ResourceView",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <ResourceView />
        </div>
    </>
}
