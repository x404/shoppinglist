import { PanelGroup, Panel, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LocalStorageService } from "@services/LocalStorageService";
import styles from "./ResizableSidebar.module.css";
import { Button } from "react-bootstrap";
import { LayoutSidebar } from "react-bootstrap-icons";

interface ResizableSidebarProps {
    sidebar: ReactNode;
    mainContent: ReactNode;
    storageKey?: string;
    minSidebarWidth?: number;
    defaultSidebarWidth?: number;
}

const ResizableSidebar = ({
                              sidebar,
                              mainContent,
                              storageKey = "sidebarWidth",
                              minSidebarWidth = 230,
                              defaultSidebarWidth = 300,
                          }: ResizableSidebarProps) => {
    const [sidebarSize, setSidebarSize] = useState<number | null>(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const ref = useRef<ImperativePanelHandle>(null);


    useEffect(() => {
        const savedSize = LocalStorageService.get(storageKey);
        if (savedSize) {
            setSidebarSize(Number(savedSize));
        } else {
            setSidebarSize((defaultSidebarWidth / window.innerWidth) * 100);
        }
    }, [storageKey, defaultSidebarWidth]);

    const handleSidebarResize = (size: number) => {
        const newSize =  size === 0 ? 3 : size; 
        LocalStorageService.set(storageKey, String(newSize));
        setSidebarSize(newSize);
    };

    if (sidebarSize === null) {
        return null;
    }
    
    const toggleSidebar = () => {
        // setIsSidebarVisible(!isSidebarVisible);
        collapsePanel();
    }

    const collapsePanel = () => {
        const panel = ref.current;
        if (panel) {
            panel.collapse();
        }
    };

    return (
        <div className={styles.wrapper}>
            <PanelGroup direction="horizontal" className={styles.panelGroup}>
                <Panel
                    collapsible ref={ref}
                    defaultSize={sidebarSize}
                    minSize={isSidebarVisible ? (minSidebarWidth / window.innerWidth) * 100 : 3}
                    maxSize={50}
                    className={`${styles.sidebar} bg-white shadow-sm`}
                    onResize={(size) => handleSidebarResize(size)}
                >
                    <div className={isSidebarVisible ? styles.sidebarContent : styles.sidebarCollapsed}>
                        <div className="me-3 d-flex justify-content-end">
                            <Button
                                variant=""
                                className={`${styles.closeSidebarBtn} align-self-end p-1 me-1 mt-2 d-flex flex-shrink-0`}
                                onClick={toggleSidebar}
                                data-tooltip-id="sidebar-tooltip"
                                data-tooltip-content={isSidebarVisible ? 'Close sidebar' : 'Open sidebar'}
                                data-tooltip-place="top"

                            >
                                <LayoutSidebar width={16} height={16}/>
                            </Button>
                        </div>
                        {isSidebarVisible && sidebar}
                    </div>
                </Panel>

                <PanelResizeHandle
                    className={`${styles.resizeHandle} d-flex align-items-center justify-content-center`}>
                    <svg className={styles.ResizeHandleThumb} viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2">
                        </path>
                    </svg>
                </PanelResizeHandle>

                <Panel className={styles.mainContent}>
                    {mainContent}
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default ResizableSidebar;