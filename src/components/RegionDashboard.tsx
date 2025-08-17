// src/components/RegionDashboard.tsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Region {
  name: string;
  path: string;
}

interface StatusData {
  region: string;
  createdAt: string;
  online: number;
  serversCount: number;
  cpuLoad: number;
  raw?: any;
}

// Max items to keep in chart/history
const MAX_ITEMS = 50;

// Define your regions
const regions: Region[] = [
  { name: "US East", path: "us-east" },
  { name: "EU West", path: "eu-west" },
  { name: "EU Central", path: "eu-central" },
  { name: "US West", path: "us-west" },
  { name: "SA East", path: "sa-east" },
  { name: "AP Southeast", path: "ap-southeast" },
];

// Create a single WebSocket connection
const ws = new WebSocket("ws://localhost:8080");

export const RegionDashboard: React.FC = () => {
  const location = useLocation();
  const currentRegion = location.pathname.slice(1) || "";

  const [historyData, setHistoryData] = useState<StatusData[]>([]);
  const [liveData, setLiveData] = useState<StatusData | null>(null);

  // Listen for messages from server
  useEffect(() => {
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "live" && msg.data.region === currentRegion) {
        setLiveData(msg.data);
        setHistoryData((prev) => [...prev.slice(-MAX_ITEMS + 1), msg.data]);
      }

      if (msg.type === "history") {
        const filtered = msg.data
          .filter((d: StatusData) => d.region === currentRegion)
          .slice(-MAX_ITEMS);
        setHistoryData(filtered);
      }

      console.log("Received WS message:", msg);
    };

    ws.onopen = () => {
      if (currentRegion) {
        ws.send(
          JSON.stringify({ type: "request_history", region: currentRegion })
        );
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [currentRegion]);

  // Request new region history when route changes
  useEffect(() => {
    if (ws.readyState === WebSocket.OPEN && currentRegion) {
      ws.send(
        JSON.stringify({ type: "request_history", region: currentRegion })
      );
    }
  }, [currentRegion]);

  return (
    <div className="p-4 my-12 bg-gray-100 rounded shadow-md">
      {/* Live Data */}
      {liveData && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            Live Data ({liveData.region})
          </h2>
          <p>Servers Online: {liveData.online}</p>
          <p>CPU Load: {liveData.cpuLoad}</p>
          <p>Servers Count: {liveData.serversCount}</p>
        </div>
      )}

      {/* Historical Chart */}
      {historyData.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">
            History (Last {MAX_ITEMS} points)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(val) => new Date(val).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(val) => new Date(val).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="online"
                stroke="#8884d8"
                name="Online Users"
              />
              <Line
                type="monotone"
                dataKey="cpuLoad"
                stroke="#82ca9d"
                name="CPU Load"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
