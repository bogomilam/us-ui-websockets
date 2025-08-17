import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StatusDoc } from "../../types/types";
import { connectWebSocket, WSMessage } from "../../lib/websocket";
import { RegionChart } from "../../components/charts/RegionChart";
import { WorkerChart } from "../../components/charts/WorkerChart";

const workers = ["io", "requests:pageviews", "recording-workers"];

function RegionPage() {
  const { region } = useParams<{ region: string }>();
  const [data, setData] = useState<StatusDoc[]>([]);

  useEffect(() => {
    if (!region) return;

    // connect & handle cleanup
    const disconnect = connectWebSocket<StatusDoc>(
      region,
      (msg: WSMessage<StatusDoc>) => {
        if (msg.type === "history") {
          setData(msg.data);
        } else if (msg.type === "update") {
          setData((prev) => [...prev, msg.data]);
        }
      }
    );

    return () => {
      disconnect();
    };
  }, [region]);

  if (!region) return <div>Select a region</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{region} Dashboard</h1>
      <RegionChart data={data} region={region} />
      {workers.map((worker) => (
        <WorkerChart
          key={worker}
          data={data}
          region={region}
          workerName={worker}
        />
      ))}
    </div>
  );
}

export default RegionPage;
