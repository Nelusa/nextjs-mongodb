import { Fragment } from "react";
import EventItem from "../EventItem/EvenItem";
import styles from "./EventList.module.css";

const EventList = ({ events }) => {
  console.log(events);
  return (
    <Fragment>
      <ul className={styles.list}>
        {events.map((event) => {
          return (
            <EventItem
              key={event.id}
              id={event.id}
              location={event.location}
              title={event.title}
              date={event.date}
              image={event.image}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default EventList;
