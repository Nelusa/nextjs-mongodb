import AddressIcon from "@/icons/address-icon";
import DateIcon from "@/icons/date-icon";
import Image from "next/image";
import LogisticsItem from "../LogisticsItem/LogisticsItem";
import styles from "./EventLogistics.module.css";

function EventLogistics(props) {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image
          //style={{ width: "auto", height: "auto" }}
          src={`/${image}`}
          alt={imageAlt}
          width={400}
          height={400}
          //priority={true}
        />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
