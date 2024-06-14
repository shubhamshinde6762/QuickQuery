import React from "react";
import { createRoot } from "react-dom/client";

const SidePanel = () => (
  <div>
    <h1>Side Panel</h1>
    <p>This is the side panel content.</p>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<SidePanel />);
