import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <>
            <div className="min-vh-100 d-flex flex-column">
                <header className="py-3 shadow-sm">
                    <h1 className="h3 me-0 ps-4">Shopping List App</h1>
                </header>

                <div className="d-flex h-100 flex-grow-1">
                    <aside aria-label="Sidebar navigation" className="col-2 p-3 shadow-sm z-1">
                        <nav>
                            <ul className="list-unstyled">
                                <li><a href="#">Grocery Lists</a>
                                    <ul className="list-unstyled ps-3">
                                        <li><a href="#">Fruits</a></li>
                                        <li><a href="#">Dairy</a></li>
                                        <li><a href="#">Vegetables</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="col-10 p-3 main">
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
                </div>
            </div>
        </>
    )
}

export default App
