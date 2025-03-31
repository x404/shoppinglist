import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";


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

                <Sidebar />
                <MainContent />
            </div>
        </>
    )
}

export default App
