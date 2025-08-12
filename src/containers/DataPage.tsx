import React, { useState, useEffect, useCallback } from "react";

type RegionData = {
  timestamp: string;
  data: any;
};

type Snapshot = Record<string, RegionData>;

export default function Dashboard() {
  const [data, setData] = useState<Snapshot>({});
  const [connected, setConnected] = useState(false);

  // Handle incoming messages
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === "snapshot" || message.type === "update") {
        setData(message.data);
      }
    } catch (err) {
      console.error("Invalid WS message", err);
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    };

    ws.onmessage = handleMessage;

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [handleMessage]);

  return (
    <div>
      <h1>DevOps Dashboard</h1>
      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
