import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { io } from "socket.io-client";
import "./App.css";

const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };
  }, []);

  return (
    <div>
      <h1>Monitoring Dashboard</h1>
      <p>Server says: {message}</p>
    </div>
  );
}

export default App;
