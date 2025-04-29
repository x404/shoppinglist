import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ReactNode, useEffect, useState } from "react";
import { LocalStorageService } from "@services/LocalStorageService";
import styles from "./ResizableSidebar.module.css";

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
                              minSidebarWidth = 300,
                              defaultSidebarWidth = 300,
                          }: ResizableSidebarProps) => {
    const [sidebarSize, setSidebarSize] = useState<number | null>(null);

    useEffect(() => {
        const savedSize = LocalStorageService.get(storageKey);
        if (savedSize) {
            setSidebarSize(Number(savedSize));
        } else {
            setSidebarSize((defaultSidebarWidth / window.innerWidth) * 100);
        }
    }, [storageKey, defaultSidebarWidth]);

    const handleSidebarResize = (size: number) => {
        LocalStorageService.set(storageKey, String(size));
        setSidebarSize(size);
    };

    if (sidebarSize === null) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <PanelGroup direction="horizontal" className={styles.panelGroup}>
                <Panel
                    defaultSize={sidebarSize}
                    minSize={(minSidebarWidth / window.innerWidth) * 100}
                    maxSize={50}
                    className={`${styles.sidebar} bg-white shadow-sm`}
                    onResize={(size) => handleSidebarResize(size)}
                >
                    {sidebar}
                </Panel>

                <PanelResizeHandle className={`${styles.resizeHandle} d-flex align-items-center justify-content-center`}>
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