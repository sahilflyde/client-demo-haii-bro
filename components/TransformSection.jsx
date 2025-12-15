"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./spacing";
import { Button } from "./button";
import Typography from "./typography";

const TransformSection = ({
  title = "Transform Your Hiring",
  desc = "Your description goes here...",
  btnText = "Get Started",
  btnIcon = "",
  bgImage = "",
  buttonLink = "#",

  // ⭐ NEW OVERRIDE TYPOGRAPHY PROPS
  titleVariant = "",
  descVariant = "",
  buttonTextVariant = "",
}) => {
  const bgVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <Container variant="section">
      <motion.section
        className="transform-section section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background animation */}
        <motion.div
          key={title}
          className="transform-card"
          variants={bgVariants}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Text content */}
          <motion.div
            className="transform-card-content"
            variants={textContainer}
          >
            <motion.div variants={textItem}>
              {/* ⭐ TITLE OVERRIDE */}
              <Typography
                variant="h1"
                overrideVariant={titleVariant}
                className="cta-title"
              >
                {title}
              </Typography>
            </motion.div>

            <motion.div variants={textItem}>
              {/* ⭐ DESCRIPTION OVERRIDE */}
              <Typography
                variant="body-3"
                overrideVariant={descVariant}
                className="cta-desc"
              >
                {desc}
              </Typography>
            </motion.div>

            <motion.div variants={textItem}>
              <Button
                variant="white"
                size="smTwo"
                showIcon={true}
                iconPosition="right"
                className="btn"
                icon={
                  btnIcon ? (
                    <Image
                      src={btnIcon}
                      width={14}
                      height={12}
                      alt="arrow"
                      className="arrow-img"
                    />
                  ) : null
                }
                as={buttonLink ? "a" : "button"}
                href={buttonLink || undefined}
              >
                {/* ⭐ BUTTON TEXT OVERRIDE */}
                <Typography variant="h4" overrideVariant={buttonTextVariant}>
                  {btnText}
                </Typography>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </Container>
  );
};

export default TransformSection;
