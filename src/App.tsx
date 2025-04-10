import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";
import GlobalTooltips from "./components/GlobalTooltips/GlobalTooltips";


function App() {
    return (
        <>
            <SkipLink/>
            <div className="d-md-grid wrapper min-vh-100">
                <AppHeader/>
                <Sidebar/>
                <MainContent/>
            </div>
            
            <GlobalTooltips/>
        </>
    )
}

export default App
