import { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import "./App.css";
import Dashboard from "./containers/DataPage";

const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
      console.log("Message from server:", data.message);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      <h1>Monitoring Dashboard</h1>
      <p>Server says: {message}</p>
    </div>
  );
}

export default App;
