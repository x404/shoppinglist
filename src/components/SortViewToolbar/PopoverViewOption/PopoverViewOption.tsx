import { ChangeEvent } from "react";
import { Button, Form, Popover } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import styles from "./PopoverViewOption.module.css";

// interfaces
interface PopoverViewOptionProps {
    sortField: string;
    sortDirection: string;
    onFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onDirectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onClearSorting: () => void;
}


const popoverViewOption = ({
                               sortField,
                               sortDirection,
                               onFieldChange,
                               onDirectionChange,
                               onClearSorting
                           }: PopoverViewOptionProps) => {
        return (
            <section className="p-2">
                <header className="fw-bold">Sorting by</header>

                <div className="d-md-flex gap-2 mt-2">
                    <Form.Select
                        aria-label="sort by"
                        size="sm"
                        className={`${styles.sortingSelect} mb-2 mb-md-0`}
                        onChange={onFieldChange}
                        value={sortField || 'none'}
                    >
                        <option value="">Choose option</option>
                        <option value="purchased">Status</option>
                        <option value="name">Name</option>
                    </Form.Select>

                    <Form.Select
                        aria-label="sorting direction"
                        size="sm"
                        className={styles.sortingSelect}
                        onChange={onDirectionChange}
                        value={sortDirection}
                    >
                        <option value="">Choose option</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Form.Select>

                    <Button
                        size="sm"
                        variant=""
                        className={`d-none d-md-flex align-items-center mt-2 mt-md-0 ${styles.clearSortingButton}`}
                        onClick={onClearSorting}
                        title="Clear sorting"
                        disabled={sortField === '' && sortDirection === ''}
                    >
                        <Trash size={16}/>
                    </Button>

                    <Button
                        size="sm"
                        variant="outline-dark"
                        className={`d-flex d-md-none align-items-center mt-2 mt-md-0 d-flex justify-content-center w-100`}
                        onClick={onClearSorting}
                        title="Clear sorting"
                        disabled={sortField === '' && sortDirection === ''}
                    >
                        <Trash size={16}/>
                        <span className="ms-2 d-md-none">Clear</span>
                    </Button>
                </div>
            </section>
        )
    }
;

export default popoverViewOption;


