import { LibraryWindow } from "./LibraryWindow";
export default {
    title: "LibraryWindow",
}

export const Template = () => {
    return <>
        <style>{`
            .container {

            }
        `}</style>

        <div className="container">
            <LibraryWindow />
        </div>
    </>
}
