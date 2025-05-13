import { ChangeEvent, useState } from "react";
import { Button, Form, Popover } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import styles from "./PopoverViewOption.module.css";
import { useTranslation } from "react-i18next";

// interfaces
interface PopoverViewOptionProps {
    sortField: string;
    sortDirection: string;
    hiddenItemsStatus: boolean;
    onFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onDirectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onClearSorting: () => void;
    onChangeHiddingStatus: (e: ChangeEvent<HTMLInputElement>) => void;
}


const popoverViewOption = ({
                               sortField,
                               sortDirection,
                               hiddenItemsStatus,
                               onFieldChange,
                               onDirectionChange,
                               onClearSorting,
                               onChangeHiddingStatus
                           }: PopoverViewOptionProps) => {
        const { t } = useTranslation();
        const [checked, setChecked] = useState(hiddenItemsStatus);

        const hanldeChangeHiddingStatus = (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHiddingStatus(event);
            setChecked(!checked);
        }
        return (
            <>
                <section className="px-2 py-1 my-2">
                    <header className="fw-bold">{t('popoverViewOptions.sortingBy')}</header>
                    <div className="d-md-flex gap-2 mt-2">
                        <Form.Select
                            aria-label="sort by"
                            size="sm"
                            className={`${styles.sortingSelect} mb-2 mb-md-0`}
                            onChange={onFieldChange}
                            value={sortField || 'none'}
                        >
                            <option value="">{t('popoverViewOptions.sorting.chooseOption')}</option>
                            <option value="purchased">{t('popoverViewOptions.sorting.status')}</option>
                            <option value="name">{t('popoverViewOptions.sorting.name')}</option>
                        </Form.Select>

                        <Form.Select
                            aria-label="sorting direction"
                            size="sm"
                            className={styles.sortingSelect}
                            onChange={onDirectionChange}
                            value={sortDirection}
                        >
                            <option value="">{t('popoverViewOptions.sorting.chooseOption')}</option>
                            <option value="asc">{t('popoverViewOptions.sorting.asc')}</option>
                            <option value="desc">{t('popoverViewOptions.sorting.desc')}</option>
                        </Form.Select>

                        <Button
                            size="sm"
                            variant=""
                            className={`d-none d-md-flex align-items-center mt-2 mt-md-0 ${styles.clearSortingButton}`}
                            onClick={onClearSorting}
                            title={t('popoverViewOptions.sorting.clearSorting')}
                            disabled={sortField === '' && sortDirection === ''}
                        >
                            <Trash size={16}/>
                        </Button>

                        <Button
                            size="sm"
                            variant="outline-dark"
                            className={`d-flex d-md-none align-items-center mt-2 mt-md-0 d-flex justify-content-center w-100`}
                            onClick={onClearSorting}
                            title={t('popoverViewOptions.sorting.clearSorting')}
                            disabled={sortField === '' && sortDirection === ''}
                        >
                            <Trash size={16}/>
                            <span className="ms-2 d-md-none">{t('popoverViewOptions.sorting.clear')}</span>
                        </Button>
                    </div>
                </section>

                <section className="px-2 my-2">
                    <hr/>
                    <header className="fw-bold mb-1">{t('popoverViewOptions.hiddingOption')}</header>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={t('popoverViewOptions.hideCompletedItems')}
                            onChange={hanldeChangeHiddingStatus}
                            checked={checked}
                        />
                    </Form>
                </section>
            </>

        )
    }
;

export default popoverViewOption;


