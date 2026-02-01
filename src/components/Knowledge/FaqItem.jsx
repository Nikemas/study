import styles from './Knowledge.module.css';

export const FaqItem = ({ item }) => {
  return (
    <div className={styles.faqItem}>
      <h4 className={styles.faqQuestion}>
        ❓ {item.question}
      </h4>
      <p className={styles.faqAnswer}>
        ✅ {item.answer}
      </p>
    </div>
  );
};