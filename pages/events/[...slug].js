import ResultsTitle from "@/components/event-detail/results-title"
import EventList from "@/components/events/event-list"
import Button from "@/components/ui/button"
// import { getFilteredEvents } from "@/data/firebase"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import ErrorAlert from "@/components/ui/error-alert"

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()
  const filterData = router.query.slug

  const { data, error } = useSWR(
    'https://next-events-77300-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    (url) => fetch(url).then(res => res.json())
  )

  useEffect(() => {
    if (data) {
      setLoadedEvents(data)
    }
  }, [data])

  if (!loadedEvents) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]
  const numYear = +filteredYear
  const numMonth = +filteredMonth

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
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events.</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events.</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filterData = params.slug

//   const filteredYear = filterData[0]
//   const filteredMonth = filterData[1]
//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage