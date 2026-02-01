import styles from '../Header/Header.module.css';

export const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.tabButton} ${
        active ? styles.tabButtonActive : styles.tabButtonInactive
      }`}
    >
      {icon}
      {label}
    </button>
  );
};