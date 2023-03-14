import ErrorAlert from "@/components/ui/ErrorAlert/ErrorAlert";
import EventContent from "@/components/events/EventDetail/EventContent/EventContent";
import EventLogistics from "@/components/events/EventDetail/EventLogistics/EventLogistics";
import EventSummary from "@/components/events/EventDetail/EventSummary/EventSummary";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-util";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import Comments from "@/components/input/Comments/Comments";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <p>No Event Found!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const singleEvent = await getEventById(eventId);

  return {
    props: {
      event: singleEvent,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents(); //pokud místo allEvents použijeme jen featuredEvents, musíme myslet na použití callbacku jinak, než nastavením na false (jinak dostaneme 404)!!!
  // tím pádem však musíme mít podmínku, která konroluje, zda událost již existuje či nikoliv

  const pathsWithParams = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true, //říkáme tím Nextu, že očekáváme více stránek, než je definováno v pre-renderingu (případně můžeme nastavit "blocking")
  };
}

export default EventDetailPage;
