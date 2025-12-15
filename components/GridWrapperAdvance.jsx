"use client";

import React from "react";
import clsx from "clsx";
import SectionHeader from "./sectionHeader";
import { componentRegistry } from "@/components/componentRegistry";

export default function GridSection({
  label,
  title,
  subtitle,
  centerTitle = "center",
  minColWidth = "300px",
  gap = "24px",
  columns = 3,

  // ✅ Modern (builder)
  children = [],

  // ✅ Old support (existing website)
  items = [],

  wrapperClass = "",
  showHeader = true,
}) {
  // ✅ If builder children exist, use them
  // ✅ Otherwise fallback to old `items` system
  const renderList = children?.length > 0 ? children : items;

  return (
    <section className={clsx("mainSec", wrapperClass)}>
      {/* ✅ Header only if showHeader is true */}
      {showHeader && (
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align={centerTitle}
          className=""
        />
      )}

      {/* ✅ SAME GRID DESIGN — NOTHING CHANGED */}
      <div
        className="grid gridSectionAuto !auto-rows-max !items-between grid-flow-col"
        style={{
          gap: gap,
          gridTemplateColumns: `repeat(${columns}, minmax(${minColWidth}, 1fr))`,
        }}
      >
        {renderList?.map((item, i) => {
          // ✅ NEW WAY — builder children
          if (item.type) {
            const Comp = componentRegistry[item.type];
            if (!Comp) return null;
            return (
              <div
                key={i}
                className={clsx(item.className, "flex justify-center")}
                style={{
                  gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
                  gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
                }}
              >
                <Comp {...item.props} />
              </div>
            );
          }

          // ✅ OLD WAY — existing codebase (item.component)
          return (
            <div
              key={i}
              className={clsx(item.className, "flex justify-center")}
              style={{
                gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
                gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
              }}
            >
              {item.component}
            </div>
          );
        })}
      </div>
    </section>
  );
}
