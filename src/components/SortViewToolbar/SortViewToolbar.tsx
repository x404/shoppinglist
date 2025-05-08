import { Button, ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";
import { Sliders } from "react-bootstrap-icons";
import PopoverViewOption from "./PopoverViewOption/PopoverViewOption";

import styles from "./SortViewToolbar.module.css";

type SortViewToolbarProps = {
    sortField: string;
    sortDirection: string;
    handleSortFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortDirectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleClearSorting: () => void;
    showPopover: boolean;
    setShowPopover: (show: boolean) => void;
};

const SortViewToolbar = ({
                             sortField,
                             sortDirection,
                             handleSortFieldChange,
                             handleSortDirectionChange,
                             handleClearSorting,
                             showPopover,
                             setShowPopover
                         }: SortViewToolbarProps) => {
    return (
        <ButtonToolbar>
            <OverlayTrigger
                trigger="click"
                rootClose
                placement="bottom"
                overlay={
                    <Popover id="popover-trigger-click-root-close" className={styles.customPopover}>
                        <PopoverViewOption
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onFieldChange={handleSortFieldChange}
                            onDirectionChange={handleSortDirectionChange}
                            onClearSorting={handleClearSorting}
                        />
                    </Popover>
                }
                onToggle={(next) => setShowPopover(next)}
            >
                <Button
                    variant=""
                    className={`d-flex align-items-center ${styles.viewBtn} ${(sortField !== '' && sortDirection !== '') ? styles.enabled : ''} ${showPopover ? styles.active : ''}`}
                >
                    <Sliders width={16} height={16} color="#000" className="me-xl-2"/>
                    <span className="d-none d-xl-block">View</span>
                </Button>
            </OverlayTrigger>
        </ButtonToolbar>
    )
};

export default SortViewToolbar;