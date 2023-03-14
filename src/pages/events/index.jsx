import EventList from "@/components/events/EventList/EventList";
import EventsSearch from "@/components/events/EventsSearch/EventsSearch";
import { getAllEvents } from "@/helpers/api-util";
import Head from "next/head";
import { useRouter } from "next/router";

const AllEventsPage = ({ events }) => {
  const navigate = useRouter();
  const handleFindEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`; //klidně bychom mohli použít i více lomítek a něčím za nimi --> i tak nám slug bude fungovat (pro 2 a více částí cesty)

    navigate.push(fullPath);
  };

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allows you to evolve!"
        />
      </Head>
      <h1>All Events</h1>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList events={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 10,
  };
}

export default AllEventsPage;
