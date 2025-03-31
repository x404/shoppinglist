import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from "react-bootstrap";

function App() {
    return (
        <>
            <a href="#main" className="skip-link position-absolute start-0 p-3">
                Skip to main content
            </a>
            <div className="d-grid wrapper min-vh-100">
                <header className="py-3 shadow-sm">
                    <h1 className="h3 me-0 ps-4">Shopping List App</h1>
                </header>

                {/* =aside */}
                <aside aria-label="Sidebar navigation" className="sidebar p-3 shadow-sm z-1">
                    <nav>
                        <h2 className="visually-hidden">Main menu</h2>
                        <ul className="list-unstyled menu">
                            <li className="menu-item active d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#0" className="sidebar-link flex-grow-1 text-uppercase fw-bold ps-2"
                                   aria-current="page" title="">All</a>
                                <div
                                    className="counter d-flex align-items-center justify-content-center p-1"
                                    aria-label="147 items"
                                >
                                    166
                                </div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#1" className="sidebar-link flex-grow-1 ps-2" title="">Fruits</a>
                                <div
                                    className="counter d-flex align-items-center justify-content-center p-1"
                                    aria-label="14+ items"
                                >
                                    14
                                </div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#2" className="sidebar-link flex-grow-1 ps-2" title="">Dairy</a>
                                <div
                                    className="counter d-flex align-items-center justify-content-center p-1"
                                    aria-label="1 items"
                                >
                                    5
                                </div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#3" className="sidebar-link flex-grow-1 ps-2" title="">Vegetables</a>
                                <div
                                    className="counter d-flex align-items-center justify-content-center p-1"
                                    aria-label="147 items"
                                >
                                    147
                                </div>
                            </li>
                        </ul>
                    </nav>
                </aside>
                {/* =/aside*/}

                {/* =main */}
                <main className="main p-3" id="main">
                    <h2 className="h4">Grocery Lists</h2>
                    <section className="bg-white shadow-sm p-4 mt-4" aria-labelledby="my-list-title">
                        <h3 className="h5 mb-4" id="my-list-title">My List</h3>

                        <article className="mb-4">
                            <h4 className="h6 text-uppercase d-flex align-items-center gap-2">
                                <strong>Fruits</strong>
                                <span className="item-title-counter small">14</span>
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                                            <Button variant="outline-dark" size="sm" aria-label="Edit Apple">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16"
                                                     height="16"
                                                     fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="delete-btn ms-1"
                                                    aria-label="Delete Apple">
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
                {/* =/main */}
            </div>
        </>
    )
}

export default App
