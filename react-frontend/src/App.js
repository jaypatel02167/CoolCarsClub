import React from "react";
import './App.css';
import Nav from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import Signup from './components/signup';
import Login from './components/login';
import Search from './components/Search'
import AllEvents from './components/AllEvents';
import Signout from './components/Signout';
import myDashboard from "./components/myDashboard";
import TopEvents from "./components/TopEvents";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() { 
  return (
   <Router>
    <div className="App">

        <Nav />
        <Switch>
          <Route path="/allevents" exact component = {AllEvents}/>
          <Route path="/createEvent" component = {CreateEvent}/>
          <Route path="/search" component = {Search}/>
          <Route path="/signup" component = {Signup}/>
          <Route path="/login" component = {Login}/>
          <Route path="/signout" component = {Signout}/>
          <Route path="/myDashboard" component = {myDashboard}/>
          <Route path="/TopEvents" component = {TopEvents}/>
        </Switch>
     </div>
    </Router>
    )
}

export default App;


