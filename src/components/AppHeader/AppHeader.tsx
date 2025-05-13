import { useEffect, useState } from "react";

import MockupProductData from "../ProductData/MockupProductData";

import styles from "./AppHeader.module.css";
import { selectProductItems } from "@store/productListSlice";
import { useSelector } from "react-redux";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";


const AppHeader = () => {
    const [isDebug, setIsDebug] = useState<boolean | null>(null);

    const productList = useSelector(selectProductItems);

    useEffect(() => {
        const debugValue = localStorage.getItem('isdebug');
        setIsDebug(debugValue === 'true');
    }, []);

    return (
        <header className={`${styles.header} py-3 d-flex justify-content-between`}>
            <div>
                <h1 className="h3 me-0 ps-4">TODO List</h1>
                {(isDebug || productList.length === 0) && <MockupProductData/>}
            </div>
            <div className="pe-4 align-self-center">
                <LanguageSwitcher/>
            </div>
        </header>
    )
};

export default AppHeader;