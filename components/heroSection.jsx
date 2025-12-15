"use client";
import Container from "./spacing";
import { motion } from "framer-motion";
import Typography from "./typography";
import { Button } from "./button";
import HeroImageSection from "./heroImageSection";

export default function HeroSection(props) {
  const {
    heading = "Default Heading",
    headingVariant = "", // ⭐ gets dynamic variant from page builder
    description = "Default description",
    descriptionVariant = "", // ⭐ dynamic
    primaryBtnText = "Get Started",
    primaryBtnLink = "#",
    secondaryBtnText = "Learn More",
    secondaryBtnLink = "#",

    mainImage = "",
    leftImage = "",
    rightImage = "",

    variant = "default",
  } = props;

  console.log(headingVariant, descriptionVariant)

  return (
    <Container variant="heroSpacing">
      <div className="hero-container">
        {/* HEADING */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.1,
          }}
        >
          <Typography
            variant="h1" // default 
            overrideVariant={headingVariant} // ⭐ dynamic variant overrides default
          >
            {heading}
          </Typography>
        </motion.div>

        {/* DESCRIPTION + BUTTONS */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.25,
          }}
        >
          <div className="hero-right">
            <Typography
              variant="body-4" // default
              overrideVariant={descriptionVariant} // ⭐ dynamic
            >
              {description}
            </Typography>

            <div className="hero-buttons">
              <Button
                variant="primary"
                icon={
                  <img
                    src="https://ik.imagekit.io/flyde/Hirezy/Arrow%20Right.png"
                    width={14}
                    height={12}
                    alt="arrow"
                    className="arrow-img"
                  />
                }
                iconPosition="right"
                onClick={() => (window.location.href = primaryBtnLink)}
              >
                {primaryBtnText}
              </Button>

              <Button
                variant="black-outline"
                size="xl"
                onClick={() => (window.location.href = secondaryBtnLink)}
              >
                {secondaryBtnText}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* IMAGE SECTION */}
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.5,
        }}
      >
        <HeroImageSection
          mainImage={mainImage}
          leftImage={leftImage}
          rightImage={rightImage}
          variant={variant}
        />
      </motion.div>
    </Container>
  );
}
