"use client";

import { useEffect, useState } from "react";
import Typography from "./typography";
import { Check } from "lucide-react";

export default function Pricing({
  planName = "Starter",
  description = "A great plan for getting started.",
  features = [],
  price = "29",
  tag = "",
  iconSrc = "https://placehold.co/64x64",
  highlight = false,
  variant = "blue",

  // ⭐ RECEIVED FROM PARENT
  planNameVariant = "",
  descriptionVariant = "",
  priceVariant = "",
  perMonthVariant = "",
  billedVariant = "",
  tagVariant = "",
  featureVariant = "",
}) {
  const [headingVariant, setHeadingVariant] = useState("body-1");

  useEffect(() => {
    const handleResize = () => {
      setHeadingVariant(window.innerWidth <= 450 ? "h2" : "body-1");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`pricing-card ${variant} ${highlight ? "highlight" : ""}`}>
      {/* Icon + Tag */}
      <div className="pricing-header">
        <div className="pricing-icon">
          <img src={iconSrc} alt={`${planName} Icon`} />
        </div>

        {tag && (
          <div className="pricing-tag">
            <Typography variant="body-5" overrideVariant={tagVariant}>
              {tag}
            </Typography>
          </div>
        )}
      </div>

      {/* Title + Description */}
      <div className="pricing-title">
        <Typography
          variant={headingVariant}
          overrideVariant={planNameVariant}
          className="pricing-name"
        >
          {planName}
        </Typography>

        <Typography
          variant="body-4"
          overrideVariant={descriptionVariant}
          className="pricing-desc"
        >
          {description}
        </Typography>
      </div>

      <div className="flex flex-col gap-[40px]">
        {/* Features */}
        <ul className="pricing-features">
          {features.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="check-icon">
                <Check size={14} />
              </span>
              <Typography variant="body-4" overrideVariant={featureVariant}>
                {item}
              </Typography>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="pricing-cost">
          <Typography
            variant="h2"
            overrideVariant={priceVariant}
            className="price"
          >
            ${price}
          </Typography>

          <Typography
            variant="body-4"
            overrideVariant={perMonthVariant}
            className="per-month"
          >
            /month
          </Typography>

          <Typography
            variant="body-4"
            overrideVariant={billedVariant}
            className="billed"
          >
            billed yearly
          </Typography>
        </div>
      </div>

      {/* Button */}
      <div className="pricing-bottom">
        <button className="choose-btn">Choose Plan</button>
      </div>
    </div>
  );
}
