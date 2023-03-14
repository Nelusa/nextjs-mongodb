import ErrorAlert from "@/components/ui/ErrorAlert/ErrorAlert";
import EventList from "@/components/events/EventList/EventList";
import ResultsTitle from "@/components/events/ResultsTitle/ResultsTitle";
import Button from "@/components/ui/Button/Button";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import useSWR from "swr";
import Head from "next/head";

const FilteredEventsPage = ({ hasError, events, date }) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug; // získáme pole, kde jsou jednotlivé části cesty

  //useSWR hook:
  const { data, error } = useSWR(
    `https://project-2-data-fetching-default-rtdb.firebaseio.com/events.json`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  //potřebujeme useEffect pro transformaci dat
  useEffect(() => {
    if (data) {
      const transformedEvents = [];

      for (const key in data) {
        transformedEvents.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(transformedEvents);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  //abychom ošetřili první načtení komponenty
  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = Number(filteredYear); //převedení roku na číslo
  const numMonth = Number(filteredMonth); //převedení měsíce na číslo

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  //pro client-side rendering
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          {" "}
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  //pro SSR
  /*   if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          {" "}
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  } */

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const eventDate = new Date(numYear, numMonth - 1);

  return (
    <div>
      {pageHeadData}
      <Fragment>
        <ResultsTitle date={eventDate} />
        <EventList events={filteredEvents} />
      </Fragment>
    </div>
  );
};

/* export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  console.log(filteredYear, filteredMonth);

  const numYear = Number(filteredYear); //převedení roku na číslo
  const numMonth = Number(filteredMonth); //převedení měsíce na číslo

  console.log(numYear, numMonth);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      //tady nemůžeme vrátit JSX, jako jsme to dělali předtím přímo v komponentě, ale máme 3 možnosti: buď natavíme notFound na true, redirect s objektem s klíčem destionation a hodnotou cesty naší error stránky nebo do props objektu vložíme "hasError", které nastavíme na true, a můžeme s tím dále pracovat přímo v naší komponentě (kde už máme připravené nějaké JSX)
      //notFound: true,
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
} */

export default FilteredEventsPage;
