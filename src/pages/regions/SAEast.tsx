import { useEffect, useState } from "react";
import { StatusDoc } from "../../types/types";
import { RegionChart } from "../../components/charts/RegionChart";
import { connectWebSocket } from "@/api/websocket";
import { filterLastWeek } from "@/utils/date";

export default function SAEast() {
  const [data, setData] = useState<StatusDoc[]>([]);

  useEffect(() => {
    connectWebSocket("sa-east", (doc: StatusDoc) => {
      setData((prev) => {
        const docWithTimestamp = {
          ...doc,
          timestamp: new Date().toISOString(),
        }; // add timestamp
        const updated = [...prev, docWithTimestamp];
        return filterLastWeek(updated);
      });
    });
  }, []);

  return (
    <div>
      <h1>SA-East Dashboard</h1>
      <RegionChart data={data} region="sa-east" />
    </div>
  );
}
