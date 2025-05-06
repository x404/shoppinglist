import { Tooltip } from "react-tooltip";

const GlobalTooltips = () => {
    return (
        <>
            <Tooltip
                id="save-tooltip"
                place="top"
                className="saveTooltip"
                delayShow={400}
                delayHide={200}
            />
            <Tooltip
                id="edit-tooltip"
                place="top"
                delayShow={400}
                delayHide={200}
            />
            <Tooltip
                id="delete-tooltip"
                place="top"
                arrowColor="var(--bs-red)"
                className="deleteTooltip"
                delayShow={400}
                delayHide={200}
            />
            <Tooltip
                id="cancel-tooltip"
                place="top"
                arrowColor="var(--bs-red)"
                className="deleteTooltip"
                delayShow={400}
                delayHide={200}
            />
            <Tooltip
                id="custom-tooltip"
                place="top"
                delayShow={1000}
                delayHide={200}
                className="customTooltip"
            />
        </>
    )
}

export default GlobalTooltips;