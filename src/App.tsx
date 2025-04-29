import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// components
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import SkipLink from "./components/SkipLink/SkipLink";
import AppHeader from "./components/AppHeader/AppHeader";
import GlobalTooltips from "./components/GlobalTooltips/GlobalTooltips";

// interfaces
import ModalsManager from "./components/Modals/ModalsManager";
import { ModalProviders } from "./context/ModalProviders";
import ResizableSidebar from "./components/ResizableSidebar/ResizableSidebar";


const AppContent = () =>  {
    return (
        <>
            <SkipLink />
            <div className="wrapper min-vh-100 d-flex flex-column">
                <AppHeader />
                <div className="flex-grow-1 d-flex overflow-hidden">
                    <ResizableSidebar
                        storageKey="leftSidebarWidth"
                        sidebar={<Sidebar />}
                        mainContent={<MainContent />}
                    />
                </div>
            </div>
            <GlobalTooltips />
            <ModalsManager />
        </>
    );
}

function App() {
    return (
        <ModalProviders>
            <AppContent />
        </ModalProviders>
    );
}


export default App
