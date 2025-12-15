"use client";

import { useInView, useMotionValue, motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typography from "./typography";

function RollingDigit({ target, duration = 1.5 }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    if (height && Number.isFinite(target)) {
      y.set(0);
      const controls = animate(y, -target * height, {
        duration,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [height, target, y]);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "1em",
        display: "inline-block",
        verticalAlign: "bottom",
      }}
    >
      <motion.div style={{ y }}>
        {Array.from({ length: 10 }, (_, digit) => (
          <div
            key={digit}
            ref={digit === 0 ? ref : null}
            style={{
              height: "1em",
              lineHeight: 1,
              display: "block",
              textAlign: "center",
            }}
          >
            {digit}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Metric({
  number = "250",
  label,

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  numberVariant = "",
  labelVariant = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (isInView) setStart(true);
  }, [isInView]);

  // Extract digits + suffix (like k, %, +)
  const match = number.match(/^(\d+)([a-zA-Z%+]*)$/);
  const numeric = match ? match[1] : "0";
  const suffix = match ? match[2] : "";

  const displayDigits = start
    ? numeric.split("")
    : numeric.split("").map(() => "0");

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-[8px]"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {/* ⭐ NUMBER TYPOGRAPHY OVERRIDE */}
      <Typography
        variant="h1"
        overrideVariant={numberVariant}
        className="flex items-baseline"
      >
        {displayDigits.map((d, i) => (
          <RollingDigit key={i} target={parseInt(d, 10)} />
        ))}
        <span>{suffix}</span>
      </Typography>

      {/* ⭐ LABEL TYPOGRAPHY OVERRIDE */}
      <Typography variant="body-4" overrideVariant={labelVariant}>
        {label}
      </Typography>
    </div>
  );
}
