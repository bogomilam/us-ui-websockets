import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { StatusData } from "@/types/types";

const MAX_ITEMS = 50;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

// WebSocket connection
// const ws = new WebSocket("ws://localhost:8080");
const ws = new WebSocket(`${BACKEND_URL.replace(/^http/, "ws")}/ws`);

export const RegionDashboard: React.FC = () => {
  const location = useLocation();
  const currentRegion = location.pathname.slice(1) || "";

  const [historyData, setHistoryData] = useState<StatusData[]>([]);
  const [liveData, setLiveData] = useState<StatusData | null>(null);

  // Listen for messages from server
  useEffect(() => {
    if (!BACKEND_URL) return;

    const ws = new WebSocket(`${BACKEND_URL.replace(/^http/, "ws")}/ws`);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (
        (msg.type === "live" || msg.type === "update") &&
        msg.data.region === currentRegion
      ) {
        const normalized: StatusData = {
          region: msg.data.region,
          createdAt: msg.data.createdAt,
          online: msg.data.results?.stats?.online ?? msg.data.online ?? 0,
          serversCount:
            msg.data.results?.stats?.servers_count ??
            msg.data.serversCount ??
            0,
          cpuLoad:
            msg.data.results?.stats?.server?.cpu_load ?? msg.data.cpuLoad ?? 0,
          activeConnections:
            msg.data.results?.stats?.server?.active_connections ?? 0,
          waitTime: msg.data.results?.stats?.server?.wait_time ?? 0,
          raw: msg.data,
        };

        setLiveData(normalized);
        setHistoryData((prev) => [...prev.slice(-MAX_ITEMS + 1), normalized]);
      }

      if (msg.type === "history") {
        const filtered = msg.data
          .filter((d: any) => d.region === currentRegion)
          .map((d: any) => ({
            region: d.region,
            createdAt: d.createdAt,
            online: d.results?.stats?.online ?? d.online ?? 0,
            serversCount:
              d.results?.stats?.servers_count ?? d.serversCount ?? 0,
            cpuLoad: d.results?.stats?.server?.cpu_load ?? d.cpuLoad ?? 0,
            activeConnections:
              d.results?.stats?.server?.active_connections ?? 0,
            waitTime: d.results?.stats?.server?.wait_time ?? 0,
            raw: d,
          }))
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
    <div className="p-4 my-12 bg-blue-300 rounded shadow-md">
      {/* Live Data */}
      {liveData && (
        <div className="mb-8 text-gray-600">
          <h2 className="text-xl font-bold mb-2">
            Live Data ({liveData.region})
          </h2>
          <p>Servers Online: {liveData.online}</p>
          <p>CPU Load: {liveData.cpuLoad}</p>
          <p>Active Connections: {liveData.activeConnections}</p>
          <p>Wait Time: {liveData.waitTime}</p>
          <p>Servers Count: {liveData.serversCount}</p>
        </div>
      )}

      {/* Historical Chart */}
      {historyData.length > 0 && (
        <div>
          <h2 className="text-xl text-gray-600 font-bold mb-2">
            History (Last {MAX_ITEMS} points)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(val: string | number) =>
                  new Date(val).toLocaleTimeString()
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(val: string | number) =>
                  new Date(val).toLocaleString()
                }
              />

              <Line
                type="monotone"
                dataKey="online"
                stroke="#8884d8"
                name="Online Users"
              />
              <Line
                type="monotone"
                dataKey="activeConnections"
                stroke="#ff7300"
                name="Active Connections"
              />
              <Line
                type="monotone"
                dataKey="waitTime"
                stroke="#ff0000"
                name="Wait Time"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Chart Legend Indicator */}
          <div className="flex flex-wrap text-gray-600 justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#8884d8" }}
              ></span>
              <span>Online Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#ff7300" }}
              ></span>
              <span>Active Connections</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#ff0000" }}
              ></span>
              <span>Wait Time</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
