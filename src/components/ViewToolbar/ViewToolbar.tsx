import { Button, ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";
import { Sliders } from "react-bootstrap-icons";
import PopoverViewOption from "./PopoverViewOption/PopoverViewOption";

import styles from "./ViewToolbar.module.css";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type SortViewToolbarProps = {
    sortField: string;
    sortDirection: string;
    hiddenItemsStatus: boolean;
    handleSortFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleSortDirectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleChangeHiddingStatus: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClearSorting: () => void;
    showPopover: boolean;
    setShowPopover: (show: boolean) => void;
};

const ViewToolbar = ({
                         sortField,
                         sortDirection,
                         hiddenItemsStatus,
                         handleSortFieldChange,
                         handleSortDirectionChange,
                         handleClearSorting,
                         handleChangeHiddingStatus,
                         showPopover,
                         setShowPopover
                     }: SortViewToolbarProps) => {
    const { t } = useTranslation();
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
                            hiddenItemsStatus={hiddenItemsStatus}
                            onFieldChange={handleSortFieldChange}
                            onDirectionChange={handleSortDirectionChange}
                            onClearSorting={handleClearSorting}
                            onChangeHiddingStatus={handleChangeHiddingStatus}
                        />
                    </Popover>
                }
                onToggle={(next) => setShowPopover(next)}
            >
                <Button
                    variant=""
                    className={`d-flex align-items-center 
                        ${styles.viewBtn} 
                        ${((sortField !== '' && sortDirection !== '') || hiddenItemsStatus) ? styles.enabled : ''} 
                        ${showPopover ? styles.active : ''}
                    `}
                >
                    <Sliders width={16} height={16} color="#000" className="me-xl-2"/>
                    <span className="d-none d-xl-block">{t('viewToolbar.buttons.title.view')}</span>
                </Button>
            </OverlayTrigger>
        </ButtonToolbar>
    )
};

export default ViewToolbar;