import { Button } from "./button";
import Label from "./lable";
import Container from "./spacing";
import Typography from "./typography";
import { motion, useInView } from "framer-motion";
import Card from "./value";

export default function WhyChoose({
  open,
  setOpen,

  title = "",
  label = "",
  description = "",
  buttonText = "",
  features = [],

  // ⭐ Added override props
  labelVariant = "",
  titleVariant = "",
  descriptionVariant = "",
  buttonVariant = "",
}) {
  return (
    <section className="why-choose">
      <Container variant="secondary">
        <div className="why-choose-grid">
          {/* LEFT SIDE */}
          <div className="why-left">
            <div className="why-left-content">
              {/* ⭐ LABEL OVERRIDE */}
              <Label className="lable" text={label} labelTypo={labelVariant} />

              {/* ⭐ TITLE OVERRIDE */}
              <Typography
                variant="h2"
                overrideVariant={titleVariant}
                className="why-title"
              >
                {title}
              </Typography>

              {/* ⭐ DESCRIPTION OVERRIDE */}
              <Typography
                variant="body-4"
                overrideVariant={descriptionVariant}
                className="why-desc"
              >
                {description}
              </Typography>
            </div>

            {/* BUTTON */}
            <Button
              variant="primary"
              size="xl"
              showIcon={false}
              onClick={() => setOpen?.(true)}
              className="why-btn"
            >
              <Typography
                variant="h4"
                overrideVariant={buttonVariant} // ⭐ BUTTON OVERRIDE
              >
                {buttonText}
              </Typography>
            </Button>
          </div>

          {/* RIGHT — FEATURES */}
          <div className="why-right">
            {features.map((feature, index) => (
              <Card
                iconSrc={feature?.icon}
                iconAlt={feature?.title}
                title={feature?.title}
                description={feature?.desc}
                className="why-card"
                key={index}
              />
            ))}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <div className="mobile-button-container">
          <Button
            variant="primary"
            size="xl"
            showIcon={false}
            onClick={() => setOpen?.(true)}
          >
            <Typography variant="h4" overrideVariant={buttonVariant}>
              {buttonText}
            </Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
}
