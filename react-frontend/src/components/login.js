import React, { useState } from "react";
import {login} from "../services/loginServices";
import { useHistory } from "react-router-dom";

function Login() {
  
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState(0);
  const history = useHistory();
  localStorage.setItem('login', false);
  localStorage.setItem('username', '');

  const handleSubmit  = async () => {
      if (!username) {
    alert('Please fill Username');
    return;
  }
  if (!password) {
    alert('Please fill Password');
    return;
  }
    const user_info = {username, password};

    await login(user_info).then((response)=>{
      
      localStorage.setItem('login', response.login);
      localStorage.setItem('username', response.username)
      console.log(localStorage.getItem('login'));
    
      if(localStorage.getItem('login') === 'true'){
        history.push('/');
        window.location.reload(true);
      }else{
        alert('Please enter a valid username or password!');
        history.push('/login');
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2> Login </h2>
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
        <button onClick={() => {
          handleSubmit();
        }} type="submit" className="searchButton">
          Login
        </button>
      </header>
    </div>
  );
}

export default Login;