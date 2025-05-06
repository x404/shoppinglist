import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

// icons
import { X } from "react-bootstrap-icons";
import styles from "./SearchBar.module.css";

// interface
interface SearchInputProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
        onSearch(inputValue);
    }, [inputValue, onSearch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const clearSearch = () => {
        setInputValue('');
    }

    return (
        <>
            <Form className="position-relative">
                <Form.Group className="">
                    <Form.Label className="visually-hidden">Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={inputValue}
                    />
                </Form.Group>
                {inputValue && (<Button
                    variant=""
                    size="sm"
                    className={`${styles.clearSearchButton} d-flex align-items-center position-absolute end-0 top-0 rounded-circle p-0`}
                    onClick={clearSearch}
                >
                    <X size={24}/>
                </Button>)}
            </Form>
        </>
    )
}

export default SearchBar;