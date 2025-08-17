// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// // import { RegionChart } from "../../components/charts/RegionChart";
// import { connectWebSocket, WSMessage } from "@/lib/websocket";
// // import { StatusDoc, Status } from "@/types/types";
// // import { filterLastWeek } from "@/utils/date";
// import { StatusDoc } from "../../types/types";

// export default function USWest() {
//   const { region } = useParams<{ region: string }>();

//   const [data, setData] = useState<StatusDoc[]>([]);

//   useEffect(() => {
//     if (!region) return;

//     const disconnect = connectWebSocket<StatusDoc>(
//       region,
//       (msg: WSMessage<StatusDoc>) => {
//         if (msg.type === "history") {
//           setData(msg.data);
//         } else if (msg.type === "update") {
//           setData((prev) => [...prev, msg.data]);
//         }
//         console.log(`Received data for ${data}:`, msg);
//       }
//     );

//     return () => {
//       disconnect();
//     };
//   }, [region]);
//   return (
//     <div>
//       <h1>US-West Dashboard</h1>
//       {/* <RegionChart data={data} region="us-west" /> */}
//     </div>
//   );
// }
