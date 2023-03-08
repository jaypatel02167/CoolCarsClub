import React, { useEffect, useState} from "react";
import {myDashboard} from "../services/myDashboardService";
import Popup from 'reactjs-popup';
function MyDashboard() {
  const [yesEventInfo, setYesEventInfo] = useState("");
  const [maybeEventInfo, setMaybeEventInfo] = useState("");
  const [noEventInfo, setNoEventInfo] = useState("");
  const [hostedRSVPInfo, setHostedRSVPInfo] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const username = localStorage.getItem('username');
    const payload = {username}
    await myDashboard(payload).then((response)=>{
        setYesEventInfo(response.yesEventInfo);
        setMaybeEventInfo(response.maybeEventInfo);
        setNoEventInfo(response.noEventInfo);
        setHostedRSVPInfo(response.hostedRSVPInfo);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <h2> My Dashboard </h2>
      <h2 class="RSVPHeader">RSVP: Yes</h2>
      <div class = "myDashboardTables">
          {yesEventInfo && yesEventInfo.map(result => {
            
              return <Popup  trigger = {<button className = "resultButton">{result[0]}</button>}>
              <div><p>Title: {result[0]}</p>
              <p>Rating: {result[1]}</p>
              </div>
              </Popup>
            
          })}</div>

      <h2 class="RSVPHeader">RSVP: Maybe</h2>
      <div class = "myDashboardTables">
      {maybeEventInfo && maybeEventInfo.map(result => {
        return <Popup  trigger = {<button className = "resultButton">{result[0]}</button>}>
        <div><p>Title: {result[0]}</p>
        <p>Rating: {result[1]}</p>
        </div>
        </Popup>
      
        })}</div>

      <h2 class="RSVPHeader">RSVP: No</h2>
      <div class = "myDashboardTables">
          {noEventInfo && noEventInfo.map(result => {
            
              return <Popup  trigger = {<button className = "resultButton">{result[0]}</button>}>
              <div><p>Title: {result[0]}</p>
              <p>Rating: {result[1]}</p>
              </div>
              </Popup>
        })}</div>

      <h2 class="RSVPHeader">Hosted Events</h2>
      <div class = "myDashboardTables">
          {hostedRSVPInfo && hostedRSVPInfo.map(result => {
            
              return <Popup  trigger = {<button className = "resultButton">{result[0]}</button>}>
              <div><p>Title: {result[0]}</p>
              <p>Rating: {result[1]}</p>
              </div>
              </Popup>
        })}</div>
        </div>
  );
}

export default MyDashboard;
