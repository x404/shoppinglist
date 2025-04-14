import { useEffect, useState } from "react";

import MockupProductData from "../ProductData/MockupProductData";

import styles from "./AppHeader.module.css";
import { selectProductItems } from "@store/productListSlice";
import { useSelector } from "react-redux";


const AppHeader = () => {
    const [isDebug, setIsDebug] = useState<boolean | null>(null);

    const productList = useSelector(selectProductItems);
    
    useEffect(() => {
        const debugValue = localStorage.getItem('isdebug');
        setIsDebug(debugValue === 'true');
    }, []);
    
    return (
        <header className={`${styles.header} py-3 shadow-sm`}>
            <h1 className="h3 me-0 ps-4">Shopping List App</h1>
            {(isDebug || productList.length === 0 ) && <MockupProductData/>}
        </header>
    )
};

export default AppHeader;