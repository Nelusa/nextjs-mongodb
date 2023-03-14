import Button from "@/components/ui/Button/Button";
import AddressIcon from "@/icons/address-icon";
import ArrowRightIcon from "@/icons/arrow-right-icon";
import DateIcon from "@/icons/date-icon";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventItem.module.css";

const EventItem = ({ id, location, title, date, image }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image
        //style={{ width: "auto", height: "auto" }}
        src={`/${image}`}
        alt={title}
        width={250}
        height={160}
        //priority={true}
      />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              {" "}
              <ArrowRightIcon />
            </span>
          </Button>
        </div>{" "}
      </div>
    </li>
  );
};

export default EventItem;
