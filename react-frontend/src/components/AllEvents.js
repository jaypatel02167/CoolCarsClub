import React, { useState, useEffect } from "react";
import allEvents from "../services/allEventsService";
import "../App.css";

function AllEvents() {
    const [events, setEvents] = useState([]);
    const [eventLoaded, setEventLoaded] = useState(false);
      useEffect(async() => {
      await allEvents().then((response)=>{
          console.log("Backend",response.details);
          setEvents(response.eventsQuery.concat(events));
          console.log("Front end", events);
      });
   }, []);


  console.log("Here are the events", events);

  return (
    <div>
      <table>
        <thead>

            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Host</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
        </thead>

         <tbody>
            {events && events.map(detail => (
            <tr>
                <td> {detail.title}  </td>
                <td> {detail.description}  </td>
                <td> {detail.rating} </td>
                <td> {detail.host} </td>
                <td> {detail.location} </td>
                <td> {detail.date} </td>
                <td> {detail.time} </td>
		    </tr>

            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEvents;
