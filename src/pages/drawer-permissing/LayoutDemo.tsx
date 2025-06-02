import React, { useState } from "react";
import AnimatedLayout from "./AnimatedLayout";
import "./styles.css";

const LayoutDemo: React.FC = () => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="layout-demo">
      <div className="layout-controls">
        <button
          className={`layout-button ${layout === "grid" ? "active" : ""}`}
          onClick={() => setLayout("grid")}
        >
          Grid View
        </button>
        <button
          className={`layout-button ${layout === "list" ? "active" : ""}`}
          onClick={() => setLayout("list")}
        >
          List View
        </button>
      </div>
      <AnimatedLayout layout={layout} />
    </div>
  );
};

export default LayoutDemo;
