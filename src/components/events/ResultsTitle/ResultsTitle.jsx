import Button from "@/components/ui/Button/Button";
import styles from "./ResultsTitle.module.css";

function ResultsTitle(props) {
  const { date } = props;

  console.log(date);

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
