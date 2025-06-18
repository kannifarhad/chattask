// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/gloabal.css";
import App from "./App.tsx";
import { SessionProvider } from "./contexts/SessionContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SessionProvider>
    <App />
  </SessionProvider>
  // </StrictMode>
);
