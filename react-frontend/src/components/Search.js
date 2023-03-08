import React, { useEffect, useState } from 'react';
import '../App.css';
import {search} from "../services/searchService";
import {rate} from "../services/rateService";
import {rsvp} from "../services/rsvpService";
import Filter from "./Filter";
import Popup from 'reactjs-popup';


function Search() {
 
  const [searchQuery, setSearch] = useState("");
  const [searchResults, setResults] = useState("");
  const [eventID, setEventID] = useState(0)


  const handleInput = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = async() => {
    console.log(searchQuery);
    const search_query = {searchQuery};
    await search(search_query).then((response)=>{
      setResults(response)
      console.log(searchResults)
    });
    document.getElementById('searchBar').value = ''
    setSearch('')
  }

  const handleRate = async() => {
    if(localStorage.getItem('login') === 'true'){
      const e = document.getElementById('rate')
      const r = e.options[e.selectedIndex].value;
      setEventID(document.getElementById('rateEvent').value)
      const rate_submit = {r, eventID}
      console.log(rate_submit)
      await rate(rate_submit).then((response)=> {
        console.log(response)
      })
    } else {
        alert('Please Log in to Rate');
      }
  }

  const handleRSVP = async() => {
    if(localStorage.getItem('login') === 'true'){
      const un = localStorage.getItem('username')
      const attendance = "Yes"
      const rsvp_event = {un, eventID, attendance}
      console.log(rsvp_event)
      await rsvp(rsvp_event).then((response)=> {
        console.log(response)
      })
      
    } else{
      alert('Please Log in to RSVP');
    }
  }

    return (
      <div>
        <input type="text" className="search" id = "searchBar" onChange = {handleInput} placeholder="Search..."/> 
        <button onClick = {handleSubmit} type = "submit" id="myInput" className="searchButton">Submit</button>
        <Filter/>
        <div class = "results">
          {searchResults.searchQuery && searchResults.searchQuery.map(result => {
            if(result && !result.includes("NO RESULT")) {
              return <Popup  trigger = {<button className = "resultButton">{result[1]}</button>} modal>
                {close => (
                  <div className ="modal">
                    <button className="close" onClick={close}>&times;</button>
                    <div className="header">{result[1]}</div>
                    <div className="content">
                      <p>Description: {result[2]}</p>
                      <p>Location: {result[4]}</p>
                      <p>Time: {result[6]}</p>
                      <p>Website: {result[7]}</p>
                      <p>Rating: {result[3]}</p>
                    </div>
                    <div className="actions">
                    <button className = "resultButton" id = "rateEvent" value={result[0]} onClick={() => {
                        setEventID(result[0])
                        handleRSVP();
                      }}>RSVP</button>
                      <button className = "resultButton" id= "rsvp" value= {result[0]} onClick={() => {
                        setEventID(result[0])
                        handleRate();
                      }}>Rate</button>
                      <select id = "rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                )
              }
              </Popup>
            } 
            else {
              return <h1>No results found for {result[1]}</h1>;
            }
        })}</div>
      </div>
    );
  }

export default Search;

