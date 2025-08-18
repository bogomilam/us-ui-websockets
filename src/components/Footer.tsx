import { ReactNode } from "react";

export const Footer: () => ReactNode = () => {
  return (
    <footer className="w-full bg-blue-300 text-gray-600 p-4">
      <div className="containertext-center">
        <p className="text-center">
          US Websocket Dashboard. Built by Bogo M, using React.js, TypeScript, WebsocketServer, MongoDB and Node.js.
        </p>
      </div>
    </footer>
  );
};
