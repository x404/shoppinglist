import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
                        <ul className="list-unstyled">
                            <li className="menu-item active d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#0" className="sidebar-link flex-grow-1 text-uppercase fw-bold ps-2"
                                   aria-current="page" title="">All</a>
                                <div className="counter p-1" aria-label="128 items">99+</div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#1" className="sidebar-link flex-grow-1 ps-2" title="">Fruits</a>
                                <div className="counter p-1" aria-label="14+ items">14</div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#2" className="sidebar-link flex-grow-1 ps-2" title="">Dairy</a>
                                <div className="counter p-1" aria-label="1 items">1</div>
                            </li>
                            <li className="menu-item d-flex align-items-center mt-1 ps-2 pe-2">
                                <a href="#3" className="sidebar-link flex-grow-1 ps-2" title="">Vegetables</a>
                                <div className="counter p-1" aria-label="99+ items">99+</div>
                            </li>
                        </ul>
                    </nav>
                </aside>
                {/* =/aside*/}

                {/* =main */}
                <main className="main p-3" id="main">
                    <h2 className="h4">Grocery Lists</h2>
                    <section className="bg-white shadow-sm p-4 mt-4">
                        <h3 className="h5 mb-4">My List</h3>

                        <div className="mb-3">
                            <div className="d-block text-uppercase fw-bold">Fruits</div>
                            <ul>
                                <li>Tomato</li>
                                <li>Potato</li>
                                <li>Potato</li>
                            </ul>
                        </div>
                        <div className="mb-3">
                            <div className="d-block text-uppercase fw-bold">Dairy</div>
                            <ul>
                                <li>Tomato</li>
                                <li>Potato</li>
                                <li>Potato</li>
                            </ul>
                        </div>
                        <div className="mb-3">
                            <div className="d-block text-uppercase fw-bold">Vegetables</div>
                            <ul>
                                <li>Tomato</li>
                                <li>Potato</li>
                                <li>Potato</li>
                            </ul>
                        </div>

                    </section>
                </main>
                {/* =/main */}
            </div>
        </>
    )
}

export default App
