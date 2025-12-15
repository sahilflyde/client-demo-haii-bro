"use client";
import React from "react";
import Typography from "./typography";

export default function Card({
  title,
  description,
  iconSrc,
  iconAlt = "",
  className = "",
  ...props
}) {
  console.log(title, description, iconSrc);

  return (
    <div className={`card ${className}`} {...props}>
      <div className="card-icon">
        <img
          src={iconSrc}
          alt={iconAlt}
          width={24}
          height={24}
          className="icon-img"
        />
      </div>

      <div className="card-content">
        <Typography variant="h3" className="card-title">
          {title}
        </Typography>

        <Typography variant="body-4" className="card-description">
          {description}
        </Typography>
      </div>
    </div>
  );
}
