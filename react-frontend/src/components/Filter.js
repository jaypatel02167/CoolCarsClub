import React, { useState } from 'react';
import '../App.css';
import {filter} from "../services/filterService";
import Popup from 'reactjs-popup';

function Filter() {
    
    const [filterInput, setFilterInput] = useState("");
    const [filterResults, setFilterResults] = useState("");

    const handleFilterInput = event => {
        setFilterInput(event.target.value);
    };

    const handleFilterResults = async() => {
        console.log(filterInput);
        const fil = {filterInput}
        await filter(fil).then((response)=> {
            setFilterResults(response)
            console.log(filterResults)
        })
    }

    const clearFilterResults = async() => {
        setFilterResults('')
        document.getElementById('filterBar').value = ''
        setFilterInput('')
        console.log(filterResults)
    
    }

    return (
        <div>
            <input type="text" onChange = {handleFilterInput} id = "filterBar" className="filter" placeholder="Filter"/> 
            <button onClick = {handleFilterResults} id="myInput" className="searchButton">Filter</button>
            <button onClick = {clearFilterResults} className = "searchButton">Clear Filter</button>
            <div class = "results">
              {filterResults.searchQuery && filterResults.searchQuery.map(result => {
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
                        </div>
                      </div>
                    )
                  }
                  </Popup>
                } 
            })}</div>
        </div>     
    )
}

export default Filter;

