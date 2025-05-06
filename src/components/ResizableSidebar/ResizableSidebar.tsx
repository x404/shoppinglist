import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { PanelGroup, Panel, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";
import { LayoutSidebar } from "react-bootstrap-icons";

// services
import { LocalStorageService } from "@services/LocalStorageService";

// hooks
import { useMediaQuery } from "@hook/useMediaQuery";

// styles
import styles from "./ResizableSidebar.module.css";

// interfaces
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
                              minSidebarWidth = 285,
                              defaultSidebarWidth = 18,
                          }: ResizableSidebarProps) => {
    const [sidebarSize, setSidebarSize] = useState<number | null>(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const ref = useRef<ImperativePanelHandle>(null);
    const defaultSize = (defaultSidebarWidth / window.innerWidth) * 100
    const isDesktop = useMediaQuery("(min-width: 768px)");


    useEffect(() => {
        const savedSize = LocalStorageService.get(storageKey) || defaultSidebarWidth;
        const saved = Number(savedSize);

        if (!Number.isNaN(saved)) {
            setSidebarSize(saved);
            setIsSidebarVisible(saved > 0);
        } else {
            setSidebarSize(defaultSize);
            setIsSidebarVisible(true);
        }
    }, [storageKey, defaultSidebarWidth]);

    const handleSidebarResize = (size: number) => {
        if (size === 0) {
            if (isDesktop) {
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
                expandSidebar();
            }
        } else if (size > 3) {
            setIsSidebarVisible(true);
            expandSidebar();
        }

        const newSize = size === 0 ? 0 : size;
        LocalStorageService.set(storageKey, String(newSize));
        setSidebarSize(newSize);
    };

    if (sidebarSize === null) {
        return null;
    }

    const hideSidebar = () => {
        setIsSidebarVisible(false);
        collapseSidebar();
    }

    const showSidebar = () => {
        setIsSidebarVisible(true);
        expandSidebar();
    }

    const collapseSidebar = () => {
        const panel = ref.current;
        if (panel) {
            panel.collapse();
        }
    };

    const expandSidebar = () => {
        const panel = ref.current;
        if (panel) {
            panel.expand(defaultSize);
        }
    };

    return (
        <div className={styles.wrapper}>
            <PanelGroup direction="horizontal" className={styles.panelGroup}>
                <div
                    className={`${styles.collapsePanel} ${isSidebarVisible ? 'd-none' : 'd-flex'} justify-content-center flex-grow-1`}>
                    <Button
                        variant=""
                        className={`${styles.closeSidebarBtn} p-1 mt-2 d-flex flex-shrink-0`}
                        onClick={showSidebar}
                        data-tooltip-id="custom-tooltip"
                        data-tooltip-content="Open sidebar"
                        data-tooltip-place="top"
                        aria-label="Show sidebar"
                    >
                        <LayoutSidebar width={16} height={16}/>
                    </Button>
                </div>
                <Panel
                    collapsible ref={ref}
                    defaultSize={sidebarSize}
                    minSize={isSidebarVisible ? (minSidebarWidth / window.innerWidth) * 100 : 0}
                    maxSize={50}
                    className={`${styles.sidebar} ${isSidebarVisible ? styles.sidebarContent : styles.sidebarCollapsed} bg-white shadow-sm`}
                    onResize={(size) => handleSidebarResize(size)}
                >
                    <div className={styles.fixHeight}>
                        <div className="me-3 d-none d-md-flex justify-content-end">
                            <Button
                                variant=""
                                className={`${styles.closeSidebarBtn} align-self-end p-1 me-1 mt-2 d-flex flex-shrink-0`}
                                onClick={hideSidebar}
                                data-tooltip-id="custom-tooltip"
                                data-tooltip-content="Close sidebar"
                                data-tooltip-place="top"
                                aria-label="Hide sidebar"
                            >
                                <LayoutSidebar width={16} height={16}/>
                            </Button>
                        </div>
                        {isSidebarVisible && sidebar}
                    </div>
                </Panel>

                <PanelResizeHandle
                    className={`${styles.resizeHandle} d-none d-md-flex align-items-center justify-content-center ${!isSidebarVisible ? 'd-none-' : ''}`}>
                    <svg className={styles.ResizeHandleThumb} viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2">
                        </path>
                    </svg>
                </PanelResizeHandle>

                <Panel className={`${styles.mainContent} `}>
                    {mainContent}
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default ResizableSidebar;