import React, { useEffect, useState } from 'react';
import './App.css';
import { TSweep } from './types/TSweep';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [sweeps, setSweeps] = useState<TSweep[]>([]);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const test = useAuth0();
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/sweeps/all");
      const data = await response.json();
      console.log(data)
      setSweeps(data);
    })();
  }, []);

  useEffect(() => {
    //@ts-ignore
    console.log(window.state);
    //@ts-ignore
  }, [window.state]);

  useEffect(() => {
    (async () => {
      console.log(isAuthenticated)
      if(isAuthenticated) {
        const accessToken = await test.getAccessTokenSilently();
        console.log(accessToken)
      }
    })();
  }, [isAuthenticated])

  return (
    <div className="App">
      <h1>Sweeps Client</h1>
      {
        sweeps.length ? (
          <div style={{width: "100%;", display: "flex"}}>
            <div style={{width: "20%"}}>ID</div>
            <div style={{width: "20%"}}>NAME</div>
            <div style={{width: "20%"}}>START DATE</div>
            <div style={{width: "20%"}}>Events</div>
            <div style={{width: "20%"}}>Button</div>
          </div>
        ) : (<div></div>)
      }
      {
        sweeps.length ? sweeps.map((sweep) => (
          <div key={sweep.sweep_id} style={{width: "100%;", display: "flex"}}>
            <div style={{width: "20%"}}>{sweep.sweep_id}</div>
            <div style={{width: "20%"}}>{sweep.name}</div>
            <div style={{width: "20%"}}>{(new Date(sweep.openDate)).toISOString()}</div>
            <div style={{width: "20%"}}>Events: {"[]"}</div>
            <div style={{width: "20%"}}>
              <button>Join</button>  
            </div>
          </div>
        )) : (<div>There are no Sweeps at the moment</div>)
      }
      <button onClick={() => loginWithRedirect({
        appState: { someValue: true }
      })}>
        Log In
      </button>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </div>
    
  );
}

export default App;