import { ReactNode } from "react";
import { Dropdown } from "react-bootstrap";
import styles from './ActionItem.module.css';

interface ActionItemProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const ActionItem = ({ icon, label, onClick, disabled = false, className = "" }: ActionItemProps) => (
    <Dropdown.Item
        as="button"
        onClick={onClick}
        disabled={disabled}
        className={`ps-2 ${className}`}
    >
        <div className="d-flex">
            <div className={`${styles.icon} me-2`}>
                {icon}
            </div>
            <div className={`${styles.title} flex-grow-1`}>
                {label}
            </div>
        </div>
    </Dropdown.Item>
);

export default ActionItem;