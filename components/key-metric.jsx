"use client";
import React from "react";
import Container from "./spacing";
import Metric from "./Metric";

export default function MetricSection({
  metrics = [
    { number: "20K", label: "Successful Hires" },
    { number: "500+", label: "Teams Worldwide" },
    { number: "50k", label: "Seamless Integration" },
    { number: "95%", label: "Customer Satisfaction" },
  ],
}) {
  return (
    <Container variant="section">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-[50px]  ">
        {metrics.map((m, i) => (
          <Metric key={i} number={m.number} label={m.label} />
        ))}
      </div>
    </Container>
  );
}
