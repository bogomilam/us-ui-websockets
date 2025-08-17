// client/src/lib/websocket.ts
export type WSMessage<T> =
  | { type: "history"; data: T[] }
  | { type: "update"; data: T };

export function connectWebSocket<T>(
  region: string,
  onMessage: (msg: WSMessage<T>) => void
): () => void {
  const socket = new WebSocket(`ws://localhost:4000/ws/${region}`);

  socket.onopen = () => {
    console.log(`✅ Connected to WebSocket for region: ${region}`);
  };

  socket.onmessage = (event) => {
    try {
      const msg: WSMessage<T> = JSON.parse(event.data);
      onMessage(msg);
    } catch (err) {
      console.error("❌ Failed to parse WebSocket message", err);
    }
  };

  socket.onclose = () => {
    console.warn(`⚠️ WebSocket closed for ${region}. Reconnecting in 5s...`);
    setTimeout(() => connectWebSocket(region, onMessage), 5000);
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error", err);
  };

  // ✅ cleanup function to close socket on unmount/region change
  return () => {
    socket.close();
  };
}
