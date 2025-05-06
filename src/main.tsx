import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChatBot } from "./components/chat-bot/index.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ChatBot />
  </React.StrictMode>
);
