import React from "react";
import logo from '../Cool Car Club.png'; // Tell Webpack this JS file uses this image
import '../App.css';
import {Link} from 'react-router-dom'


function Navbar() {
  const style = {
    color: 'black'
  }  
  console.log(logo); // /logo.84287d09.png
  let signInOutBTN;
  let loginBTN;
  let myDashboardBTN;

  if(localStorage.getItem('login') === 'true'){
    signInOutBTN = <Link style={style} to="/signout"><li>Sign Out</li></Link>
    myDashboardBTN = <Link style={style} to="/myDashboard"><li>My Dashboard</li></Link> 
  }else{
    signInOutBTN = <Link style={style} to="/signup"><li>Signup</li></Link>
    loginBTN = <Link style={style} to="/login"><li>Login</li></Link>
    
  }
  return (
      <nav>
        <img src={logo} id="logo" alt="Logo" />
        <ul className="Nav-Links">
          <Link style = {style} to='/TopEvents'>
            <li>Top Events</li>
          </Link>
          <Link style = {style} to='/createEvent'>
            <li>Create Event</li>
          </Link>
          <Link style = {style} to='/allevents'>
            <li>Events</li>
          </Link>
          <Link style = {style} to='/search'>
            <li>Search</li>
          </Link>
          {myDashboardBTN}
          {signInOutBTN}
          {loginBTN}
          
        </ul>
    </nav>
  );
}

export default Navbar;


