import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CardsServiceProvider } from "./contexts/CardsServiceContext.tsx";
import { DecksProvider } from "./contexts/DecksContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CardsServiceProvider>
      <DecksProvider>
        <App />
      </DecksProvider>
    </CardsServiceProvider>
  </StrictMode>
);
