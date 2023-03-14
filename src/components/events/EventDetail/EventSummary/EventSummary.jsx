import styles from "./EventSummary.module.css";

function EventSummary(props) {
  const { title } = props;

  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
