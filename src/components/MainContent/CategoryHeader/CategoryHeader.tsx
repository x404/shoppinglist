import { Button } from "react-bootstrap";

const CategoryHeader = () => {
    return (
        <>
            <header className="d-flex gap-3 align-items-center mb-4">
                <h3 className="h5 mb-0" id="my-list-title">My List</h3>
                <Button variant="light" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16"
                         fill="currentColor"
                         className="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Add product
                </Button>
            </header>
        </>
    )
}

export default CategoryHeader;