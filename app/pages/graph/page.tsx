"use client";

import { useEffect } from "react";
import { loadGraph } from "@/components/loadGraph";

export default function Home() {
  useEffect(() => {
    loadGraph();
  }, []);

  return (
    <div className="container">
      <svg id="container" width="1060" height="960" viewBox="0 0 1060 960" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  );
}