import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import MockupProductData from "./components/ProductData/MockupProductData";
import { LocalStorageService } from "./services/LocalStorageService";
import { useEffect, useState } from "react";
import SkipLink from "./components/SkipLink/SkipLink";


function App() {
    const [isDebug, setIsDebug] = useState<boolean | null>(null);
    useEffect(() => {
        const debugValue = LocalStorageService.get<boolean>('isdebug');
        setIsDebug(debugValue);  // Устанавливаем значение в стейт
    }, []);
    
    
    return (
        <>
            <SkipLink />
            <div className="d-grid wrapper min-vh-100">
                <header className="header py-3 shadow-sm">
                    <h1 className="h3 me-0 ps-4">Shopping List App</h1>
                    {isDebug && <MockupProductData/>}
                </header>
                <Sidebar />
                <MainContent />
            </div>
        </>
    )
}

export default App
