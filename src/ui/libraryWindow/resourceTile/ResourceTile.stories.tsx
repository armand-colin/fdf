import { ResourceTile } from "./ResourceTile";
export default {
    title: "ResourceTile",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <ResourceTile />
        </div>
    </>
}
