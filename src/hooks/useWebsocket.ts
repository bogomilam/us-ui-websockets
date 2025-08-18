// import { useEffect, useRef, useState, useCallback } from "react";

// export interface WSMessage {
//   type: string;
//   data: any;
// }

// export function useWebSocket(url: string) {
//   const wsRef = useRef<WebSocket | null>(null);
//   const queueRef = useRef<string[]>([]); // messages to send when open
//   const [connected, setConnected] = useState(false);
//   const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);

//   const sendMessage = useCallback((msg: any) => {
//     const msgStr = JSON.stringify(msg);
//     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//       wsRef.current.send(msgStr);
//     } else {
//       queueRef.current.push(msgStr); // queue until open
//     }
//   }, []);

//   useEffect(() => {
//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("🔌 WebSocket connected:", url);
//       setConnected(true);

//       // Send queued messages
//       queueRef.current.forEach((m) => ws.send(m));
//       queueRef.current = [];
//     };

//     ws.onmessage = (event) => {
//       const msg: WSMessage = JSON.parse(event.data);
//       console.log("📥 WebSocket message:", msg);
//       setLastMessage(msg);
//     };

//     ws.onclose = () => {
//       console.log("❌ WebSocket disconnected:", url);
//       setConnected(false);
//     };

//     ws.onerror = (err) => {
//       console.error("❌ WebSocket error:", err);
//     };

//     return () => ws.close();
//   }, [url]);

//   return { connected, lastMessage, sendMessage, ws: wsRef.current };
// }
