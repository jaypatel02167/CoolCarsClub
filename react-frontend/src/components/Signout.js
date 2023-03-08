import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {signout} from "../services/signoutService";

function Signout() {
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await signout().then((response)=>{
        console.log(response.login);
        localStorage.setItem('login', response.login);
    });
    history.push('/');
    window.location.reload(true);
  });



  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );

}

export default Signout;
