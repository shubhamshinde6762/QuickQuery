import React from "react";
import "../index.css";
import { createRoot } from "react-dom/client";

const Popup = () => (
  <div>
    <div className="text-5xl">hi</div>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);
