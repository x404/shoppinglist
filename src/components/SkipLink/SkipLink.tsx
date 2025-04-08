import styles from "./SkipLink.module.css";

const SkipLink = () => {
    return (
        <a href="#main" className={`${styles.skipLink} position-absolute start-0 p-3`}>
            Skip to main content
        </a>
    )
}
export default SkipLink;