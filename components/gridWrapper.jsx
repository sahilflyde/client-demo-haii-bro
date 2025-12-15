"use client";

import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import SectionHeader from "./sectionHeader";

// 🔹 Child component — handles per-item animation safely
function GridItem({ itemData, i, smoothProgress, locked }) {
  // Each card’s stacking offset
  const startY = 100 - i * 25; // deeper cards stack more
  const startScale = 0.85 + i * 0.05;

  // Animate from stack → natural position
  const y = useTransform(
    smoothProgress,
    [0, 0.6],
    locked ? [0, 0] : [startY, 0]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.6],
    locked ? [1, 1] : [startScale, 1]
  );
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.6],
    locked ? [0, 0] : [15, 0]
  );
  const opacity = useTransform(
    smoothProgress,
    [0.1, 0.6],
    locked ? [1, 1] : [0.5, 1]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        opacity,
        transformOrigin: "center center",
        gridColumn: itemData.colSpan ? `span ${itemData.colSpan}` : undefined,
        gridRow: itemData.rowSpan ? `span ${itemData.rowSpan}` : undefined,
      }}
      className={clsx(
        itemData.className,
        "flex justify-center transition-transform"
      )}
    >
      {itemData.component}
    </motion.div>
  );
}

export default function GridSection({
  label,
  title,
  subtitle,
  centerTitle = "center",
  gap = "24px",
  columns = 3,
  items = [],
  wrapperClass = "",
  labelTypo = "",
  sectionHeaderTypo = "",
  sectionDescTypo = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Scroll progress across this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Smooth spring for better feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Lock animation after it finishes once
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const unsub = smoothProgress.on("change", (v) => {
      if (v >= 0.98) setLocked(true);
    });

    return () => unsub();
  }, [inView]);

  return (
    <section className={clsx("mainSec relative", wrapperClass)} ref={ref}>
      <SectionHeader
        label={label}
        title={title}
        subtitle={subtitle}
        align={centerTitle}
        labelTypo={labelTypo}
        sectionHeaderTypo={sectionHeaderTypo}
        sectionDescTypo={sectionDescTypo}
      />

      <div
        className="relative grid gridSectionAuto !items-between !auto-rows-max !grid-flow-dense"
        style={{
          gap,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          perspective: "1200px",
        }}
      >
        {items.map((itemData, i) => (
          <GridItem
            key={i}
            i={i}
            itemData={itemData}
            smoothProgress={smoothProgress}
            locked={locked}
          />
        ))}
      </div>
    </section>
  );
}
