const url = process.env.FIREBASE_URL

export async function getAllEvents() {
  const response = await fetch(url)
  const events = await response.json()
  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id);
}