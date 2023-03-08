// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {signup} from "../services/signupServices";
import { useHistory } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [car, setCar] = useState("");
  const history = useHistory();

  const handleSubmit  = async () => {
    const user_info = {firstName, lastName, email, username, password, car};
    history.push("/login");
    await signup(user_info);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2> Sign Up Here! </h2> <label> First Name: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First Name"
        />
        <label> Last Name: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last Name"
        />
        <label> Email: </label>
        <input
          type="email"
          className="user_input"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <label> Username: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <label> Password: </label>
        <input
          type="password"
          className="user_input"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <label> Your Car: </label>
        <input
          type="text"
          className="user_input"
          onChange={(event) => setCar(event.target.value)}
          placeholder="Your Car"
        /> 
        <br></br>
        <button onClick={handleSubmit} className="searchButton" type="submit">
          Sign Up!
        </button>
      </header>
    </div>
  );
}

export default Signup;
