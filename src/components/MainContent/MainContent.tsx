import { Button } from "react-bootstrap";

const MainContent = () => {
    return(
        <>
            <main className="main p-3" id="main">
                <h2 className="h4 fw-bold">Grocery Lists</h2>
                <section className="bg-white shadow-sm p-4 mt-4 shadow-sm" aria-labelledby="my-list-title">
                    <div className="d-flex gap-3 align-items-center mb-4">
                        <h3 className="h5 mb-0" id="my-list-title">My List</h3>
                        <Button variant="light" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            Add product
                        </Button>
                    </div>

                    <article className="mb-4">
                        <h4 className="h6 text-uppercase d-flex align-items-center gap-2">
                            <strong>Fruits</strong>
                            <span className="item-title-counter small">14</span>

                            <Button variant="light" size="sm">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                Add product
                            </Button>
                        </h4>
                        <ul className="list-group mt-2" aria-label="Fruits List">
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-1"
                                            />
                                        </div>
                                        <div id="item-title-1" className="item-title">Apple</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x7</span>
                                            <span className="visually-hidden">7 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-2"
                                            />
                                        </div>
                                        <div id="item-title-2" className="item-title">Banana</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x5</span>
                                            <span className="visually-hidden">5 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-3"
                                            />
                                        </div>
                                        <div id="item-title-3" className="item-title">Orange</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x2</span>
                                            <span className="visually-hidden">2 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </article>
                    <article className="mb-4">
                        <h4 className="h6 text-uppercase d-flex align-items-center gap-2">
                            <strong>Dairy</strong>
                            <span className="item-title-counter small">1</span>
                            <Button variant="light" size="sm">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                Add product
                            </Button>
                        </h4>
                        <ul className="list-group mt-2" aria-label="Dairy List">
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-4"
                                            />
                                        </div>
                                        <div id="item-title-4" className="item-title">Milk</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x3</span>
                                            <span className="visually-hidden">3 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-5"
                                            />
                                        </div>
                                        <div id="item-title-5" className="item-title">Cheese</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x2</span>
                                            <span className="visually-hidden">2 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </article>
                    <article className="mb-4">
                        <h4 className="h6 text-uppercase d-flex align-items-center gap-2">
                            <strong>Vegetables</strong>
                            <span className="item-title-counter small">128</span>
                            <Button variant="light" size="sm">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                                Add product
                            </Button>
                        </h4>
                        <ul className="list-group mt-2" aria-label="Vegetables List">
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-6"
                                            />
                                        </div>
                                        <div id="item-title-6" className="item-title">Tomato</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x100</span>
                                            <span className="visually-hidden">100 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-7"
                                            />
                                        </div>
                                        <div id="item-title-7" className="item-title">Cucumber</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x10</span>
                                            <span className="visually-hidden">10 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-8"
                                            />
                                        </div>
                                        <div id="item-title-8" className="item-title">Carrot</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x30</span>
                                            <span className="visually-hidden">30 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-9"
                                            />
                                        </div>
                                        <div id="item-title-9" className="item-title">Onion</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x3</span>
                                            <span className="visually-hidden">3 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                aria-labelledby="item-title-10"
                                            />
                                        </div>
                                        <div id="item-title-10" className="item-title">Pepper</div>
                                        <div className="counter ms-3">
                                            <span aria-hidden="true">x4</span>
                                            <span className="visually-hidden">4 items</span>
                                        </div>
                                    </div>

                                    <div className="actions d-flex ms-3">
                                        <Button variant="outline-dark"
                                                size="sm"
                                                aria-label="Edit Apple"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit item"
                                                data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path
                                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </Button>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="delete-btn ms-1"
                                            aria-label="Delete Apple"
                                            data-tooltip-id="delete-tooltip"
                                            data-tooltip-content="Delete item"
                                            data-tooltip-place="top"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                 height="16"
                                                 fill="currentColor" className="bi bi-trash3-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </article>
                </section>
            </main>
        </>
    )
}

export default MainContent;