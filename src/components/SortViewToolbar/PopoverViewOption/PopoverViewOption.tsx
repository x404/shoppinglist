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

                <div className="d-flex gap-2 mt-2">
                    <Form.Select
                        aria-label="sort by"
                        size="sm"
                        className={styles.sortingSelect}
                        onChange={onFieldChange}
                        value={sortField || 'none'}
                    >
                        <option>Open select menu</option>
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
                        <option>Open select menu</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Form.Select>

                    <Button
                        size="sm"
                        variant=""
                        className={styles.viewBtn}
                        onClick={onClearSorting}
                        title="Clear sorting"
                    >
                        <Trash size={16}/>
                    </Button>
                </div>
            </section>
        )
    }
;

export default popoverViewOption;


