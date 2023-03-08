import React, { useState, useEffect } from "react";
import {topThreeEvents} from "../services/topEventsService";
import "../App.css";

function TopEvents() {
  const [events, setEvents] = useState("");
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
      await topThreeEvents().then((response)=>{
          console.log("Backend",response.details);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setEvents(response.details.concat(events));  
          console.log("Front end", events);
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  return (
    <div className="App">
      <header className="App-header">
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
                <td> {detail[0]}  </td>
                <td> {detail[1]}  </td>
                <td> {detail[2]} </td>
                <td> {detail[3]} </td>
                <td> {detail[4]} </td>
                <td> {detail[5]} </td>
                <td> {detail[6]} </td>
		    </tr>
            ))}
         </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default TopEvents;
