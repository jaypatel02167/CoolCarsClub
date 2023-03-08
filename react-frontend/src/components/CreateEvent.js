import React, { useState } from 'react';
import '../App.css';
import {createEvent} from "../services/createEventService";


function CreateEvent() {
  const [eventtitle, setEventTitle] = useState("");
  const [eventdescription, setEventDescription] = useState("");
  const [host, setHost] = useState("");
  const [timeofevent, setTimeOfEvent] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit  = async () => {
    const create_event_info = {eventtitle, eventdescription, host, location, eventDate, timeofevent};
    const create_event_log = {eventtitle, eventdescription, host, location, eventDate, timeofevent};
    console.log(create_event_log);
    await createEvent(create_event_info);
  };



  return (
    <div className="App">
      <header className="App-header">
        <h2> Create a new Car Meet Event! </h2> <label> Event Title: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setEventTitle(event.target.value)}
          placeholder="Event Title"
        />
        <br></br>

        <label> Event Description: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setEventDescription(event.target.value)}
          placeholder="Event Description"
        />
        <br></br>

        <label> Event Host: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setHost(event.target.value)}
          placeholder="Event Location"
        />
        <br></br>

        <label> Event Location: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Event Location"
        />
        <br></br>

        <label>Event Date: </label>
        <input
          type="Date"
          className="user_input"
          onChange={(event) => setEventDate(event.target.value)}
          placeholder="Event Date"
        />
        <br></br>

        <label> Event Time: </label>
        <input
          type="time"
          className="user_input"
          onChange={(event) => setTimeOfEvent(event.target.value)}
          placeholder="Event Time"
        />
        <br></br>
        <button onClick={handleSubmit} type="submit" id="submitButton">
          Create Event
        </button>
      </header>
    </div>
  );
}

export default CreateEvent;



//searchResults.searchQuery