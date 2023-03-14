import Head from "next/head";
import { Inter } from "@next/font/google";
import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList/EventList";
import NewsletterRegistration from "@/components/input/NewsletterRegistration/NewsletterRegistration";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <>
      <div>
        <NewsletterRegistration />
        <EventList events={props.events} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //každá půl hodina
  };
}
