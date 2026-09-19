import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Bio from "./Bio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main>
      <h1 className="text-3xl font-bold text-center p-10">My App</h1>
      <Bio />
    </main>
  </StrictMode>,
);
