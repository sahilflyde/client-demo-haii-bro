"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import clsx from "clsx";

const Typography = React.lazy(() => import("./typography"));

export default function Label({
  text,
  className = "",
  variant = "primary", // primary | secondary | greenVariant | tab
  icon,
  iconPosition = "left",
  active = false,

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  labelTypo = "",
  sectionHeaderTypo = "",
  sectionDescTypo = "",

  ...props
}) {
  // default fallback variants
  const typographyVariant = variant === "secondary" ? "body-5" : "body-4";

  const getColorVariant = () => {
    if (variant === "greenVariant") return "primary";
    if (variant === "tab" && active) return "primary";
    return "gray";
  };

  // ⭐ Decide override variant
  // Priority: labelTypo > sectionHeaderTypo > sectionDescTypo > ""
  const overrideVariant =
    labelTypo || sectionHeaderTypo || sectionDescTypo || "";

  return (
    <div
      {...props}
      className={clsx(
        "label",
        `label--${variant}`,
        active && "label--active",
        className
      )}
    >
      <Suspense fallback={<div style={{ height: "1em" }} />}>
        {/* ICON LEFT */}
        {icon && iconPosition === "left" && (
          <Image
            src={icon}
            alt="label icon"
            width={16}
            height={16}
            style={{ flexShrink: 0 }}
          />
        )}

        {/* ⭐ APPLY TYPOGRAPHY OVERRIDE */}
        {text && (
          <Typography
            variant={typographyVariant} // default
            overrideVariant={overrideVariant} // ⭐ override applied
            colorVariant={getColorVariant()}
          >
            {text}
          </Typography>
        )}

        {/* ICON RIGHT */}
        {icon && iconPosition === "right" && (
          <Image
            src={icon}
            alt="label icon"
            width={16}
            height={16}
            style={{ flexShrink: 0 }}
          />
        )}
      </Suspense>
    </div>
  );
}
