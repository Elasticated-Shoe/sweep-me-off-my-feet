import React, { useEffect, useState } from 'react';
import './App.css';
import { TEvent } from './types/TEvent';

const createSweep = (event: TEvent) => {
  const response = fetch("http://localhost:3000/sweeps", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sweep_id: event.id,
      openDate: event.startDate,
      name: event.name,
      events: []
    })
  });
}

function App() {
  const [events, setEvents] = useState<TEvent[]>([]);
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/events/all");
      const data = await response.json();
      setEvents(data);
    })()
  }, []);

  return (
    <div className="App">
      <h1>Sweeps Admin</h1>
      {
        events.length ? (
          <div style={{width: "100%;", display: "flex"}}>
            <div style={{width: "20%"}}>ID</div>
            <div style={{width: "20%"}}>NAME</div>
            <div style={{width: "20%"}}>TYPE</div>
            <div style={{width: "20%"}}>START DATE</div>
            <div style={{width: "20%"}}>SWEEP IT</div>
          </div>
        ) : (<div></div>)
      }
      {
        events.length ? events.map((event) => (
          <div key={event.id} style={{width: "100%;", display: "flex"}}>
            <div style={{width: "20%"}}>{event.id}</div>
            <div style={{width: "20%"}}>{event.name}</div>
            <div style={{width: "20%"}}>{event.type}</div>
            <div style={{width: "20%"}}>{(new Date(event.startDate)).toISOString()}</div>
            <div style={{width: "20%"}}>
              <button onClick={() => createSweep(event)}>Create</button>  
            </div>
          </div>
        )) : (<div>Loading...</div>)
      }
    </div>
  );
}

export default App;