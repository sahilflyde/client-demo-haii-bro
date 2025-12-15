"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./sectionHeader";
import Typography from "./typography";
import Container from "./spacing";

export default function Testimonial({
  items = [],

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
  quoteVariant = "",
  detailsVariant = "",
  nameVariant = "",
  roleVariant = "",
}) {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFirstCard, setIsFirstCard] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    if (!items.length) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const newIndex = Math.floor(progress * items.length);
      const clamped = Math.max(0, Math.min(items.length - 1, newIndex));

      if (clamped !== index) {
        setDirection(clamped > index ? 1 : -1);
        setIndex(clamped);
        setIsFirstCard(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, index, items.length]);

  if (!items || items.length === 0) return null;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -180,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        bounce: 0.3,
        duration: 0.6,
      },
    },
  };

  const { quote, details, name, role, imageSrc, companyLogo } = items[index];

  return (
    <Container>
      <section
        ref={sectionRef}
        className="testimonial-section relative"
        style={{
          height: `${items.length * 100}vh`,
        }}
      >
        <div className="sticky top-0 flex flex-col justify-center">
          {/* ⭐ Section Header with overrides */}
          <SectionHeader
            label="Testimonial"
            title="What Our Users Say"
            subtitle="Discover why companies trust Hirezy to streamline and improve hiring processes."
            align="center"
            labelTypo={labelVariant}
            sectionHeaderTypo={titleVariant}
            sectionDescTypo={subtitleVariant}
          />

          <div className="arrows !mt-6 flex items-center justify-center gap-4">
            <button
              className="prev"
              onClick={() => {
                setDirection(-1);
                setIndex((i) => Math.max(0, i - 1));
                setIsFirstCard(false);
              }}
            >
              <Image
                src="https://ik.imagekit.io/flyde/Hirezy/imagsasade(1).png"
                alt="Previous"
                width={50}
                height={50}
              />
            </button>

            <button
              className="next"
              onClick={() => {
                setDirection(1);
                setIndex((i) => Math.min(items.length - 1, i + 1));
                setIsFirstCard(false);
              }}
            >
              <Image
                src="https://ik.imagekit.io/flyde/Hirezy/image.png"
                alt="Next"
                width={50}
                height={50}
              />
            </button>
          </div>

          {/* MAIN CARD */}
          <div className="testimonial-card-container relative mt-8 overflow-visible">
            <div className="motion-clip-wrapper">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={index}
                  className="testimonial-card"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* IMAGE */}
                  <motion.div
                    className="image-wrapper"
                    initial={{ x: -50, opacity: 0, filter: "blur(10px)" }}
                    animate={
                      isFirstCard
                        ? {}
                        : { x: 0, opacity: 1, filter: "blur(0px)" }
                    }
                    whileInView={
                      isFirstCard
                        ? { x: 0, opacity: 1, filter: "blur(0px)" }
                        : {}
                    }
                    viewport={isFirstCard ? { once: true } : {}}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      bounce: 0.4,
                      duration: 0.8,
                      delay: isFirstCard ? 0 : 0.2,
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={600}
                      height={900}
                      priority
                      className="object-cover rounded-2xl"
                    />
                  </motion.div>

                  {/* TEXT CONTENT */}
                  <motion.div
                    className="content-wrapper"
                    initial={{ x: 50, opacity: 0 }}
                    animate={isFirstCard ? {} : { x: 0, opacity: 1 }}
                    whileInView={isFirstCard ? { x: 0, opacity: 1 } : {}}
                    viewport={isFirstCard ? { once: true } : {}}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      bounce: 0.4,
                      duration: 0.8,
                      delay: isFirstCard ? 0.1 : 0.3,
                    }}
                  >
                    <div className="card-content">
                      {/* COMPANY LOGO */}
                      <div className="company-logo">
                        <Image
                          src={companyLogo}
                          alt="Company Logo"
                          width={100}
                          height={40}
                          className="object-contain"
                        />
                      </div>

                      {/* TYPOGRAPHY BLOCK */}
                      <motion.div
                        initial="hidden"
                        animate={isFirstCard ? {} : "visible"}
                        whileInView={isFirstCard ? "visible" : {}}
                        viewport={isFirstCard ? { once: true } : {}}
                        variants={contentVariants}
                      >
                        {/* ⭐ QUOTE */}
                        <motion.div variants={itemVariants}>
                          <Typography
                            variant="body-1"
                            overrideVariant={quoteVariant}
                            className="quote"
                          >
                            {quote}
                          </Typography>
                        </motion.div>

                        {/* ⭐ DETAILS */}
                        <motion.div variants={itemVariants}>
                          <Typography
                            variant="body-4"
                            overrideVariant={detailsVariant}
                            className="details"
                          >
                            {details}
                          </Typography>
                        </motion.div>

                        {/* ⭐ AUTHOR */}
                        <motion.div className="author" variants={itemVariants}>
                          <Typography
                            variant="h6"
                            overrideVariant={nameVariant}
                            className="name"
                          >
                            {name}
                          </Typography>

                          <Typography
                            variant="body-5"
                            overrideVariant={roleVariant}
                            className="role"
                          >
                            {role}
                          </Typography>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* DOTS */}
          <div className="slick-dots flex justify-center gap-2 mt-4">
            {items.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                  setIsFirstCard(false);
                }}
                animate={{
                  width: i === index ? 24 : 8,
                  opacity: i === index ? 1 : 0.4,
                  backgroundColor: i === index ? "#CCEF55" : "#9CA3AF",
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
