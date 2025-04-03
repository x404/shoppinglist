import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";


function App() {
    return (
        <>
            <SkipLink/>
            <div className="d-md-grid wrapper min-vh-100">
                <AppHeader/>
                <Sidebar/>
                <MainContent/>
            </div>
        </>
    )
}

export default App
