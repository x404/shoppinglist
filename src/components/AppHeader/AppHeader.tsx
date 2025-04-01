import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services/LocalStorageService";

import MockupProductData from "../ProductData/MockupProductData";

import styles from "./AppHeader.module.css";


const AppHeader = () => {
    const [isDebug, setIsDebug] = useState<boolean | null>(null);
    useEffect(() => {
        const debugValue = localStorage.getItem('isdebug');
        setIsDebug(debugValue === 'true');
    }, []);
    
    return (
        <header className={`${styles.header} py-3 shadow-sm`}>
            <h1 className="h3 me-0 ps-4">Shopping List App</h1>
            {isDebug && <MockupProductData/>}
        </header>
    )
}

export default AppHeader;