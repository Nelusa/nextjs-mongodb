export async function getAllEvents() {
  const response = await fetch(
    `https://project-2-data-fetching-default-rtdb.firebaseio.com/events.json`
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEvents;
}

// HLAVNÍ STRÁNKA
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

// DETAIL UDÁLOSTI
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

//FILROVÁNÍ UDÁLOSTÍ
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
